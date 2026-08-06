import { COMPUTE_RULE, PHYSICAL_PRESETS, VM_PROFILES, VM_COORD, CLOUD_SCHEMES } from './config.js';

export function toTB(value, unit) {
  if (unit === 'GB') return value / 1024;
  if (unit === 'PB') return value * 1024;
  return value;
}

export function evenUp(n) {
  return n % 2 ? n + 1 : n;
}

// One quota rule for every path: each primary segment gets 8 OS-visible
// logical cores + 32G (scaled by the concurrency factor). capacity may be
// fractional (a node smaller than one full quota contributes
// proportionally); the displayed layout is an integer >= 1. Mirrors are
// co-hosted 1:1 (spread mirroring).
export function segLayoutFor(cpu, memGB, concurrencyFactor = 1) {
  const capacity = Math.min(cpu / (COMPUTE_RULE.vcpuPerTB * concurrencyFactor),
                            memGB / (COMPUTE_RULE.memGBPerTB * concurrencyFactor));
  const primaries = Math.max(1, Math.floor(capacity));
  return { primaries, mirrors: primaries, capacity };
}

function layoutBom(layout, perSegTB, memGB) {
  const layoutText = layout.mirrors ? `${layout.primaries} primary + ${layout.mirrors} mirror` : `${layout.primaries} primary`;
  const lines = [{ labelKey: 'bom.layout', value: layoutText }];
  if (perSegTB != null) lines.push({ labelKey: 'bom.perseg', value: `≈ ${perSegTB.toFixed(1)} TB` });
  if (memGB != null) lines.push({ labelKey: 'bom.segmem', value: `${Math.floor(memGB / layout.primaries)}G` });
  return lines;
}

// Unified per-node usable capacity, every discount applied exactly once:
// ×0.9 OS/FS overhead, ×0.8 keep 20% free, ÷(copies + 1/3 workspace) where
// copies = 2 (segment primary + mirror, the default HA layout).
// Same formula for every path; physical passes post-RAID arrayTB,
// VM/cloud pass nominal data-disk capacity.
export function nodeUsableTB(nominalTB) {
  return nominalTB * 0.9 * 0.8 / (2 + 1 / 3);
}

export function calcPhysical({ dataTB, compressionRatio, presetId, concurrencyFactor = 1 }) {
  const p = PHYSICAL_PRESETS.find(x => x.id === presetId);
  const onDiskTB = dataTB / compressionRatio;
  const usable = nodeUsableTB(p.arrayTB);
  const layout = segLayoutFor(p.cores, p.memGB, concurrencyFactor);
  const storageNodes = Math.max(2, Math.ceil(onDiskTB / usable));
  const computeNodes = Math.ceil(onDiskTB / layout.capacity); // 1TB per segment-quota
  const segNodes = evenUp(Math.max(storageNodes, computeNodes));
  const perSegTB = onDiskTB / (segNodes * layout.primaries);
  return {
    product: 'lightning',
    layout,
    roles: [
      { key: 'coordinator', count: 2, cpu: p.cores, memGB: p.memGB,
        storageTB: p.coordStorageTB, cpuUnitKey: 'unit.cores', noteKey: 'note.coord.physical',
        bom: [
          { labelKey: 'bom.cpu', value: p.bom.cpu },
          { labelKey: 'bom.mem', value: p.bom.mem },
          { labelKey: 'bom.sysdisk', value: p.bom.sysDisk },
          { labelKey: 'bom.datadisk', value: p.bom.coordDataDisk },
          { labelKey: 'bom.nic', value: p.network },
        ] },
      { key: 'segment', count: segNodes, cpu: p.cores, memGB: p.memGB,
        storageTB: p.arrayTB, cpuUnitKey: 'unit.cores', noteKey: 'note.segment.physical',
        bom: [
          { labelKey: 'bom.cpu', value: p.bom.cpu },
          { labelKey: 'bom.mem', value: p.bom.mem },
          { labelKey: 'bom.sysdisk', value: p.bom.sysDisk },
          { labelKey: 'bom.datadisk', value: p.bom.dataDisk },
          { labelKey: 'bom.raid', valueKey: p.bom.raidKey },
          { labelKey: 'bom.nic', value: p.network },
          ...layoutBom(layout, perSegTB, p.memGB),
        ] },
    ],
    binding: { type: computeNodes > storageNodes ? 'compute' : 'storage', storageNodes, computeNodes },
    capacityTB: segNodes * usable * compressionRatio,
    sourceKey: p.sourceKey,
  };
}

export function recommendVMProfile(dataTB) {
  return VM_PROFILES.find(p => dataTB <= p.maxTB);
}

export function calcVM({ dataTB, compressionRatio, profileId, concurrencyFactor = 1 }) {
  const p = VM_PROFILES.find(x => x.id === profileId);
  const usable = nodeUsableTB(p.storageTB);
  const onDiskTB = dataTB / compressionRatio;
  const layout = segLayoutFor(p.vcpu, p.memGB, concurrencyFactor);
  const storageNodes = Math.max(2, Math.ceil(onDiskTB / usable));
  const computeNodes = Math.ceil(onDiskTB / layout.capacity); // 1TB per segment-quota
  const rawNodes = Math.max(storageNodes, computeNodes);
  const n = { usable, storageNodes, computeNodes, dataNodes: evenUp(rawNodes) };
  const perSegTB = onDiskTB / (n.dataNodes * layout.primaries);
  return {
    product: 'lightning',
    layout,
    roles: [
      { key: 'coordinator', count: 2, cpu: VM_COORD.vcpu, memGB: VM_COORD.memGB,
        storageTB: VM_COORD.storageTB, cpuUnitKey: 'unit.vcpu', noteKey: 'note.coord.vm' },
      { key: 'datanode', count: n.dataNodes, cpu: p.vcpu, memGB: p.memGB,
        storageTB: p.storageTB, cpuUnitKey: 'unit.vcpu', noteKey: 'note.datanode.vm',
        bom: [
          { labelKey: 'bom.datadisk', value: `${p.storageTB}TB SSD` },
          { labelKey: 'bom.throughput', value: p.throughput },
          { labelKey: 'bom.host', valueKey: p.hostKey },
          ...layoutBom(layout, perSegTB, p.memGB),
        ] },
    ],
    binding: { type: n.computeNodes > n.storageNodes ? 'compute' : 'storage',
               storageNodes: n.storageNodes, computeNodes: n.computeNodes },
    capacityTB: n.dataNodes * n.usable * compressionRatio,
    profileId: p.id,
  };
}

export function calcCloud({ dataTB, compressionRatio, schemeId, concurrencyFactor = 1 }) {
  const s = CLOUD_SCHEMES.find(x => x.id === schemeId);
  const seg = s.segment;
  const usable = nodeUsableTB(seg.storageTB);
  const onDiskTB = dataTB / compressionRatio;
  const layout = segLayoutFor(seg.vcpu, seg.memGB, concurrencyFactor);
  const storageNodes = Math.max(2, Math.ceil(onDiskTB / usable));
  const computeNodes = Math.ceil(onDiskTB / layout.capacity); // 1TB per segment-quota
  const rawNodes = Math.max(storageNodes, computeNodes);
  const n = { usable, storageNodes, computeNodes, dataNodes: evenUp(rawNodes) };
  const perSegTB = onDiskTB / (n.dataNodes * layout.primaries);
  return {
    product: 'lightning',
    layout,
    roles: [
      { key: 'coordinator', count: 2, cpu: s.coordinator.vcpu, memGB: s.coordinator.memGB,
        storageTB: s.coordinator.storageTB, instance: s.coordinator.instance,
        cpuUnitKey: 'unit.vcpu', noteKey: 'note.coord.vm',
        bom: [{ labelKey: 'bom.datadisk', value: s.coordinator.diskDesc }] },
      { key: 'datanode', count: n.dataNodes, cpu: seg.vcpu, memGB: seg.memGB,
        storageTB: seg.storageTB, instance: seg.instance,
        cpuUnitKey: 'unit.vcpu', noteKey: s.noteKey || 'note.datanode.vm',
        bom: [{ labelKey: 'bom.datadisk', value: seg.diskDesc }, ...layoutBom(layout, perSegTB, seg.memGB)] },
      { key: 'oss', count: 1, cpu: null, memGB: null, storageTB: null,
        instance: s.oss, noteKey: 'note.oss' },
    ],
    binding: { type: n.computeNodes > n.storageNodes ? 'compute' : 'storage',
               storageNodes: n.storageNodes, computeNodes: n.computeNodes },
    capacityTB: n.dataNodes * n.usable * compressionRatio,
    sourceKey: s.sourceKey,
  };
}

export function summarize(roles) {
  const s = { nodes: 0, cpu: 0, memGB: 0, storageTB: 0 };
  for (const r of roles) {
    s.nodes += r.count;
    if (r.cpu != null) s.cpu += r.count * r.cpu;
    if (r.memGB != null) s.memGB += r.count * r.memGB;
    if (r.storageTB != null) s.storageTB += r.count * r.storageTB;
  }
  return s;
}
