// Constantes, modelo de datos por defecto y cálculos de la ficha de D&D 5ª edición.

export const ABILITIES = [
  { key: 'str', label: 'Fuerza' },
  { key: 'dex', label: 'Destreza' },
  { key: 'con', label: 'Constitución' },
  { key: 'int', label: 'Inteligencia' },
  { key: 'wis', label: 'Sabiduría' },
  { key: 'cha', label: 'Carisma' },
];

export const SKILLS = [
  { key: 'acrobatics', label: 'Acrobacias', ability: 'dex' },
  { key: 'animalHandling', label: 'Trato con animales', ability: 'wis' },
  { key: 'arcana', label: 'Arcanos', ability: 'int' },
  { key: 'athletics', label: 'Atletismo', ability: 'str' },
  { key: 'deception', label: 'Engaño', ability: 'cha' },
  { key: 'history', label: 'Historia', ability: 'int' },
  { key: 'insight', label: 'Perspicacia', ability: 'wis' },
  { key: 'intimidation', label: 'Intimidación', ability: 'cha' },
  { key: 'investigation', label: 'Investigación', ability: 'int' },
  { key: 'medicine', label: 'Medicina', ability: 'wis' },
  { key: 'nature', label: 'Naturaleza', ability: 'int' },
  { key: 'perception', label: 'Percepción', ability: 'wis' },
  { key: 'performance', label: 'Interpretación', ability: 'cha' },
  { key: 'persuasion', label: 'Persuasión', ability: 'cha' },
  { key: 'religion', label: 'Religión', ability: 'int' },
  { key: 'sleightOfHand', label: 'Juego de manos', ability: 'dex' },
  { key: 'stealth', label: 'Sigilo', ability: 'dex' },
  { key: 'survival', label: 'Supervivencia', ability: 'wis' },
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
    subclass: '',
    level: 1,
    race: '',
    background: '',
    alignment: '',

    abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    proficiencyBonusOverride: null, // si es número, sobreescribe el cálculo automático
    saveProficiencies,
    skillProficiencies,

    ac: 10,
    initiativeMisc: 0,
    speed: 9,
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
  merged.effects = char.effects || [];
  return merged;
}

export function getProficiencyBonus(character) {
  if (typeof character.proficiencyBonusOverride === 'number') {
    return character.proficiencyBonusOverride;
  }
  return proficiencyBonusForLevel(character.level);
}

export function getSaveBonus(character, abilityKey) {
  const mod = abilityModifier(character.abilities[abilityKey]);
  const isProf = !!character.saveProficiencies[abilityKey];
  return mod + (isProf ? getProficiencyBonus(character) : 0);
}

export function getSkillBonus(character, skill) {
  const mod = abilityModifier(character.abilities[skill.ability]);
  const prof = character.skillProficiencies[skill.key];
  const pb = getProficiencyBonus(character);
  if (prof === 'expertise') return mod + pb * 2;
  if (prof === 'prof') return mod + pb;
  return mod;
}

export function getPassivePerception(character) {
  const perceptionSkill = SKILLS.find((s) => s.key === 'perception');
  return 10 + getSkillBonus(character, perceptionSkill);
}

export function getInitiative(character) {
  return abilityModifier(character.abilities.dex) + (Number(character.initiativeMisc) || 0);
}

export function getSpellSaveDc(character) {
  if (typeof character.spellcasting.saveDcOverride === 'number') {
    return character.spellcasting.saveDcOverride;
  }
  const mod = abilityModifier(character.abilities[character.spellcasting.ability]);
  return 8 + getProficiencyBonus(character) + mod;
}

export function getSpellAttackBonus(character) {
  if (typeof character.spellcasting.attackBonusOverride === 'number') {
    return character.spellcasting.attackBonusOverride;
  }
  const mod = abilityModifier(character.abilities[character.spellcasting.ability]);
  return getProficiencyBonus(character) + mod;
}
