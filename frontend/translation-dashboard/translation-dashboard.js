/* Issue #771 — Translation Dashboard logic */

import { I18nEngine, SUPPORTED_LANGUAGES } from '../../js-modules/i18n-engine.js';

const engine = new I18nEngine();

const langSelect = document.getElementById('lang-select');
const statusFilter = document.getElementById('status-filter');
const tableBody = document.getElementById('table-body');
const exportBtn = document.getElementById('export-btn');

/** Flatten a nested dictionary into { "nav.home": "Home", ... } */
function flatten(obj, prefix = '') {
  const out = {};
  for (const [key, value] of Object.entries(obj || {})) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(out, flatten(value, path));
    } else {
      out[path] = value;
    }
  }
  return out;
}

function populateLanguageSelect() {
  langSelect.innerHTML = '';
  SUPPORTED_LANGUAGES.filter((l) => l.code !== 'en').forEach((lang) => {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = `${lang.nativeLabel} (${lang.label})`;
    langSelect.appendChild(option);
  });
}

async function renderTable() {
  const targetLang = langSelect.value;
  const filter = statusFilter.value;

  await engine.setLanguage('en');
  await engine.setLanguage(targetLang);

  const englishFlat = flatten(engine.dictionaries.en);
  const targetFlat = flatten(engine.dictionaries[targetLang]);
  const aiFlat = flatten(engine.aiCache[targetLang]);

  const rows = Object.keys(englishFlat)
    .map((key) => {
      const status = engine.getStatus(key, targetLang);
      const currentValue = targetFlat[key] ?? aiFlat[key] ?? '';
      return { key, english: englishFlat[key], value: currentValue, status };
    })
    .filter((row) => filter === 'all' || row.status === filter);

  tableBody.innerHTML = '';
  if (rows.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5">No strings match this filter.</td></tr>`;
    return;
  }

  rows.forEach((row) => {
    const tr = document.createElement('tr');

    const keyCell = document.createElement('td');
    keyCell.innerHTML = `<code>${row.key}</code>`;

    const englishCell = document.createElement('td');
    englishCell.textContent = row.english;

    const valueCell = document.createElement('td');
    const textarea = document.createElement('textarea');
    textarea.value = row.value;
    textarea.rows = 2;
    valueCell.appendChild(textarea);

    const statusCell = document.createElement('td');
    const badge = document.createElement('span');
    badge.className = `badge badge--${row.status}`;
    badge.textContent = row.status;
    statusCell.appendChild(badge);

    const actionCell = document.createElement('td');
    const saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.textContent = 'Mark reviewed & save';
    saveBtn.addEventListener('click', () => {
      engine.setOverride(targetLang, row.key, textarea.value);
      badge.textContent = 'human';
      badge.className = 'badge badge--human';
    });
    actionCell.appendChild(saveBtn);

    tr.append(keyCell, englishCell, valueCell, statusCell, actionCell);
    tableBody.appendChild(tr);
  });
}

function exportCurrentLanguage() {
  const targetLang = langSelect.value;
  const flat = flatten(engine.dictionaries[targetLang]);

  // Rebuild nested structure for a clean, mergeable locale file.
  const nested = {};
  for (const [path, value] of Object.entries(flat)) {
    const parts = path.split('.');
    let cursor = nested;
    parts.forEach((part, i) => {
      if (i === parts.length - 1) {
        cursor[part] = value;
      } else {
        cursor[part] = cursor[part] || {};
        cursor = cursor[part];
      }
    });
  }

  const blob = new Blob([JSON.stringify(nested, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${targetLang}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

populateLanguageSelect();
langSelect.addEventListener('change', renderTable);
statusFilter.addEventListener('change', renderTable);
exportBtn.addEventListener('click', exportCurrentLanguage);
renderTable();
