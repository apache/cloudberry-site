// DOM wiring for the sizing calculator (English-only, no language toggle).
// Pure calculation lives in calc.js; tunable data in config.js.
// Adapted from https://github.com/cloudberry-fe/sizing (Apache-2.0).
import { toTB, calcPhysical, calcVM, calcCloud, summarize, recommendVMProfile } from './calc.js';
import { PHYSICAL_PRESETS, VM_PROFILES, CLOUD_SCHEMES, CONCURRENCY_LEVELS } from './config.js';
import { t } from './strings';

type Vars = Record<string, string | number>;

export function initSizing(): void {
  const state = {
    infra: 'physical',
    presetId: 'sas_std',
    vmProfileSel: 'auto',
    schemeId: 'aws_ebs',
  };

  const $ = (id: string) => document.getElementById(id) as HTMLElement;

  function fmt(key: string, vars?: Vars): string {
    let s = t(key);
    for (const [k, v] of Object.entries(vars || {})) s = s.replaceAll(`{${k}}`, String(v));
    return s;
  }

  function fmtNum(x: number): string {
    const s = x.toFixed(1);
    return s.endsWith('.0') ? s.slice(0, -2) : s;
  }

  function populatePresetCards() {
    $('preset-cards').innerHTML = PHYSICAL_PRESETS.map((p: any) => `
      <button type="button" class="preset-card${p.id === state.presetId ? ' selected' : ''}" data-preset="${p.id}">
        <span class="preset-name">${t('preset.' + p.id)}</span>
        <span class="preset-desc">${t('preset.' + p.id + '.desc')}</span>
      </button>`).join('');
  }

  function populateVMProfile() {
    const opts = [`<option value="auto"${state.vmProfileSel === 'auto' ? ' selected' : ''}>${t('vmprofile.auto')}</option>`]
      .concat(VM_PROFILES.map((p: any) =>
        `<option value="${p.id}"${state.vmProfileSel === p.id ? ' selected' : ''}>${t('vmprofile.' + p.id)}</option>`));
    ($('vm-profile') as HTMLSelectElement).innerHTML = opts.join('');
  }

  function populateCloudScheme() {
    const byProvider: Record<string, any[]> = {};
    for (const s of CLOUD_SCHEMES as any[]) (byProvider[s.provider] ||= []).push(s);
    ($('cloud-scheme') as HTMLSelectElement).innerHTML = Object.entries(byProvider).map(([prov, schemes]) =>
      `<optgroup label="${prov}">` + schemes.map((s: any) =>
        `<option value="${s.id}"${s.id === state.schemeId ? ' selected' : ''}>` +
        `${t(s.kindKey)} · ${s.segment.instance}</option>`).join('') + '</optgroup>').join('');
  }

  function populateConcurrency() {
    ($('concurrency') as HTMLSelectElement).innerHTML = CONCURRENCY_LEVELS
      .map((c: any) => `<option value="${c.id}">${t('conc.' + c.id)}</option>`).join('');
  }

  function populateControls() {
    populatePresetCards();
    populateVMProfile();
    populateCloudScheme();
    populateConcurrency();
  }

  function specText(r: any): string {
    const bomLines = (r.bom || []).map((b: any) =>
      `<div class="bom-line"><span class="bom-k">${t(b.labelKey)}</span>` +
      `<span class="bom-v">${b.valueKey ? t(b.valueKey) : b.value}</span></div>`).join('');
    if (r.cpu == null) return `<span class="spec-main">${r.instance || '—'}</span>` + bomLines;
    const st = r.storageTB == null ? '' :
      ` / ${r.storageTB >= 1 ? fmtNum(r.storageTB) + 'T' : fmtNum(r.storageTB * 1024) + 'G'}`;
    const inst = r.instance ? `<span class="spec-inst">${r.instance}</span>` : '';
    const main = `<span class="spec-main">${r.cpu} ${t(r.cpuUnitKey)} / ${r.memGB}G${st}</span>`;
    return inst + main + bomLines;
  }

  function activeVMProfileId(dataTB: number): string {
    return state.vmProfileSel === 'auto' ? recommendVMProfile(dataTB).id : state.vmProfileSel;
  }

  function compute() {
    const size = parseFloat(($('data-size') as HTMLInputElement).value);
    const valid = Number.isFinite(size) && size > 0;
    ($('input-error') as HTMLElement).hidden = valid;
    ($('result-card') as HTMLElement).hidden = !valid;
    if (!valid) return;

    const dataTB = toTB(size, ($('data-unit') as HTMLSelectElement).value);
    const compressionRatio = Math.max(1, parseFloat(($('compression') as HTMLInputElement).value) || 1);
    const concurrencyFactor = (CONCURRENCY_LEVELS.find((c: any) => c.id === ($('concurrency') as HTMLSelectElement).value) || CONCURRENCY_LEVELS[0]).factor;
    let r: any;
    if (state.infra === 'physical') {
      r = calcPhysical({ dataTB, compressionRatio, presetId: state.presetId, concurrencyFactor });
    } else if (state.infra === 'vm') {
      r = calcVM({ dataTB, compressionRatio, profileId: activeVMProfileId(dataTB), concurrencyFactor });
    } else {
      r = calcCloud({ dataTB, compressionRatio, schemeId: state.schemeId, concurrencyFactor });
    }

    ($('huge-warning') as HTMLElement).hidden = dataTB <= 10240;
    $('product-line').textContent = t(`product.${state.infra}`);

    const hint = $('vm-profile-hint');
    if (state.infra === 'vm' && state.vmProfileSel === 'auto') {
      hint.textContent = fmt('vmprofile.picked', { p: r.profileId.charAt(0).toUpperCase() + r.profileId.slice(1) });
      hint.hidden = false;
    } else hint.hidden = true;

    const scheme = CLOUD_SCHEMES.find((x: any) => x.id === state.schemeId) as any;
    $('network-line').textContent =
      state.infra === 'cloud' ? `${t('network.label')}: ${scheme.network}` : t('network.10g');

    const badge = $('binding-badge');
    if (r.binding) {
      badge.hidden = false;
      badge.className = `sz-badge sz-badge-${r.binding.type}`;
      badge.textContent = fmt(`binding.${r.binding.type}`, { s: r.binding.storageNodes, c: r.binding.computeNodes });
    } else badge.hidden = true;

    ($('role-table').querySelector('tbody') as HTMLElement).innerHTML = r.roles.map((role: any) => `<tr>
      <td>${t('role.' + role.key)}</td><td class="num">${role.count}</td>
      <td>${specText(role)}</td><td class="note">${t(role.noteKey)}</td></tr>`).join('');

    const s = summarize(r.roles);
    const rows: [string, string | number][] = [
      ['summary.nodes', s.nodes],
      ['summary.cpu', fmtNum(s.cpu)],
      ['summary.mem', `${fmtNum(s.memGB)} GB`],
      ['summary.storage', `${fmtNum(s.storageTB)} TB`],
    ];
    if (r.capacityTB != null) rows.push(['summary.capacity', `${fmtNum(r.capacityTB)} TB`]);
    ($('summary-table').querySelector('tbody') as HTMLElement).innerHTML =
      rows.map(([k, v]) => `<tr><th>${t(k)}</th><td>${v}</td></tr>`).join('');
  }

  function showAdvancedFor(infra: string) {
    document.querySelectorAll('.adv').forEach(el => {
      (el as HTMLElement).hidden = !(el as HTMLElement).dataset.for!.split(' ').includes(infra);
    });
  }

  $('infra-tabs').addEventListener('click', e => {
    const btn = (e.target as HTMLElement).closest('button[data-infra]') as HTMLElement | null;
    if (!btn) return;
    state.infra = btn.dataset.infra as string;
    document.querySelectorAll('#infra-tabs button').forEach(b => b.classList.toggle('active', b === btn));
    showAdvancedFor(state.infra);
    compute();
  });

  $('preset-cards').addEventListener('click', e => {
    const card = (e.target as HTMLElement).closest('button[data-preset]') as HTMLElement | null;
    if (!card) return;
    state.presetId = card.dataset.preset as string;
    document.querySelectorAll('.preset-card').forEach(c => c.classList.toggle('selected', c === card));
    compute();
  });

  ($('vm-profile') as HTMLSelectElement).addEventListener('input', () => { state.vmProfileSel = ($('vm-profile') as HTMLSelectElement).value; compute(); });
  ($('cloud-scheme') as HTMLSelectElement).addEventListener('input', () => { state.schemeId = ($('cloud-scheme') as HTMLSelectElement).value; compute(); });

  ['data-size', 'data-unit', 'compression', 'concurrency']
    .forEach(id => $(id).addEventListener('input', compute));

  populateControls();
  showAdvancedFor(state.infra);
  compute();
}
