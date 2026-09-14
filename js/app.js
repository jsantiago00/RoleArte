import * as db from './db.js';
import {
  ABILITIES, SKILLS, CLASS_OPTIONS, ALIGNMENTS, HIT_DICE_TYPES, CURRENCIES,
  EFFECT_KINDS, EFFECT_TARGETS,
  abilityModifier, formatModifier, proficiencyBonusForLevel,
  createDefaultCharacter, migrateCharacter, createEffect,
  getSaveBonus, getSkillBonus, getPassivePerception, getInitiative, getSpellSaveDc,
  getSpellAttackBonus, getArmorClass, getSpeed, getEffectiveAbilityModifier, getEffectModifierTotal,
  uid,
} from './sheet-data.js';
import { RACES, CLASSES, SUBCLASSES, SPELLS } from './compendium.js';

const app = document.getElementById('app');
const collapsedCards = new Set();
let current = null; // personaje actualmente abierto en memoria
let saveTimer = null;
let activeTab = 'personaje';

const TABS = [
  { id: 'personaje', label: 'Personaje' },
  { id: 'combate', label: 'Combate' },
  { id: 'conjuros', label: 'Conjuros' },
  { id: 'rasgos', label: 'Rasgos' },
  { id: 'equipo', label: 'Equipo' },
  { id: 'notas', label: 'Notas' },
];

// ---------- Utilidades ----------
function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function setPath(obj, path, value) {
  const parts = path.split('.');
  let target = obj;
  for (let i = 0; i < parts.length - 1; i += 1) {
    target = target[parts[i]];
  }
  target[parts[parts.length - 1]] = value;
}

function scheduleSave() {
  if (!current) return;
  current.updatedAt = Date.now();
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    db.saveCharacter(current).catch(() => showToast('No se pudo guardar. Revisá el espacio disponible.'));
  }, 350);
}

let toastEl = null;
function showToast(msg) {
  if (!toastEl) {
    toastEl = document.getElementById('tpl-toast').content.firstElementChild.cloneNode(true);
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastEl._t);
  toastEl._t = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

function showConfirm({ title, message, confirmLabel = 'Confirmar', danger = false }) {
  return new Promise((resolve) => {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.innerHTML = `
      <div class="modal">
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(message)}</p>
        <div class="modal-actions">
          <button data-act="cancel">Cancelar</button>
          <button class="${danger ? 'danger' : 'primary'}" data-act="ok">${escapeHtml(confirmLabel)}</button>
        </div>
      </div>`;
    document.body.appendChild(backdrop);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop || e.target.dataset.act === 'cancel') {
        backdrop.remove();
        resolve(false);
      } else if (e.target.dataset.act === 'ok') {
        backdrop.remove();
        resolve(true);
      }
    });
  });
}

function showModal(title, bodyHtml) {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.innerHTML = `
    <div class="modal modal-lg">
      <div class="modal-header-row">
        <h3>${escapeHtml(title)}</h3>
        <button class="icon-btn ghost" data-act="close">✕</button>
      </div>
      <div class="modal-body">${bodyHtml}</div>
    </div>`;
  document.body.appendChild(backdrop);
  const close = () => backdrop.remove();
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop || e.target.dataset.act === 'close') close();
  });
  return { backdrop, close };
}

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

function resizeImageFile(file, maxDim = 640) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) { height = Math.round((height * maxDim) / width); width = maxDim; }
          else { width = Math.round((width * maxDim) / height); height = maxDim; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function slugName(character) {
  return (character.name || 'personaje').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'personaje';
}

// ---------- Router ----------
window.addEventListener('hashchange', renderRoute);
function renderRoute() {
  const hash = location.hash || '#/list';
  const sheetMatch = hash.match(/^#\/sheet\/(.+)$/);
  if (sheetMatch) {
    openSheet(sheetMatch[1]);
  } else {
    current = null;
    renderList();
  }
}

async function openSheet(id) {
  const raw = await db.getCharacter(id);
  if (!raw) {
    showToast('No se encontró ese personaje.');
    location.hash = '#/list';
    return;
  }
  current = migrateCharacter(raw);
  activeTab = 'personaje';
  renderSheetView();
}

// ---------- Vista: lista de personajes ----------
async function renderList() {
  const characters = await db.getAllCharacters();
  characters.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));

  const cardsHtml = characters.map((c) => `
    <div class="char-card" data-open="${c.id}">
      <div class="portrait" style="${c.image ? `background-image:url('${c.image}')` : ''}">${c.image ? '' : '🧙'}</div>
      <div class="info">
        <div class="name">${escapeHtml(c.name || 'Sin nombre')}</div>
        <div class="sub">${escapeHtml([c.race, [c.className, c.subclass].filter(Boolean).join(' — ')].filter(Boolean).join(' · '))}</div>
        <div class="sub">${c.level ? `Nivel ${escapeHtml(c.level)}` : ''}</div>
      </div>
      <div class="card-actions">
        <button data-dup="${c.id}">Duplicar</button>
        <button data-del="${c.id}">Eliminar</button>
      </div>
    </div>`).join('');

  app.innerHTML = `
    <header class="appbar">
      <span class="brand">🎲 RoleArte</span>
      <div class="menu-wrap" id="list-menu-wrap">
        <button class="icon-btn ghost" id="list-menu-btn" aria-label="Menú">⋮</button>
      </div>
    </header>
    <main>
      ${characters.length === 0 ? `
        <div class="empty-state">
          <div class="big">🐉</div>
          <p>Todavía no tenés personajes guardados.<br>Creá el primero con el botón +.</p>
        </div>` : `<div class="char-grid">${cardsHtml}</div>`}
    </main>
    <button class="fab" id="new-char-btn" aria-label="Nuevo personaje">+</button>
    <input type="file" id="import-input" accept="application/json" hidden multiple>
  `;

  document.getElementById('new-char-btn').addEventListener('click', async () => {
    const c = createDefaultCharacter();
    await db.saveCharacter(c);
    location.hash = `#/sheet/${c.id}`;
  });

  app.querySelectorAll('[data-open]').forEach((elm) => {
    elm.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      location.hash = `#/sheet/${elm.dataset.open}`;
    });
  });

  app.querySelectorAll('[data-dup]').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const orig = await db.getCharacter(btn.dataset.dup);
      if (!orig) return;
      const copy = migrateCharacter(orig);
      copy.id = uid();
      copy.name = `${copy.name || 'Sin nombre'} (copia)`;
      copy.createdAt = Date.now();
      copy.updatedAt = Date.now();
      await db.saveCharacter(copy);
      showToast('Personaje duplicado.');
      renderList();
    });
  });

  app.querySelectorAll('[data-del]').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const target = characters.find((c) => c.id === btn.dataset.del);
      const ok = await showConfirm({
        title: 'Eliminar personaje',
        message: `¿Seguro que querés eliminar a "${target?.name || 'este personaje'}"? Esta acción no se puede deshacer.`,
        confirmLabel: 'Eliminar',
        danger: true,
      });
      if (!ok) return;
      await db.deleteCharacter(btn.dataset.del);
      showToast('Personaje eliminado.');
      renderList();
    });
  });

  const menuBtn = document.getElementById('list-menu-btn');
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleListMenu(characters);
  });

  document.getElementById('import-input').addEventListener('change', async (e) => {
    const files = Array.from(e.target.files || []);
    let count = 0;
    for (const file of files) {
      try {
        const text = await readFileAsText(file);
        const data = JSON.parse(text);
        const list = Array.isArray(data) ? data : [data];
        for (const item of list) {
          const c = migrateCharacter(item);
          c.id = uid();
          c.createdAt = Date.now();
          c.updatedAt = Date.now();
          await db.saveCharacter(c);
          count += 1;
        }
      } catch (err) {
        showToast(`No se pudo importar ${file.name}.`);
      }
    }
    if (count) showToast(`Se importaron ${count} personaje(s).`);
    e.target.value = '';
    renderList();
  });
}

function toggleListMenu(characters) {
  const existing = document.querySelector('.menu');
  if (existing) { existing.remove(); return; }
  const wrap = document.getElementById('list-menu-wrap');
  const menu = document.createElement('div');
  menu.className = 'menu';
  menu.innerHTML = `
    <button id="menu-import">Importar personaje(s)…</button>
    <button id="menu-export-all">Exportar todo…</button>
  `;
  wrap.appendChild(menu);
  document.getElementById('menu-import').addEventListener('click', () => {
    menu.remove();
    document.getElementById('import-input').click();
  });
  document.getElementById('menu-export-all').addEventListener('click', () => {
    menu.remove();
    if (!characters.length) { showToast('No hay personajes para exportar.'); return; }
    downloadJson('rolearte-personajes.json', characters);
  });
  const closeOnOutside = (e) => {
    if (!menu.contains(e.target) && e.target !== document.getElementById('list-menu-btn')) {
      menu.remove();
      document.removeEventListener('click', closeOnOutside);
    }
  };
  setTimeout(() => document.addEventListener('click', closeOnOutside), 0);
}

// ---------- Vista: ficha de personaje ----------
function cardWrap(id, title, bodyHtml) {
  const isCollapsed = collapsedCards.has(id);
  return `
    <section class="card${isCollapsed ? ' collapsed' : ''}" data-card="${id}">
      <div class="card-header" data-toggle="${id}">
        <h2>${title}</h2>
        <span class="chevron">▾</span>
      </div>
      <div class="card-body">${bodyHtml}</div>
    </section>`;
}

function renderHeaderCard(c) {
  const appliedRace = c.raceKey ? RACES.find((r) => r.key === c.raceKey) : null;
  const matchedRace = !appliedRace ? RACES.find((r) => r.name.toLowerCase() === (c.race || '').trim().toLowerCase()) : null;
  const matchedClass = CLASSES.find((cl) => cl.name.toLowerCase() === (c.className || '').trim().toLowerCase());
  const matchedSubclass = SUBCLASSES.find((s) => s.name.toLowerCase() === (c.subclass || '').trim().toLowerCase());
  const subclassOptions = matchedClass
    ? SUBCLASSES.filter((s) => s.classKey === matchedClass.key)
    : SUBCLASSES;

  let raceActionHtml = '';
  if (appliedRace) {
    raceActionHtml = `<button type="button" class="ghost apply-btn" data-action="remove-race" data-key="${appliedRace.key}">↩️ Quitar beneficios de ${escapeHtml(appliedRace.name)}</button>`;
  } else if (matchedRace) {
    raceActionHtml = `<button type="button" class="ghost apply-btn" data-action="apply-race" data-key="${matchedRace.key}">✨ Aplicar beneficios de ${escapeHtml(matchedRace.name)}</button>`;
  }
  const classActionHtml = matchedClass
    ? `<button type="button" class="ghost apply-btn" data-action="apply-class" data-key="${matchedClass.key}">✨ Aplicar beneficios de ${escapeHtml(matchedClass.name)}</button>`
    : '';
  const subclassActionHtml = matchedSubclass
    ? `<button type="button" class="ghost apply-btn" data-action="apply-subclass" data-key="${matchedSubclass.key}">✨ Agregar rasgos de ${escapeHtml(matchedSubclass.name)}</button>`
    : '';

  return cardWrap('header', 'Personaje', `
    <div class="portrait-upload">
      <div class="portrait-preview" id="portrait-preview" style="${c.image ? `background-image:url('${c.image}')` : ''}">${c.image ? '' : '🧙'}</div>
      <div class="actions">
        <button id="upload-photo-btn">Cambiar foto</button>
        ${c.image ? '<button id="remove-photo-btn" class="danger">Quitar foto</button>' : ''}
      </div>
      <input type="file" id="photo-input" accept="image/*" hidden>
    </div>
    <div class="field-row">
      <div class="field"><label>Nombre</label><input type="text" data-path="name" data-type="text" value="${escapeHtml(c.name)}" placeholder="Nombre del personaje"></div>
      <div class="field"><label>Jugador/a</label><input type="text" data-path="playerName" data-type="text" value="${escapeHtml(c.playerName)}"></div>
    </div>
    <div class="field-row">
      <div class="field"><label>Clase</label><input type="text" list="class-options" data-path="className" data-type="text" data-derive-trigger="1" value="${escapeHtml(c.className)}" placeholder="Ej: Mago"></div>
      <div class="field"><label>Subclase</label><input type="text" list="subclass-options" data-path="subclass" data-type="text" data-derive-trigger="1" value="${escapeHtml(c.subclass)}" placeholder="Ej: Evocación"></div>
      <div class="field"><label>Nivel</label><input type="number" min="1" max="20" data-path="level" data-type="number" data-derive-trigger="1" value="${c.level}"></div>
    </div>
    ${classActionHtml ? `<p class="hint" style="margin-top:-0.4rem;">${classActionHtml}</p>` : ''}
    ${subclassActionHtml ? `<p class="hint" style="margin-top:${classActionHtml ? '0' : '-0.4rem'};">${subclassActionHtml}</p>` : ''}
    <datalist id="class-options">${CLASS_OPTIONS.map((o) => `<option value="${o}">`).join('')}</datalist>
    <datalist id="subclass-options">${subclassOptions.map((s) => `<option value="${s.name}">`).join('')}</datalist>
    <div class="field-row">
      <div class="field"><label>Raza / linaje</label><input type="text" list="race-options" data-path="race" data-type="text" data-derive-trigger="1" value="${escapeHtml(c.race)}"></div>
      <div class="field"><label>Trasfondo</label><input type="text" data-path="background" data-type="text" value="${escapeHtml(c.background)}"></div>
    </div>
    ${raceActionHtml ? `<p class="hint" style="margin-top:-0.4rem;">${raceActionHtml}</p>` : ''}
    <datalist id="race-options">${RACES.map((r) => `<option value="${r.name}">`).join('')}</datalist>
    <div class="field-row">
      <div class="field">
        <label>Alineamiento</label>
        <select data-path="alignment" data-type="text">
          <option value="">—</option>
          ${ALIGNMENTS.map((a) => `<option value="${a}" ${c.alignment === a ? 'selected' : ''}>${a}</option>`).join('')}
        </select>
      </div>
      <div class="field">
        <label>Bono de competencia</label>
        <input type="number" data-path="proficiencyBonusOverride" data-type="number" data-allow-null="1"
          placeholder="Auto (+${proficiencyBonusForLevel(c.level)})"
          value="${typeof c.proficiencyBonusOverride === 'number' ? c.proficiencyBonusOverride : ''}">
      </div>
    </div>
  `);
}

function renderAbilitiesCard(c) {
  const boxes = ABILITIES.map((a) => {
    const mod = getEffectiveAbilityModifier(c, a.key);
    const save = getSaveBonus(c, a.key);
    const effectBonus = getEffectModifierTotal(c, `abilityScore.${a.key}`);
    return `
      <div class="ability-box">
        <label>${a.label}</label>
        <input type="number" data-path="abilities.${a.key}" data-type="number" value="${c.abilities[a.key]}">
        <div class="mod" data-derived="mod.${a.key}">${formatModifier(mod)}</div>
        ${effectBonus ? `<div class="mod-note" data-derived="modnote.${a.key}">(${formatModifier(effectBonus)} por efecto)</div>` : `<div class="mod-note" data-derived="modnote.${a.key}"></div>`}
        <div class="save-row">
          <input type="checkbox" data-path="saveProficiencies.${a.key}" data-type="checkbox" ${c.saveProficiencies[a.key] ? 'checked' : ''}>
          <span>Salvación <b data-derived="save.${a.key}">${formatModifier(save)}</b></span>
        </div>
      </div>`;
  }).join('');
  return cardWrap('abilities', 'Características', `<div class="ability-grid">${boxes}</div>`);
}

function renderSkillsCard(c) {
  const rows = SKILLS.map((s) => {
    const bonus = getSkillBonus(c, s);
    const prof = c.skillProficiencies[s.key];
    return `
      <div class="skill-row">
        <select class="prof-select" data-path="skillProficiencies.${s.key}" data-type="text">
          <option value="none" ${prof === 'none' ? 'selected' : ''}>—</option>
          <option value="prof" ${prof === 'prof' ? 'selected' : ''}>Competencia</option>
          <option value="expertise" ${prof === 'expertise' ? 'selected' : ''}>Pericia</option>
        </select>
        <span class="name">${s.label} <span class="ability-tag">${s.ability}</span></span>
        <span class="bonus" data-derived="skill.${s.key}">${formatModifier(bonus)}</span>
      </div>`;
  }).join('');
  return cardWrap('skills', 'Habilidades', `
    ${rows}
    <p class="hint" style="margin-top:0.8rem;">Percepción pasiva: <b data-derived="passivePerception">${getPassivePerception(c)}</b></p>
  `);
}

function renderCombatCard(c) {
  return cardWrap('combat', 'Combate', `
    <div class="stat-grid">
      <div class="stat-box"><label>CA base</label><input type="number" data-path="ac" data-type="number" value="${c.ac}"></div>
      <div class="stat-box"><label>CA total</label>
        <div class="computed" data-derived="ac">${getArmorClass(c)}</div>
      </div>
      <div class="stat-box"><label>Iniciativa</label>
        <div class="computed" data-derived="initiative">${formatModifier(getInitiative(c))}</div>
      </div>
      <div class="stat-box"><label>Bono iniciativa (extra)</label><input type="number" data-path="initiativeMisc" data-type="number" value="${c.initiativeMisc}"></div>
      <div class="stat-box"><label>Velocidad base (pies)</label><input type="number" data-path="speed" data-type="number" value="${c.speed}"></div>
      <div class="stat-box"><label>Velocidad total (pies)</label>
        <div class="computed" data-derived="speed">${getSpeed(c)}</div>
      </div>
    </div>
    <div class="field-row" style="margin-top:0.8rem;">
      <div class="field"><label>PG máximos</label><input type="number" data-path="hpMax" data-type="number" value="${c.hpMax}"></div>
      <div class="field"><label>PG actuales</label><input type="number" data-path="hpCurrent" data-type="number" value="${c.hpCurrent}"></div>
      <div class="field"><label>PG temporales</label><input type="number" data-path="hpTemp" data-type="number" value="${c.hpTemp}"></div>
    </div>
    <label>Combate rápido</label>
    <div class="dmg-heal-row">
      <input type="number" id="dmg-amount" min="0" placeholder="Cantidad">
      <button id="apply-damage" class="danger">🗡️ Recibir daño</button>
      <button id="apply-heal" class="primary">💚 Curar</button>
    </div>
    <p class="hint">El daño primero descuenta los PG temporales; la curación no supera los PG máximos.</p>
    <div class="field-row">
      <div class="field"><label>Dados de golpe (total)</label><input type="number" data-path="hitDice.total" data-type="number" value="${c.hitDice.total}"></div>
      <div class="field"><label>Tipo de dado</label>
        <select data-path="hitDice.type" data-type="text">
          ${HIT_DICE_TYPES.map((t) => `<option value="${t}" ${c.hitDice.type === t ? 'selected' : ''}>${t}</option>`).join('')}
        </select>
      </div>
      <div class="field"><label>Dados de golpe restantes</label><input type="number" data-path="hitDice.current" data-type="number" value="${c.hitDice.current}"></div>
    </div>
    <label>Salvaciones contra la muerte</label>
    <div class="death-saves">
      <div class="group">Éxitos
        ${[0, 1, 2].map((i) => `<input type="checkbox" data-path="deathSaves.successes.${i}" data-type="deathsave" ${c.deathSaves.successes > i ? 'checked' : ''}>`).join('')}
      </div>
      <div class="group">Fallos
        ${[0, 1, 2].map((i) => `<input type="checkbox" data-path="deathSaves.failures.${i}" data-type="deathsave" ${c.deathSaves.failures > i ? 'checked' : ''}>`).join('')}
      </div>
      <button id="reset-death-saves" class="ghost">Reiniciar</button>
    </div>
    <button id="long-rest-btn" class="add-row-btn">🌙 Descanso largo (restaura PG, dados de golpe y espacios de conjuro)</button>
  `);
}

function effectTargetOptionsHtml(selected) {
  const groups = {};
  EFFECT_TARGETS.forEach((t) => {
    groups[t.group] = groups[t.group] || [];
    groups[t.group].push(t);
  });
  return Object.entries(groups).map(([group, items]) => `
    <optgroup label="${group}">
      ${items.map((t) => `<option value="${t.value}" ${selected === t.value ? 'selected' : ''}>${t.label}</option>`).join('')}
    </optgroup>`).join('');
}

function renderEffectsCard(c) {
  const rows = c.effects.map((e, i) => {
    const modifiersHtml = (e.modifiers || []).map((m, mi) => `
      <div class="modifier-row">
        <select data-path="effects.${i}.modifiers.${mi}.target" data-type="text">
          ${effectTargetOptionsHtml(m.target)}
        </select>
        <input type="number" data-path="effects.${i}.modifiers.${mi}.amount" data-type="number" value="${m.amount}" placeholder="+/-">
        <button type="button" class="icon-btn danger" data-action="remove-modifier" data-index="${i}" data-subindex="${mi}">✕</button>
      </div>`).join('');
    return `
    <div class="row-card effect-row effect-${e.kind || 'other'}">
      <button class="remove-btn danger" data-action="remove-effect" data-index="${i}">✕</button>
      <div class="row-grid">
        <div class="field"><label>Nombre</label><input type="text" data-path="effects.${i}.name" data-type="text" value="${escapeHtml(e.name)}" placeholder="Ej: Escudo, Envenenado..."></div>
        <div class="field"><label>Tipo</label>
          <select data-path="effects.${i}.kind" data-type="text">
            ${Object.entries(EFFECT_KINDS).map(([k, l]) => `<option value="${k}" ${(e.kind || 'other') === k ? 'selected' : ''}>${l}</option>`).join('')}
          </select>
        </div>
        <div class="field"><label>Duración (rondas)</label>
          <input type="number" min="0" data-path="effects.${i}.rounds" data-type="number" data-allow-null="1" placeholder="Sin límite" value="${typeof e.rounds === 'number' ? e.rounds : ''}">
        </div>
      </div>
      <div class="field" style="margin-top:0.5rem;margin-bottom:0.5rem;"><label>Notas</label><input type="text" data-path="effects.${i}.notes" data-type="text" value="${escapeHtml(e.notes)}" placeholder="Ej: +2 CA, desventaja en ataques..."></div>
      <label>Modifica mientras esté activo</label>
      <div class="modifiers-list">${modifiersHtml}</div>
      <button type="button" class="ghost add-row-btn" data-action="add-modifier" data-index="${i}">+ Modificador de stat</button>
      ${typeof e.rounds === 'number' ? `<button class="tick-btn ghost" data-action="tick-effect" data-index="${i}">−1 ronda (quedan ${e.rounds})</button>` : ''}
    </div>`;
  }).join('');
  return cardWrap('effects', 'Efectos activos', `
    <p class="hint">Estados, escudos, buffs o debuffs temporales durante el combate. Los modificadores de stat se suman automáticamente a las tiradas mientras el efecto siga acá.</p>
    <div class="list-rows">${rows}</div>
    <button class="add-row-btn" data-action="add-effect">+ Añadir efecto</button>
  `);
}

function renderAttacksSpellsCard(c) {
  const attackRows = c.attacks.map((a, i) => `
    <div class="row-card">
      <button class="remove-btn danger" data-action="remove-attack" data-index="${i}">✕</button>
      <div class="row-grid">
        <div class="field"><label>Nombre</label><input type="text" data-path="attacks.${i}.name" data-type="text" value="${escapeHtml(a.name)}"></div>
        <div class="field"><label>Bono ataque</label><input type="text" data-path="attacks.${i}.bonus" data-type="text" value="${escapeHtml(a.bonus)}"></div>
        <div class="field"><label>Daño / Tipo</label><input type="text" data-path="attacks.${i}.damage" data-type="text" value="${escapeHtml(a.damage)}"></div>
        <div class="field"><label>Notas</label><input type="text" data-path="attacks.${i}.notes" data-type="text" value="${escapeHtml(a.notes)}"></div>
      </div>
    </div>`).join('');

  const sc = c.spellcasting;
  let spellcastingHtml = `
    <div class="checkbox-line">
      <input type="checkbox" id="spellcasting-enabled" data-path="spellcasting.enabled" data-type="checkbox" ${sc.enabled ? 'checked' : ''}>
      <label for="spellcasting-enabled">Este personaje lanza conjuros</label>
    </div>`;

  if (sc.enabled) {
    const cantripsHtml = sc.cantrips.map((name, i) => `
      <div class="row-card">
        <button class="remove-btn danger" data-action="remove-cantrip" data-index="${i}">✕</button>
        <div class="row-grid-info">
          <div class="field" style="margin-bottom:0;"><label>Truco</label><input type="text" list="spell-options" data-path="spellcasting.cantrips.${i}" data-type="text" value="${escapeHtml(name)}"></div>
          <button type="button" class="icon-btn ghost" data-action="spell-info">ℹ️</button>
        </div>
      </div>`).join('');

    const spellsHtml = sc.spells.map((sp, i) => `
      <div class="row-card">
        <button class="remove-btn danger" data-action="remove-spell" data-index="${i}">✕</button>
        <div class="row-grid">
          <div class="field"><label>Nivel</label>
            <input type="number" min="1" max="9" data-path="spellcasting.spells.${i}.level" data-type="number" value="${sp.level}">
          </div>
          <div class="field" style="grid-column: span 2;"><label>Nombre</label>
            <div class="row-grid-info">
              <input type="text" list="spell-options" data-path="spellcasting.spells.${i}.name" data-type="text" value="${escapeHtml(sp.name)}">
              <button type="button" class="icon-btn ghost" data-action="spell-info">ℹ️</button>
            </div>
          </div>
        </div>
        <div class="field" style="margin-top:0.5rem;margin-bottom:0;"><label>Notas</label><input type="text" data-path="spellcasting.spells.${i}.notes" data-type="text" value="${escapeHtml(sp.notes)}"></div>
        <div class="checkbox-line" style="margin-top:0.5rem;">
          <input type="checkbox" data-path="spellcasting.spells.${i}.prepared" data-type="checkbox" ${sp.prepared ? 'checked' : ''}>
          <label>Preparado</label>
        </div>
      </div>`).join('');

    const slotsRows = Array.from({ length: 9 }, (_, idx) => idx + 1).map((lvl) => {
      const slot = sc.slots[lvl] || { max: 0, used: 0 };
      const pips = Array.from({ length: slot.max }, (_, i) => `
        <button type="button" class="slot-pip ${i < slot.used ? 'used' : ''}" data-action="toggle-slot" data-level="${lvl}" data-index="${i}" title="${i < slot.used ? 'Recuperar espacio' : 'Gastar espacio'}"></button>
      `).join('');
      return `
      <tr>
        <td>${lvl}</td>
        <td><input type="number" min="0" data-path="spellcasting.slots.${lvl}.max" data-type="number" value="${slot.max}"></td>
        <td class="pip-cell">${slot.max > 0 ? pips : '—'}</td>
      </tr>`;
    }).join('');

    spellcastingHtml += `
      <div class="field-row">
        <div class="field"><label>Característica de lanzamiento</label>
          <select data-path="spellcasting.ability" data-type="text">
            ${ABILITIES.map((a) => `<option value="${a.key}" ${sc.ability === a.key ? 'selected' : ''}>${a.label}</option>`).join('')}
          </select>
        </div>
        <div class="field"><label>CD de salvación</label>
          <input type="number" data-path="spellcasting.saveDcOverride" data-type="number" data-allow-null="1"
            placeholder="Auto (${getSpellSaveDc(c)})"
            value="${typeof sc.saveDcOverride === 'number' ? sc.saveDcOverride : ''}">
        </div>
        <div class="field"><label>Bono de ataque</label>
          <input type="number" data-path="spellcasting.attackBonusOverride" data-type="number" data-allow-null="1"
            placeholder="Auto (${formatModifier(getSpellAttackBonus(c))})"
            value="${typeof sc.attackBonusOverride === 'number' ? sc.attackBonusOverride : ''}">
        </div>
      </div>
      <label>Espacios de conjuro</label>
      <table class="slots-table">
        <thead><tr><th>Nivel</th><th>Máx.</th><th>Disponibles (tocá para gastar/recuperar)</th></tr></thead>
        <tbody>${slotsRows}</tbody>
      </table>
      <label style="margin-top:0.9rem;">Trucos</label>
      <div class="list-rows">${cantripsHtml}</div>
      <div class="button-row">
        <button class="add-row-btn" data-action="add-cantrip">+ Añadir truco</button>
        <button class="add-row-btn" data-action="pick-cantrip">📖 Elegir del compendio</button>
      </div>
      <label style="margin-top:0.9rem;">Conjuros</label>
      <div class="list-rows">${spellsHtml}</div>
      <div class="button-row">
        <button class="add-row-btn" data-action="add-spell">+ Añadir conjuro</button>
        <button class="add-row-btn" data-action="pick-spell">📖 Elegir del compendio</button>
      </div>
      <datalist id="spell-options">${SPELLS.map((s) => `<option value="${s.name}">`).join('')}</datalist>
    `;
  }

  return cardWrap('attacks', 'Ataques y conjuros', `
    <label>Ataques</label>
    <div class="list-rows">${attackRows}</div>
    <button class="add-row-btn" data-action="add-attack">+ Añadir ataque</button>
    <hr style="border-color:var(--card-border); margin:1.1rem 0;">
    ${spellcastingHtml}
  `);
}

function renderFeaturesCard(c) {
  const rows = c.features.map((f, i) => `
    <div class="row-card">
      <button class="remove-btn danger" data-action="remove-feature" data-index="${i}">✕</button>
      <div class="field"><label>Nombre</label><input type="text" data-path="features.${i}.name" data-type="text" value="${escapeHtml(f.name)}"></div>
      <div class="field" style="margin-bottom:0;"><label>Descripción</label><textarea data-path="features.${i}.desc" data-type="text">${escapeHtml(f.desc)}</textarea></div>
    </div>`).join('');
  return cardWrap('features', 'Rasgos y dotes', `
    <p class="hint">Rasgos de raza, de clase, de subclase, dotes, etc. (los de raza se pueden agregar automáticamente desde la pestaña Personaje).</p>
    <div class="list-rows">${rows}</div>
    <button class="add-row-btn" data-action="add-feature">+ Añadir rasgo</button>
  `);
}

function renderBackgroundCard(c) {
  return cardWrap('background', 'Trasfondo', `
    <div class="field"><label>Beneficio de trasfondo</label><textarea data-path="backgroundFeature" data-type="text">${escapeHtml(c.backgroundFeature)}</textarea></div>
    <div class="field"><label>Competencias e idiomas</label><textarea data-path="proficienciesLanguages" data-type="text" rows="5" placeholder="Armaduras, armas, herramientas, idiomas...">${escapeHtml(c.proficienciesLanguages)}</textarea></div>
  `);
}

function renderEquipmentCard(c) {
  const currencyInputs = CURRENCIES.map((cur) => `
    <div class="field"><label>${cur.label}</label><input type="number" min="0" data-path="currency.${cur.key}" data-type="number" value="${c.currency[cur.key]}"></div>
  `).join('');
  return cardWrap('equipment', 'Equipo', `
    <label>Monedas</label>
    <div class="currency-grid">${currencyInputs}</div>
    <div class="field" style="margin-top:0.9rem;"><label>Objetos y equipo</label><textarea data-path="equipment" data-type="text" rows="5">${escapeHtml(c.equipment)}</textarea></div>
  `);
}

function renderNotesCard(c) {
  return cardWrap('notes', 'Notas', `
    <div class="field" style="margin-bottom:0;"><textarea data-path="notes" data-type="text" rows="6" placeholder="Historia, contactos, objetivos de la campaña...">${escapeHtml(c.notes)}</textarea></div>
  `);
}

function tabContentHtml(tabId, c) {
  if (tabId === 'personaje') return renderHeaderCard(c) + renderAbilitiesCard(c) + renderSkillsCard(c);
  if (tabId === 'combate') return renderCombatCard(c) + renderEffectsCard(c);
  if (tabId === 'conjuros') return renderAttacksSpellsCard(c);
  if (tabId === 'rasgos') return renderFeaturesCard(c) + renderBackgroundCard(c);
  if (tabId === 'equipo') return renderEquipmentCard(c);
  if (tabId === 'notas') return renderNotesCard(c);
  return '';
}

function renderTabMain() {
  const main = document.getElementById('sheet-main');
  main.innerHTML = tabContentHtml(activeTab, current);
  bindSheetEvents();
}

function renderSheetView() {
  const c = current;
  app.innerHTML = `
    <header class="appbar">
      <button class="icon-btn ghost" id="back-btn" aria-label="Volver">←</button>
      <h1>${escapeHtml(c.name || 'Nuevo personaje')}</h1>
      <div class="menu-wrap" id="sheet-menu-wrap">
        <button class="icon-btn ghost" id="sheet-menu-btn" aria-label="Menú">⋮</button>
      </div>
    </header>
    <nav class="tabbar">
      ${TABS.map((t) => `<button type="button" class="tab-btn ${t.id === activeTab ? 'active' : ''}" data-tab="${t.id}">${t.label}</button>`).join('')}
    </nav>
    <main id="sheet-main">
      ${tabContentHtml(activeTab, c)}
    </main>
  `;

  document.getElementById('back-btn').addEventListener('click', () => { location.hash = '#/list'; });

  document.getElementById('sheet-menu-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSheetMenu();
  });

  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.dataset.tab === activeTab) return;
      activeTab = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach((b) => b.classList.toggle('active', b.dataset.tab === activeTab));
      renderTabMain();
    });
  });

  bindSheetEvents();
}

function toggleSheetMenu() {
  const existing = document.querySelector('.menu');
  if (existing) { existing.remove(); return; }
  const wrap = document.getElementById('sheet-menu-wrap');
  const menu = document.createElement('div');
  menu.className = 'menu';
  menu.innerHTML = `
    <button id="menu-duplicate">Duplicar personaje</button>
    <button id="menu-export">Exportar personaje…</button>
    <button id="menu-delete">Eliminar personaje</button>
  `;
  wrap.appendChild(menu);
  document.getElementById('menu-duplicate').addEventListener('click', async () => {
    menu.remove();
    const copy = migrateCharacter(current);
    copy.id = uid();
    copy.name = `${copy.name || 'Sin nombre'} (copia)`;
    copy.createdAt = Date.now();
    copy.updatedAt = Date.now();
    await db.saveCharacter(copy);
    showToast('Personaje duplicado.');
    location.hash = `#/sheet/${copy.id}`;
  });
  document.getElementById('menu-export').addEventListener('click', () => {
    menu.remove();
    downloadJson(`${slugName(current)}.json`, current);
  });
  document.getElementById('menu-delete').addEventListener('click', async () => {
    menu.remove();
    const ok = await showConfirm({
      title: 'Eliminar personaje',
      message: `¿Seguro que querés eliminar a "${current.name || 'este personaje'}"? Esta acción no se puede deshacer.`,
      confirmLabel: 'Eliminar',
      danger: true,
    });
    if (!ok) return;
    await db.deleteCharacter(current.id);
    showToast('Personaje eliminado.');
    location.hash = '#/list';
  });
  const closeOnOutside = (e) => {
    if (!menu.contains(e.target) && e.target !== document.getElementById('sheet-menu-btn')) {
      menu.remove();
      document.removeEventListener('click', closeOnOutside);
    }
  };
  setTimeout(() => document.addEventListener('click', closeOnOutside), 0);
}

function updateDerivedFields() {
  const c = current;
  ABILITIES.forEach((a) => {
    const modEl = document.querySelector(`[data-derived="mod.${a.key}"]`);
    if (modEl) modEl.textContent = formatModifier(getEffectiveAbilityModifier(c, a.key));
    const noteEl = document.querySelector(`[data-derived="modnote.${a.key}"]`);
    if (noteEl) {
      const bonus = getEffectModifierTotal(c, `abilityScore.${a.key}`);
      noteEl.textContent = bonus ? `(${formatModifier(bonus)} por efecto)` : '';
    }
    const saveEl = document.querySelector(`[data-derived="save.${a.key}"]`);
    if (saveEl) saveEl.textContent = formatModifier(getSaveBonus(c, a.key));
  });
  SKILLS.forEach((s) => {
    const el = document.querySelector(`[data-derived="skill.${s.key}"]`);
    if (el) el.textContent = formatModifier(getSkillBonus(c, s));
  });
  const pp = document.querySelector('[data-derived="passivePerception"]');
  if (pp) pp.textContent = getPassivePerception(c);
  const init = document.querySelector('[data-derived="initiative"]');
  if (init) init.textContent = formatModifier(getInitiative(c));
  const acEl = document.querySelector('[data-derived="ac"]');
  if (acEl) acEl.textContent = getArmorClass(c);
  const speedEl = document.querySelector('[data-derived="speed"]');
  if (speedEl) speedEl.textContent = getSpeed(c);

  const pbInput = document.querySelector('[data-path="proficiencyBonusOverride"]');
  if (pbInput && document.activeElement !== pbInput) {
    pbInput.placeholder = `Auto (+${proficiencyBonusForLevel(c.level)})`;
  }
  const dcInput = document.querySelector('[data-path="spellcasting.saveDcOverride"]');
  if (dcInput && document.activeElement !== dcInput) {
    dcInput.placeholder = `Auto (${getSpellSaveDc(c)})`;
  }
  const abInput = document.querySelector('[data-path="spellcasting.attackBonusOverride"]');
  if (abInput && document.activeElement !== abInput) {
    abInput.placeholder = `Auto (${formatModifier(getSpellAttackBonus(c))})`;
  }

  const titleEl = document.querySelector('.appbar h1');
  if (titleEl) titleEl.textContent = c.name || 'Nuevo personaje';
}

// ---------- Compendio: razas, clases y conjuros ----------
async function applyRaceBenefits(raceKey) {
  const race = RACES.find((r) => r.key === raceKey);
  if (!race) return;
  const bonusList = Object.entries(race.abilityBonuses || {})
    .map(([k, v]) => `${ABILITIES.find((a) => a.key === k).label} +${v}`).join(', ') || 'ninguno';
  const ok = await showConfirm({
    title: `Aplicar beneficios de ${race.name}`,
    message: `Esto SUMA a tus puntuaciones actuales: ${bonusList}. También fija la velocidad en ${race.speed} m y agrega los rasgos raciales a "Rasgos y dotes". ¿Continuar?`,
    confirmLabel: 'Aplicar',
  });
  if (!ok) return;
  Object.entries(race.abilityBonuses || {}).forEach(([k, v]) => {
    current.abilities[k] = (Number(current.abilities[k]) || 0) + v;
  });
  current.speed = race.speed;
  race.traits.forEach((t) => {
    if (!current.features.some((f) => f.name === t.name)) {
      current.features.push({ name: t.name, desc: t.desc });
    }
  });
  const langNote = `Idiomas (${race.name}): ${race.languages}`;
  if (!current.proficienciesLanguages.includes(langNote)) {
    current.proficienciesLanguages = current.proficienciesLanguages ? `${current.proficienciesLanguages}\n${langNote}` : langNote;
  }
  current.raceKey = race.key;
  scheduleSave();
  renderSheetView();
  showToast(`Beneficios de ${race.name} aplicados.`);
}

async function removeRaceBenefits(raceKey) {
  const race = RACES.find((r) => r.key === raceKey);
  if (!race) return;
  const ok = await showConfirm({
    title: `Quitar beneficios de ${race.name}`,
    message: 'Esto resta de tus puntuaciones los bonos que se sumaron al aplicar esta raza. Los rasgos y notas de idioma agregados hay que borrarlos a mano si ya no los querés.',
    confirmLabel: 'Quitar',
    danger: true,
  });
  if (!ok) return;
  Object.entries(race.abilityBonuses || {}).forEach(([k, v]) => {
    current.abilities[k] = (Number(current.abilities[k]) || 0) - v;
  });
  current.raceKey = null;
  scheduleSave();
  renderSheetView();
  showToast('Beneficios de raza removidos.');
}

async function applyClassBenefits(classKey) {
  const cls = CLASSES.find((cl) => cl.key === classKey);
  if (!cls) return;
  const saveNames = cls.savingThrows.map((k) => ABILITIES.find((a) => a.key === k).label).join(' y ');
  const ok = await showConfirm({
    title: `Aplicar beneficios de ${cls.name}`,
    message: `Esto fija el dado de golpe en ${cls.hitDie} y marca competencia en las salvaciones de ${saveNames}. Es seguro aplicarlo más de una vez. ¿Continuar?`,
    confirmLabel: 'Aplicar',
  });
  if (!ok) return;
  current.hitDice.type = cls.hitDie;
  cls.savingThrows.forEach((k) => { current.saveProficiencies[k] = true; });
  const skillLabel = cls.skillOptions === 'any'
    ? `elegí ${cls.skillChoiceCount} habilidades cualesquiera al nivel 1`
    : `elegí ${cls.skillChoiceCount} entre: ${cls.skillOptions.map((k) => SKILLS.find((s) => s.key === k).label).join(', ')}`;
  const skillNote = `Habilidades (${cls.name}): ${skillLabel}.`;
  if (!current.proficienciesLanguages.includes(skillNote)) {
    current.proficienciesLanguages = current.proficienciesLanguages ? `${current.proficienciesLanguages}\n${skillNote}` : skillNote;
  }
  current.classKey = cls.key;
  scheduleSave();
  renderSheetView();
  showToast(`Beneficios de ${cls.name} aplicados.`);
}

async function applySubclassBenefits(subclassKey) {
  const sub = SUBCLASSES.find((s) => s.key === subclassKey);
  if (!sub) return;
  const ok = await showConfirm({
    title: `Agregar rasgos de ${sub.name}`,
    message: `Esto agrega "${sub.name}" a "Rasgos y dotes" con su descripción principal (${sub.category}, nivel ${sub.minLevel}). Es seguro aplicarlo más de una vez. ¿Continuar?`,
    confirmLabel: 'Agregar',
  });
  if (!ok) return;
  if (!current.features.some((f) => f.name === sub.name)) {
    current.features.push({ name: sub.name, desc: sub.desc });
  }
  current.subclassKey = sub.key;
  scheduleSave();
  renderSheetView();
  showToast(`Rasgos de ${sub.name} agregados.`);
}

function spellDetailHtml(spell) {
  return `
    <p class="hint" style="margin-top:0;">${spell.level === 0 ? 'Truco' : `Nivel ${spell.level}`} · ${escapeHtml(spell.school)}${spell.concentration ? ' · Concentración' : ''}${spell.ritual ? ' · Ritual' : ''}</p>
    <p><b>Tiempo de lanzamiento:</b> ${escapeHtml(spell.castingTime)}</p>
    <p><b>Alcance:</b> ${escapeHtml(spell.range)}</p>
    <p><b>Duración:</b> ${escapeHtml(spell.duration)}</p>
    <p>${escapeHtml(spell.desc)}</p>
    ${spell.effectPreset ? '<button type="button" id="apply-spell-effect" class="primary" style="width:100%;margin-top:0.5rem;">⚡ Aplicar como efecto activo</button>' : '<p class="hint">Este conjuro no tiene un modificador automático cargado; podés añadir uno manual en Efectos activos.</p>'}
  `;
}

function openSpellInfo(spell) {
  const { backdrop, close } = showModal(spell.name, spellDetailHtml(spell));
  const applyBtn = backdrop.querySelector('#apply-spell-effect');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      current.effects.push({
        ...createEffect(),
        name: spell.name,
        kind: spell.effectPreset.kind,
        rounds: spell.effectPreset.rounds,
        notes: `Conjuro: ${spell.name}`,
        modifiers: spell.effectPreset.modifiers.map((m) => ({ ...m })),
      });
      scheduleSave();
      close();
      activeTab = 'combate';
      renderSheetView();
      showToast('Efecto añadido en la pestaña Combate.');
    });
  }
}

function openSpellPicker(onPick) {
  const { backdrop } = showModal('Elegir del compendio', `
    <input type="text" id="spell-search" placeholder="Buscar conjuro..." style="margin-bottom:0.6rem;">
    <div id="spell-picker-list" class="list-rows"></div>
  `);
  const listEl = backdrop.querySelector('#spell-picker-list');
  const searchInput = backdrop.querySelector('#spell-search');
  function renderPickerList(filter) {
    const f = filter.trim().toLowerCase();
    const filtered = SPELLS
      .filter((s) => s.name.toLowerCase().includes(f))
      .sort((a, b) => a.level - b.level || a.name.localeCompare(b.name));
    listEl.innerHTML = filtered.slice(0, 60).map((s) => `
      <button type="button" class="spell-pick-row" data-key="${s.key}">
        <span class="spell-pick-name">${escapeHtml(s.name)}</span>
        <span class="spell-pick-level">${s.level === 0 ? 'Truco' : `Nv. ${s.level}`}</span>
      </button>`).join('') || '<p class="hint">Sin resultados.</p>';
    listEl.querySelectorAll('[data-key]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const spell = SPELLS.find((s) => s.key === btn.dataset.key);
        backdrop.remove();
        onPick(spell);
      });
    });
  }
  renderPickerList('');
  searchInput.addEventListener('input', () => renderPickerList(searchInput.value));
  searchInput.focus();
}

function findSpellByName(name) {
  const n = (name || '').trim().toLowerCase();
  if (!n) return null;
  return SPELLS.find((s) => s.name.toLowerCase() === n) || null;
}

function bindSheetEvents() {
  const main = document.getElementById('sheet-main');

  // Colapsar/expandir tarjetas
  main.querySelectorAll('[data-toggle]').forEach((header) => {
    header.addEventListener('click', () => {
      const id = header.dataset.toggle;
      const cardEl = header.closest('.card');
      if (collapsedCards.has(id)) { collapsedCards.delete(id); cardEl.classList.remove('collapsed'); }
      else { collapsedCards.add(id); cardEl.classList.add('collapsed'); }
    });
  });

  // Inputs de texto/número/textarea: actualización ligera sin re-render completo
  main.querySelectorAll('input[data-type="text"], input[data-type="number"], textarea[data-type="text"]').forEach((input) => {
    input.addEventListener('input', () => {
      const path = input.dataset.path;
      if (input.dataset.type === 'number') {
        if (input.value === '' || input.value === '-') return; // esperar a que termine de escribir
        setPath(current, path, Number(input.value));
      } else {
        setPath(current, path, input.value);
      }
      scheduleSave();
      updateDerivedFields();
    });
    input.addEventListener('blur', () => {
      const path = input.dataset.path;
      if (input.dataset.type === 'number' && input.value === '') {
        if (input.dataset.allowNull === '1') {
          setPath(current, path, null);
        } else {
          input.value = 0;
          setPath(current, path, 0);
        }
        scheduleSave();
        updateDerivedFields();
      }
      if (input.tagName === 'INPUT' && input.dataset.deriveTrigger) {
        renderSheetView();
      }
    });
  });

  // Selects y checkboxes normales: re-render completo (cambios poco frecuentes)
  main.querySelectorAll('select[data-path], input[type="checkbox"][data-type="checkbox"]').forEach((elm) => {
    elm.addEventListener('change', () => {
      const path = elm.dataset.path;
      const value = elm.type === 'checkbox' ? elm.checked : elm.value;
      setPath(current, path, value);
      scheduleSave();
      renderTabMain();
    });
  });

  // Salvaciones contra la muerte (checkboxes tipo "marcador")
  main.querySelectorAll('input[data-type="deathsave"]').forEach((cb) => {
    cb.addEventListener('change', () => {
      const [, field, idxStr] = cb.dataset.path.match(/deathSaves\.(successes|failures)\.(\d+)/);
      const idx = Number(idxStr);
      current.deathSaves[field] = cb.checked ? idx + 1 : idx;
      scheduleSave();
      renderTabMain();
    });
  });
  const resetDeathBtn = document.getElementById('reset-death-saves');
  if (resetDeathBtn) {
    resetDeathBtn.addEventListener('click', () => {
      current.deathSaves = { successes: 0, failures: 0 };
      scheduleSave();
      renderTabMain();
    });
  }

  // Foto de perfil
  const photoInput = document.getElementById('photo-input');
  const uploadBtn = document.getElementById('upload-photo-btn');
  const removeBtn = document.getElementById('remove-photo-btn');
  const portraitPreview = document.getElementById('portrait-preview');
  if (uploadBtn) uploadBtn.addEventListener('click', () => photoInput.click());
  if (portraitPreview) portraitPreview.addEventListener('click', () => photoInput.click());
  if (photoInput) {
    photoInput.addEventListener('change', async () => {
      const file = photoInput.files[0];
      if (!file) return;
      try {
        current.image = await resizeImageFile(file);
        scheduleSave();
        renderTabMain();
      } catch (err) {
        showToast('No se pudo procesar la imagen.');
      }
    });
  }
  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      current.image = '';
      scheduleSave();
      renderTabMain();
    });
  }

  // Beneficios de raza / clase
  const applyRaceBtn = main.querySelector('[data-action="apply-race"]');
  if (applyRaceBtn) applyRaceBtn.addEventListener('click', () => applyRaceBenefits(applyRaceBtn.dataset.key));
  const removeRaceBtn = main.querySelector('[data-action="remove-race"]');
  if (removeRaceBtn) removeRaceBtn.addEventListener('click', () => removeRaceBenefits(removeRaceBtn.dataset.key));
  const applyClassBtn = main.querySelector('[data-action="apply-class"]');
  if (applyClassBtn) applyClassBtn.addEventListener('click', () => applyClassBenefits(applyClassBtn.dataset.key));
  const applySubclassBtn = main.querySelector('[data-action="apply-subclass"]');
  if (applySubclassBtn) applySubclassBtn.addEventListener('click', () => applySubclassBenefits(applySubclassBtn.dataset.key));

  // Info de conjuros y elegir del compendio
  main.querySelectorAll('[data-action="spell-info"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.row-grid-info').querySelector('input');
      const spell = findSpellByName(input.value);
      if (!spell) { showToast('Ese conjuro no está en el compendio (es personalizado).'); return; }
      openSpellInfo(spell);
    });
  });
  const pickCantripBtn = main.querySelector('[data-action="pick-cantrip"]');
  if (pickCantripBtn) {
    pickCantripBtn.addEventListener('click', () => {
      openSpellPicker((spell) => {
        current.spellcasting.cantrips.push(spell.name);
        scheduleSave();
        renderTabMain();
      });
    });
  }
  const pickSpellBtn = main.querySelector('[data-action="pick-spell"]');
  if (pickSpellBtn) {
    pickSpellBtn.addEventListener('click', () => {
      openSpellPicker((spell) => {
        current.spellcasting.spells.push({ level: Math.max(1, spell.level), name: spell.name, prepared: false, notes: '' });
        scheduleSave();
        renderTabMain();
      });
    });
  }

  // Listas dinámicas: agregar / quitar filas
  main.querySelectorAll('[data-action]').forEach((btn) => {
    const action = btn.dataset.action;
    if (['apply-race', 'remove-race', 'apply-class', 'apply-subclass', 'spell-info', 'pick-cantrip', 'pick-spell'].includes(action)) return;
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.index);
      const subIdx = Number(btn.dataset.subindex);
      if (action === 'add-attack') current.attacks.push({ name: '', bonus: '', damage: '', notes: '' });
      if (action === 'remove-attack') current.attacks.splice(idx, 1);
      if (action === 'add-feature') current.features.push({ name: '', desc: '' });
      if (action === 'remove-feature') current.features.splice(idx, 1);
      if (action === 'add-cantrip') current.spellcasting.cantrips.push('');
      if (action === 'remove-cantrip') current.spellcasting.cantrips.splice(idx, 1);
      if (action === 'add-spell') current.spellcasting.spells.push({ level: 1, name: '', prepared: false, notes: '' });
      if (action === 'remove-spell') current.spellcasting.spells.splice(idx, 1);
      if (action === 'toggle-slot') {
        const lvl = Number(btn.dataset.level);
        const slot = current.spellcasting.slots[lvl];
        slot.used = idx < slot.used ? idx : idx + 1;
      }
      if (action === 'add-effect') current.effects.push(createEffect());
      if (action === 'remove-effect') current.effects.splice(idx, 1);
      if (action === 'tick-effect') {
        const effect = current.effects[idx];
        if (typeof effect.rounds === 'number') effect.rounds = Math.max(0, effect.rounds - 1);
      }
      if (action === 'add-modifier') current.effects[idx].modifiers.push({ target: 'ac', amount: 0 });
      if (action === 'remove-modifier') current.effects[idx].modifiers.splice(subIdx, 1);
      scheduleSave();
      renderTabMain();
    });
  });

  // Combate rápido: daño y curación
  const dmgAmountInput = document.getElementById('dmg-amount');
  const applyDamageBtn = document.getElementById('apply-damage');
  const applyHealBtn = document.getElementById('apply-heal');
  if (applyDamageBtn) {
    applyDamageBtn.addEventListener('click', () => {
      const amount = Math.max(0, Number(dmgAmountInput.value) || 0);
      if (amount === 0) return;
      const remainingAfterTemp = Math.max(0, amount - (Number(current.hpTemp) || 0));
      current.hpTemp = Math.max(0, (Number(current.hpTemp) || 0) - amount);
      current.hpCurrent = Math.max(0, (Number(current.hpCurrent) || 0) - remainingAfterTemp);
      scheduleSave();
      renderTabMain();
    });
  }
  if (applyHealBtn) {
    applyHealBtn.addEventListener('click', () => {
      const amount = Math.max(0, Number(dmgAmountInput.value) || 0);
      if (amount === 0) return;
      const max = Number(current.hpMax) || 0;
      const healed = (Number(current.hpCurrent) || 0) + amount;
      current.hpCurrent = max > 0 ? Math.min(max, healed) : healed;
      scheduleSave();
      renderTabMain();
    });
  }

  const longRestBtn = document.getElementById('long-rest-btn');
  if (longRestBtn) {
    longRestBtn.addEventListener('click', async () => {
      const ok = await showConfirm({
        title: 'Descanso largo',
        message: 'Esto restaura los PG al máximo, recupera dados de golpe y repone todos los espacios de conjuro. ¿Continuar?',
        confirmLabel: 'Descansar',
      });
      if (!ok) return;
      current.hpCurrent = Number(current.hpMax) || 0;
      current.deathSaves = { successes: 0, failures: 0 };
      const totalDice = Number(current.hitDice.total) || 0;
      const recovered = Math.max(1, Math.floor(totalDice / 2));
      current.hitDice.current = Math.min(totalDice, (Number(current.hitDice.current) || 0) + recovered);
      Object.values(current.spellcasting.slots).forEach((slot) => { slot.used = 0; });
      scheduleSave();
      renderTabMain();
      showToast('Descanso largo completado.');
    });
  }
}

// ---------- Arranque ----------
renderRoute();

if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
