// Constantes, modelo de datos por defecto y cálculos de la ficha de D&D 5ª edición.

export const ABILITIES = [
  { key: 'str', label: 'Fuerza' },
  { key: 'dex', label: 'Destreza' },
  { key: 'con', label: 'Constitución' },
  { key: 'int', label: 'Inteligencia' },
  { key: 'wis', label: 'Sabiduría' },
  { key: 'cha', label: 'Carisma' },
];

// Ordenadas por característica (Fuerza, Destreza, Constitución, Inteligencia, Sabiduría,
// Carisma) para que se vean agrupadas en la ficha, en vez de alfabéticas.
export const SKILLS = [
  { key: 'athletics', label: 'Atletismo', ability: 'str' },
  { key: 'acrobatics', label: 'Acrobacias', ability: 'dex' },
  { key: 'sleightOfHand', label: 'Juego de manos', ability: 'dex' },
  { key: 'stealth', label: 'Sigilo', ability: 'dex' },
  { key: 'arcana', label: 'Arcanos', ability: 'int' },
  { key: 'history', label: 'Historia', ability: 'int' },
  { key: 'investigation', label: 'Investigación', ability: 'int' },
  { key: 'nature', label: 'Naturaleza', ability: 'int' },
  { key: 'religion', label: 'Religión', ability: 'int' },
  { key: 'animalHandling', label: 'Trato con animales', ability: 'wis' },
  { key: 'insight', label: 'Perspicacia', ability: 'wis' },
  { key: 'medicine', label: 'Medicina', ability: 'wis' },
  { key: 'perception', label: 'Percepción', ability: 'wis' },
  { key: 'survival', label: 'Supervivencia', ability: 'wis' },
  { key: 'deception', label: 'Engaño', ability: 'cha' },
  { key: 'intimidation', label: 'Intimidación', ability: 'cha' },
  { key: 'performance', label: 'Interpretación', ability: 'cha' },
  { key: 'persuasion', label: 'Persuasión', ability: 'cha' },
];

export const CLASS_OPTIONS = [
  'Artífice', 'Bárbaro', 'Bardo', 'Brujo', 'Clérigo', 'Druida',
  'Explorador', 'Guerrero', 'Hechicero', 'Mago', 'Monje', 'Paladín', 'Pícaro',
];

export const ALIGNMENTS = [
  'Legal bueno', 'Neutral bueno', 'Caótico bueno',
  'Legal neutral', 'Neutral', 'Caótico neutral',
  'Legal malvado', 'Neutral malvado', 'Caótico malvado',
];

export const HIT_DICE_TYPES = ['d6', 'd8', 'd10', 'd12'];

export const CURRENCIES = [
  { key: 'cp', label: 'PC' },
  { key: 'sp', label: 'PP' },
  { key: 'ep', label: 'PE' },
  { key: 'gp', label: 'PO' },
  { key: 'pp', label: 'PPt' },
];

export function abilityModifier(score) {
  const n = Number(score);
  if (Number.isNaN(n)) return 0;
  return Math.floor((n - 10) / 2);
}

export function formatModifier(mod) {
  const n = Math.round(mod);
  return n >= 0 ? `+${n}` : `${n}`;
}

export function proficiencyBonusForLevel(level) {
  const lvl = Math.max(1, Math.min(20, Number(level) || 1));
  return Math.floor((lvl - 1) / 4) + 2;
}

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}
export { uid };

export function createDefaultCharacter() {
  const skillProficiencies = {};
  SKILLS.forEach((s) => { skillProficiencies[s.key] = 'none'; }); // none | prof | expertise

  const saveProficiencies = {};
  ABILITIES.forEach((a) => { saveProficiencies[a.key] = false; });

  const spellSlots = {};
  for (let lvl = 1; lvl <= 9; lvl += 1) {
    spellSlots[lvl] = { max: 0, used: 0 };
  }

  return {
    id: uid(),
    createdAt: Date.now(),
    updatedAt: Date.now(),

    name: '',
    image: '', // dataURL
    playerName: '',
    className: '',
    classKey: null, // clave de CLASSES cuyos beneficios ya se aplicaron
    subclass: '',
    subclassKey: null, // clave de SUBCLASSES cuyos rasgos ya se agregaron
    level: 1,
    race: '',
    raceKey: null, // clave de RACES cuyos beneficios ya se aplicaron
    background: '',
    alignment: '',

    abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    proficiencyBonusOverride: null, // si es número, sobreescribe el cálculo automático
    saveProficiencies,
    skillProficiencies,

    ac: 10,
    initiativeMisc: 0,
    speed: 30,
    hpMax: 0,
    hpCurrent: 0,
    hpTemp: 0,
    hitDice: { total: 1, type: 'd8', current: 1 },
    deathSaves: { successes: 0, failures: 0 },

    attacks: [],

    spellcasting: {
      enabled: false,
      ability: 'int',
      saveDcOverride: null,
      attackBonusOverride: null,
      slots: spellSlots,
      cantrips: [],
      spells: [], // { level, name, prepared, notes }
    },

    features: [], // { name, desc }
    backgroundFeature: '',
    proficienciesLanguages: '',
    equipment: '',
    currency: { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 },
    notes: '',
    effects: [], // { name, kind: 'buff'|'debuff'|'condition'|'other', rounds: number|null, notes }
  };
}

export const EFFECT_KINDS = {
  buff: 'Buff',
  debuff: 'Debuff',
  condition: 'Condición',
  other: 'Otro',
};

// Objetivos que un modificador de efecto puede afectar mientras el efecto está activo.
export const EFFECT_TARGETS = [
  { value: 'ac', label: 'Clase de armadura', group: 'Combate' },
  { value: 'initiative', label: 'Iniciativa', group: 'Combate' },
  { value: 'speed', label: 'Velocidad', group: 'Combate' },
  { value: 'spellDc', label: 'CD de salvación de conjuros', group: 'Conjuros' },
  { value: 'spellAttack', label: 'Bono de ataque de conjuros', group: 'Conjuros' },
  ...ABILITIES.map((a) => ({ value: `abilityScore.${a.key}`, label: `Puntuación de ${a.label}`, group: 'Características' })),
  ...ABILITIES.map((a) => ({ value: `save.${a.key}`, label: `Salvación de ${a.label}`, group: 'Salvaciones' })),
  ...SKILLS.map((s) => ({ value: `skill.${s.key}`, label: s.label, group: 'Habilidades' })),
];

export function createEffect() {
  return { name: '', kind: 'buff', rounds: null, notes: '', modifiers: [] };
}

export function getEffectModifierTotal(character, target) {
  return (character.effects || []).reduce((total, effect) => {
    const fromEffect = (effect.modifiers || [])
      .filter((m) => m.target === target)
      .reduce((sum, m) => sum + (Number(m.amount) || 0), 0);
    return total + fromEffect;
  }, 0);
}

export function getEffectiveAbilityScore(character, abilityKey) {
  const base = Number(character.abilities[abilityKey]) || 0;
  return base + getEffectModifierTotal(character, `abilityScore.${abilityKey}`);
}

export function migrateCharacter(char) {
  // Asegura que personajes guardados con versiones anteriores tengan todos los campos.
  const base = createDefaultCharacter();
  const merged = { ...base, ...char };
  merged.abilities = { ...base.abilities, ...(char.abilities || {}) };
  merged.saveProficiencies = { ...base.saveProficiencies, ...(char.saveProficiencies || {}) };
  merged.skillProficiencies = { ...base.skillProficiencies, ...(char.skillProficiencies || {}) };
  merged.hitDice = { ...base.hitDice, ...(char.hitDice || {}) };
  merged.deathSaves = { ...base.deathSaves, ...(char.deathSaves || {}) };
  merged.currency = { ...base.currency, ...(char.currency || {}) };
  merged.spellcasting = {
    ...base.spellcasting,
    ...(char.spellcasting || {}),
    slots: { ...base.spellcasting.slots, ...((char.spellcasting || {}).slots || {}) },
    cantrips: (char.spellcasting && char.spellcasting.cantrips) || [],
    spells: (char.spellcasting && char.spellcasting.spells) || [],
  };
  merged.attacks = char.attacks || [];
  merged.features = char.features || [];
  merged.effects = (char.effects || []).map((e) => ({ ...createEffect(), ...e, modifiers: e.modifiers || [] }));
  merged.raceKey = char.raceKey || null;
  merged.classKey = char.classKey || null;
  merged.subclassKey = char.subclassKey || null;
  return merged;
}

export function getProficiencyBonus(character) {
  if (typeof character.proficiencyBonusOverride === 'number') {
    return character.proficiencyBonusOverride;
  }
  return proficiencyBonusForLevel(character.level);
}

export function getEffectiveAbilityModifier(character, abilityKey) {
  return abilityModifier(getEffectiveAbilityScore(character, abilityKey));
}

export function getSaveBonus(character, abilityKey) {
  const mod = abilityModifier(getEffectiveAbilityScore(character, abilityKey));
  const isProf = !!character.saveProficiencies[abilityKey];
  const effectBonus = getEffectModifierTotal(character, `save.${abilityKey}`);
  return mod + (isProf ? getProficiencyBonus(character) : 0) + effectBonus;
}

export function getSkillBonus(character, skill) {
  const mod = abilityModifier(getEffectiveAbilityScore(character, skill.ability));
  const prof = character.skillProficiencies[skill.key];
  const pb = getProficiencyBonus(character);
  const effectBonus = getEffectModifierTotal(character, `skill.${skill.key}`);
  if (prof === 'expertise') return mod + pb * 2 + effectBonus;
  if (prof === 'prof') return mod + pb + effectBonus;
  return mod + effectBonus;
}

export function getPassivePerception(character) {
  const perceptionSkill = SKILLS.find((s) => s.key === 'perception');
  return 10 + getSkillBonus(character, perceptionSkill);
}

export function getInitiative(character) {
  return abilityModifier(getEffectiveAbilityScore(character, 'dex'))
    + (Number(character.initiativeMisc) || 0)
    + getEffectModifierTotal(character, 'initiative');
}

export function getArmorClass(character) {
  return (Number(character.ac) || 0) + getEffectModifierTotal(character, 'ac');
}

export function getSpeed(character) {
  return (Number(character.speed) || 0) + getEffectModifierTotal(character, 'speed');
}

export function getSpellSaveDc(character) {
  const effectBonus = getEffectModifierTotal(character, 'spellDc');
  if (typeof character.spellcasting.saveDcOverride === 'number') {
    return character.spellcasting.saveDcOverride + effectBonus;
  }
  const mod = abilityModifier(getEffectiveAbilityScore(character, character.spellcasting.ability));
  return 8 + getProficiencyBonus(character) + mod + effectBonus;
}

export function getSpellAttackBonus(character) {
  const effectBonus = getEffectModifierTotal(character, 'spellAttack');
  if (typeof character.spellcasting.attackBonusOverride === 'number') {
    return character.spellcasting.attackBonusOverride + effectBonus;
  }
  const mod = abilityModifier(getEffectiveAbilityScore(character, character.spellcasting.ability));
  return getProficiencyBonus(character) + mod + effectBonus;
}
