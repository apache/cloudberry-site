// All tunable sizing data. Formula-structural constants live in calc.js.
export const COMPUTE_RULE = { vcpuPerTB: 8, memGBPerTB: 32 };

// Lightning-path concurrency levels. Baseline: one 8c/32G segment per TB
// on-disk supports up to ~80 concurrent queries (statement_mem math:
// 32G x 0.9 / 80 = 368MB per query). Higher tiers scale per-segment
// resources linearly per the statement_mem formula. Storage math unaffected.
export const CONCURRENCY_LEVELS = [
  { id: 'std',   max: 80,  factor: 1 },   // default — leaves results unchanged
  { id: 'high',  max: 120, factor: 1.5 },
  { id: 'xhigh', max: 160, factor: 2 },
];

// Physical presets. cores = OS-visible logical cores (x86 with HT; on ARM,
// physical cores are the logical count). arrayTB = usable RAID array
// capacity per data node.
// sas_std / ssd_perf: fin-industry 2023 deck (24 disks, 2×RAID5 of 12 → 22 disks usable).
// nvme_modern: 2025 mainstream practice (12 × 3.84T NVMe, RAID5 → 11 usable).
export const PHYSICAL_PRESETS = [
  {
    id: 'sas_std', cores: 128, memGB: 512, arrayTB: 26.4, coordStorageTB: 1.8,
    network: '2 × 10GbE',
    bom: {
      cpu: '2 × 32C x86 (HT, 128 threads)', mem: '512 GB',
      sysDisk: '2 × 600GB 10K SAS, RAID1',
      dataDisk: '24 × 1.2TB 10K SAS', raidKey: 'raid.2x12r5',
      coordDataDisk: '4 × 600GB 10K SAS, RAID5',
    },
    sourceKey: 'source.fin2023',
  },
  {
    id: 'ssd_perf', cores: 128, memGB: 1024, arrayTB: 21.12, coordStorageTB: 2.8,
    network: '2 × 10GbE / 25GbE',
    bom: {
      cpu: '2 × 32C x86 (HT, 128 threads)', mem: '1024 GB',
      sysDisk: '2 × 960GB SSD, RAID1',
      dataDisk: '24 × 960GB SATA SSD', raidKey: 'raid.2x12r5',
      coordDataDisk: '4 × 960GB SSD, RAID5',
    },
    sourceKey: 'source.fin2023',
  },
  {
    id: 'nvme_modern', cores: 128, memGB: 1024, arrayTB: 42.24, coordStorageTB: 1.9,
    network: '2 × 25GbE',
    bom: {
      cpu: '2 × 32C x86 (Xeon SPR / EPYC 9004; HT, 128 threads)', mem: '1024 GB DDR5',
      sysDisk: '2 × 960GB NVMe, RAID1',
      dataDisk: '12 × 3.84TB NVMe U.2', raidKey: 'raid.1x12r5',
      coordDataDisk: '2 × 1.92TB NVMe, RAID1',
    },
    sourceKey: 'source.mainstream',
  },
];

// VM profiles (virtualized sizing practice, modernized). maxTB = business data threshold.
// 1:4 vCPU:memory, exactly N x (8c/32G per segment). Memory-optimized (1:8)
// variants are a valid upgrade for extra cache/concurrency headroom but do
// not change node counts under the compute rule.
export const VM_PROFILES = [
  { id: 'lite',   maxTB: 5,        vcpu: 8,  memGB: 32, storageTB: 2, throughput: '≥ 500 MB/s',  hostKey: 'vmhost.lite' },
  { id: 'medium', maxTB: 50,       vcpu: 16, memGB: 64, storageTB: 4, throughput: '≥ 1000 MB/s', hostKey: 'vmhost.medium' },
  { id: 'large',  maxTB: Infinity, vcpu: 24, memGB: 96, storageTB: 8, throughput: '≥ 1500 MB/s', hostKey: 'vmhost.large' },
];
export const VM_COORD = { vcpu: 8, memGB: 32, storageTB: 0.5 };

// Cloud schemes: per provider one managed-disk scheme (cloud deployment
// best practice) and one local-NVMe scheme (production practice). Both
// deploy segment primary + mirror for HA.
export const CLOUD_SCHEMES = [
  {
    id: 'aws_ebs', provider: 'AWS', kindKey: 'scheme.managed', sourceKey: 'source.cloudbp',
    network: '10–25 Gbps (ENA)', oss: 'Amazon S3',
    coordinator: { instance: 'r5.xlarge', vcpu: 4, memGB: 32, storageTB: 0.5, diskDesc: '1 × 500GB EBS GP3' },
    segment:     { instance: 'r5.4xlarge', vcpu: 16, memGB: 128, storageTB: 6, diskDesc: '3 × 2TB EBS ST1/GP3' },
  },
  {
    id: 'aws_local', provider: 'AWS', kindKey: 'scheme.local', sourceKey: 'source.hashdata',
    network: '25 Gbps', oss: 'Amazon S3',
    coordinator: { instance: 'i3.2xlarge', vcpu: 8, memGB: 61, storageTB: 1.9, diskDesc: '1 × 1.9TB NVMe' },
    segment:     { instance: 'i3en.2xlarge', vcpu: 8, memGB: 64, storageTB: 5, diskDesc: '2 × 2.5TB NVMe local' },
  },
  {
    id: 'azure_premium', provider: 'Azure', kindKey: 'scheme.managed', sourceKey: 'source.cloudbp',
    network: 'Accelerated Networking, UDP interconnect', oss: 'Azure Blob',
    coordinator: { instance: 'Standard_E8s_v5', vcpu: 8, memGB: 64, storageTB: 1, diskDesc: '1 × P30 1TB Premium SSD' },
    segment:     { instance: 'Standard_E16s_v5', vcpu: 16, memGB: 128, storageTB: 6, diskDesc: '3 × P40 2TB Premium SSD' },
    noteKey: 'note.azure.extra',
  },
  {
    id: 'azure_local', provider: 'Azure', kindKey: 'scheme.local', sourceKey: 'source.hashdata',
    network: '12.5–32 Gbps', oss: 'Azure Blob',
    coordinator: { instance: 'Standard_E8s_v5', vcpu: 8, memGB: 64, storageTB: 1, diskDesc: '1 × P30 1TB Premium SSD' },
    segment:     { instance: 'Standard_L8s_v3', vcpu: 8, memGB: 64, storageTB: 1.92, diskDesc: '1 × 1.92TB NVMe local' },
  },
  {
    id: 'gcp_pd', provider: 'GCP', kindKey: 'scheme.managed', sourceKey: 'source.cloudbp',
    network: '10–25 Gbps', oss: 'Google Cloud Storage',
    coordinator: { instance: 'n2-highmem-8', vcpu: 8, memGB: 64, storageTB: 0.5, diskDesc: '1 × 500GB pd-ssd' },
    segment:     { instance: 'n2-highmem-8', vcpu: 8, memGB: 64, storageTB: 4, diskDesc: '1 × 4TB pd-ssd' },
    noteKey: 'note.gcp.extra',
  },
  {
    id: 'gcp_local', provider: 'GCP', kindKey: 'scheme.local', sourceKey: 'source.hashdata',
    network: '20 Gbps', oss: 'Google Cloud Storage',
    coordinator: { instance: 'c3d-standard-8-lssd', vcpu: 8, memGB: 32, storageTB: 2, diskDesc: 'Local SSD' },
    segment:     { instance: 'c3d-standard-8-lssd', vcpu: 8, memGB: 32, storageTB: 2, diskDesc: '2TB Local SSD' },
  },
];

