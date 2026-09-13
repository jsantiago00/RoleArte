// Compendio de referencia: razas, clases y conjuros conocidos, basados en el contenido
// abierto (SRD) de D&D 5ª edición. Los textos son resúmenes propios, no copias literales
// de los libros. Es un punto de partida editable: lo que falte se puede seguir cargando
// a mano en la ficha como texto libre (clase, subclase y conjuros no dejan de ser campos
// de texto normales).

export const RACES = [
  {
    key: 'humano', name: 'Humano',
    abilityBonuses: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
    speed: 9, size: 'Mediano',
    languages: 'Común y un idioma adicional a elección',
    traits: [
      { name: 'Adaptable', desc: 'Un idioma y competencias adicionales según la variante que uses en tu mesa.' },
    ],
  },
  {
    key: 'elfo_alto', name: 'Elfo (Alto)',
    abilityBonuses: { dex: 2, int: 1 },
    speed: 9, size: 'Mediano',
    languages: 'Común, Élfico y un idioma adicional',
    traits: [
      { name: 'Visión en la oscuridad', desc: 'Ves con poca luz hasta 18 m como si fuera luz brillante, y en oscuridad como luz tenue (sin distinguir color).' },
      { name: 'Sentidos feéricos', desc: 'Ventaja en salvaciones contra ser hechizado; la magia no puede dormirte.' },
      { name: 'Trance', desc: 'No necesitas dormir: meditás 4 horas para obtener el beneficio de un descanso largo.' },
      { name: 'Truco de mago', desc: 'Conocés un cantrip de la lista de mago, usando Inteligencia como característica.' },
    ],
  },
  {
    key: 'elfo_bosque', name: 'Elfo (del Bosque)',
    abilityBonuses: { dex: 2, wis: 1 },
    speed: 10.5, size: 'Mediano',
    languages: 'Común, Élfico',
    traits: [
      { name: 'Visión en la oscuridad', desc: 'Ves con poca luz hasta 18 m como si fuera luz brillante, y en oscuridad como luz tenue.' },
      { name: 'Sentidos feéricos', desc: 'Ventaja en salvaciones contra ser hechizado; la magia no puede dormirte.' },
      { name: 'Trance', desc: 'No necesitas dormir: meditás 4 horas para obtener el beneficio de un descanso largo.' },
      { name: 'Máscara de la espesura', desc: 'Podés intentar esconderte incluso con solo un ligero oscurecimiento natural (follaje, lluvia, niebla, etc.).' },
    ],
  },
  {
    key: 'enano_colinas', name: 'Enano (de las Colinas)',
    abilityBonuses: { con: 2, wis: 1 },
    speed: 7.5, size: 'Mediano',
    languages: 'Común, Enano',
    traits: [
      { name: 'Visión en la oscuridad', desc: 'Ves con poca luz hasta 18 m como si fuera luz brillante, y en oscuridad como luz tenue.' },
      { name: 'Resistencia enana', desc: 'Ventaja en salvaciones contra veneno; resistencia al daño de veneno.' },
      { name: 'Entrenamiento de combate enano', desc: 'Competencia con hacha de mano, hacha de guerra, martillo ligero y martillo de guerra.' },
      { name: 'Aguante enano', desc: '+1 punto de golpe máximo por cada nivel que obtengas.' },
    ],
  },
  {
    key: 'enano_montanas', name: 'Enano (de las Montañas)',
    abilityBonuses: { str: 2, con: 2 },
    speed: 7.5, size: 'Mediano',
    languages: 'Común, Enano',
    traits: [
      { name: 'Visión en la oscuridad', desc: 'Ves con poca luz hasta 18 m como si fuera luz brillante, y en oscuridad como luz tenue.' },
      { name: 'Resistencia enana', desc: 'Ventaja en salvaciones contra veneno; resistencia al daño de veneno.' },
      { name: 'Entrenamiento con armadura', desc: 'Competencia con armadura ligera y media.' },
    ],
  },
  {
    key: 'mediano_pies_ligeros', name: 'Mediano (Pies Ligeros)',
    abilityBonuses: { dex: 2, cha: 1 },
    speed: 7.5, size: 'Pequeño',
    languages: 'Común, Mediano',
    traits: [
      { name: 'Valentía', desc: 'Ventaja en salvaciones contra estar asustado.' },
      { name: 'Agilidad mediana', desc: 'Podés moverte a través del espacio de cualquier criatura de tamaño mayor al tuyo.' },
      { name: 'Sigiloso por naturaleza', desc: 'Podés intentar esconderte incluso detrás de una criatura al menos una talla más grande que vos.' },
    ],
  },
  {
    key: 'mediano_robusto', name: 'Mediano (Robusto)',
    abilityBonuses: { dex: 2, con: 1 },
    speed: 7.5, size: 'Pequeño',
    languages: 'Común, Mediano',
    traits: [
      { name: 'Valentía', desc: 'Ventaja en salvaciones contra estar asustado.' },
      { name: 'Agilidad mediana', desc: 'Podés moverte a través del espacio de cualquier criatura de tamaño mayor al tuyo.' },
      { name: 'Resistencia robusta', desc: 'Ventaja en salvaciones contra veneno; resistencia al daño de veneno.' },
    ],
  },
  {
    key: 'draconido', name: 'Dracónido',
    abilityBonuses: { str: 2, cha: 1 },
    speed: 9, size: 'Mediano',
    languages: 'Común, Dracónico',
    traits: [
      { name: 'Ascendencia dracónica', desc: 'Elegís un tipo de dragón: define el tipo de daño de tu arma de aliento y tu resistencia a ese daño.' },
      { name: 'Arma de aliento', desc: 'Acción para exhalar energía destructiva (salvación de Constitución); el daño escala con el nivel.' },
      { name: 'Resistencia al daño', desc: 'Resistencia al tipo de daño de tu ascendencia dracónica.' },
    ],
  },
  {
    key: 'gnomo_rocas', name: 'Gnomo (de las Rocas)',
    abilityBonuses: { int: 2, con: 1 },
    speed: 7.5, size: 'Pequeño',
    languages: 'Común, Gnómico',
    traits: [
      { name: 'Visión en la oscuridad', desc: 'Ves con poca luz hasta 18 m como si fuera luz brillante, y en oscuridad como luz tenue.' },
      { name: 'Astucia gnoma', desc: 'Ventaja en salvaciones de Inteligencia, Sabiduría y Carisma contra magia.' },
      { name: 'Conocimiento del artesano', desc: 'Sumás el doble de tu bono de competencia en tiradas de Historia sobre objetos mecánicos o alquímicos.' },
      { name: 'Manitas', desc: 'Sabés cómo reparar y fabricar pequeños dispositivos mecánicos.' },
    ],
  },
  {
    key: 'gnomo_bosque', name: 'Gnomo (del Bosque)',
    abilityBonuses: { int: 2, dex: 1 },
    speed: 7.5, size: 'Pequeño',
    languages: 'Común, Gnómico',
    traits: [
      { name: 'Visión en la oscuridad', desc: 'Ves con poca luz hasta 18 m como si fuera luz brillante, y en oscuridad como luz tenue.' },
      { name: 'Astucia gnoma', desc: 'Ventaja en salvaciones de Inteligencia, Sabiduría y Carisma contra magia.' },
      { name: 'Ilusionismo innato', desc: 'Conocés el cantrip Ilusión menor (Inteligencia).' },
      { name: 'Habla con bestias pequeñas', desc: 'Podés comunicarte de forma simple con bestias pequeñas.' },
    ],
  },
  {
    key: 'semielfo', name: 'Semielfo',
    abilityBonuses: { cha: 2 },
    speed: 9, size: 'Mediano',
    languages: 'Común, Élfico y un idioma adicional',
    traits: [
      { name: 'Aumento de característica adicional', desc: 'Elegí +1 a dos características distintas (además del +2 a Carisma); sumalo manualmente en Características.' },
      { name: 'Visión en la oscuridad', desc: 'Ves con poca luz hasta 18 m como si fuera luz brillante, y en oscuridad como luz tenue.' },
      { name: 'Sentidos feéricos', desc: 'Ventaja en salvaciones contra ser hechizado; la magia no puede dormirte.' },
      { name: 'Versatilidad en habilidades', desc: 'Competencia en dos habilidades a tu elección.' },
    ],
  },
  {
    key: 'semiorco', name: 'Semiorco',
    abilityBonuses: { str: 2, con: 1 },
    speed: 9, size: 'Mediano',
    languages: 'Común, Orco',
    traits: [
      { name: 'Visión en la oscuridad', desc: 'Ves con poca luz hasta 18 m como si fuera luz brillante, y en oscuridad como luz tenue.' },
      { name: 'Amenazador', desc: 'Competencia en la habilidad Intimidación.' },
      { name: 'Resistencia implacable', desc: 'Al llegar a 0 PG sin morir de inmediato, podés quedar en 1 PG en su lugar (una vez por descanso largo).' },
      { name: 'Ataques salvajes', desc: 'Al sacar un crítico con un arma cuerpo a cuerpo, tirás un dado de daño extra.' },
    ],
  },
  {
    key: 'tiflin', name: 'Tiflin',
    abilityBonuses: { cha: 2, int: 1 },
    speed: 9, size: 'Mediano',
    languages: 'Común, Infernal',
    traits: [
      { name: 'Visión en la oscuridad', desc: 'Ves con poca luz hasta 18 m como si fuera luz brillante, y en oscuridad como luz tenue.' },
      { name: 'Resistencia infernal', desc: 'Resistencia al daño de fuego.' },
      { name: 'Legado infernal', desc: 'Conocés el cantrip Taumaturgia; a niveles más altos ganás Reprensión infernal y Oscuridad (1 vez por descanso largo).' },
    ],
  },
];

export const CLASSES = [
  {
    key: 'barbaro', name: 'Bárbaro', hitDie: 'd12', savingThrows: ['str', 'con'],
    primaryAbility: 'Fuerza', skillChoiceCount: 2,
    skillOptions: ['animalHandling', 'athletics', 'intimidation', 'nature', 'perception', 'survival'],
  },
  {
    key: 'bardo', name: 'Bardo', hitDie: 'd8', savingThrows: ['dex', 'cha'],
    primaryAbility: 'Carisma', skillChoiceCount: 3,
    skillOptions: 'any',
  },
  {
    key: 'brujo', name: 'Brujo', hitDie: 'd8', savingThrows: ['wis', 'cha'],
    primaryAbility: 'Carisma', skillChoiceCount: 2,
    skillOptions: ['arcana', 'deception', 'history', 'intimidation', 'investigation', 'nature', 'religion'],
  },
  {
    key: 'clerigo', name: 'Clérigo', hitDie: 'd8', savingThrows: ['wis', 'cha'],
    primaryAbility: 'Sabiduría', skillChoiceCount: 2,
    skillOptions: ['history', 'insight', 'medicine', 'persuasion', 'religion'],
  },
  {
    key: 'druida', name: 'Druida', hitDie: 'd8', savingThrows: ['int', 'wis'],
    primaryAbility: 'Sabiduría', skillChoiceCount: 2,
    skillOptions: ['arcana', 'animalHandling', 'insight', 'medicine', 'nature', 'perception', 'religion', 'survival'],
  },
  {
    key: 'explorador', name: 'Explorador', hitDie: 'd10', savingThrows: ['str', 'dex'],
    primaryAbility: 'Destreza y Sabiduría', skillChoiceCount: 3,
    skillOptions: ['animalHandling', 'athletics', 'insight', 'investigation', 'nature', 'perception', 'stealth', 'survival'],
  },
  {
    key: 'guerrero', name: 'Guerrero', hitDie: 'd10', savingThrows: ['str', 'con'],
    primaryAbility: 'Fuerza o Destreza', skillChoiceCount: 2,
    skillOptions: ['acrobatics', 'animalHandling', 'athletics', 'history', 'insight', 'intimidation', 'perception', 'survival'],
  },
  {
    key: 'hechicero', name: 'Hechicero', hitDie: 'd6', savingThrows: ['con', 'cha'],
    primaryAbility: 'Carisma', skillChoiceCount: 2,
    skillOptions: ['arcana', 'deception', 'insight', 'intimidation', 'persuasion', 'religion'],
  },
  {
    key: 'mago', name: 'Mago', hitDie: 'd6', savingThrows: ['int', 'wis'],
    primaryAbility: 'Inteligencia', skillChoiceCount: 2,
    skillOptions: ['arcana', 'history', 'insight', 'investigation', 'medicine', 'religion'],
  },
  {
    key: 'monje', name: 'Monje', hitDie: 'd8', savingThrows: ['str', 'dex'],
    primaryAbility: 'Destreza y Sabiduría', skillChoiceCount: 2,
    skillOptions: ['acrobatics', 'athletics', 'history', 'insight', 'religion', 'stealth'],
  },
  {
    key: 'paladin', name: 'Paladín', hitDie: 'd10', savingThrows: ['wis', 'cha'],
    primaryAbility: 'Fuerza y Carisma', skillChoiceCount: 2,
    skillOptions: ['athletics', 'insight', 'intimidation', 'medicine', 'persuasion', 'religion'],
  },
  {
    key: 'picaro', name: 'Pícaro', hitDie: 'd8', savingThrows: ['dex', 'int'],
    primaryAbility: 'Destreza', skillChoiceCount: 4,
    skillOptions: ['acrobatics', 'athletics', 'deception', 'insight', 'intimidation', 'investigation', 'perception', 'performance', 'persuasion', 'sleightOfHand', 'stealth'],
  },
  {
    key: 'artifice', name: 'Artífice', hitDie: 'd8', savingThrows: ['con', 'int'],
    primaryAbility: 'Inteligencia', skillChoiceCount: 2,
    skillOptions: ['arcana', 'history', 'investigation', 'medicine', 'nature', 'perception', 'sleightOfHand'],
  },
];

// effectPreset: cuando existe, "Aplicar como efecto activo" crea una entrada lista en
// Efectos activos con esos modificadores. Solo se incluyó donde el efecto es un bono
// plano y claro; para bonos basados en dados (ej. 1d4) se usa un promedio aproximado,
// aclarado en la descripción.
export const SPELLS = [
  { key: 'fuego_fatuo', name: 'Fuego Fatuo', level: 0, school: 'Evocación', castingTime: '1 acción', range: '36 m', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Ataque de conjuro a distancia que inflige daño de fuego (1d10, escala con el nivel de personaje).' },
  { key: 'rayo_escarcha', name: 'Rayo de Escarcha', level: 0, school: 'Evocación', castingTime: '1 acción', range: '18 m', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Ataque de conjuro a distancia con daño de frío (1d8) que además reduce la velocidad del objetivo 3 m hasta tu próximo turno.' },
  { key: 'llama_sagrada', name: 'Llama Sagrada', level: 0, school: 'Evocación', castingTime: '1 acción', range: '18 m', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'El objetivo hace una salvación de Destreza o sufre daño radiante (1d8); ignora la cobertura parcial.' },
  { key: 'descarga_eldritch', name: 'Descarga Eldritch', level: 0, school: 'Evocación', castingTime: '1 acción', range: '36 m', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Rayo de energía crepitante: ataque de conjuro a distancia con 1d10 de daño de fuerza (más rayos a niveles altos).' },
  { key: 'orientacion', name: 'Orientación', level: 0, school: 'Adivinación', castingTime: '1 acción', range: 'Toque', duration: 'Concentración, hasta 1 minuto', concentration: true, ritual: false, desc: 'El objetivo suma 1d4 a una prueba de característica de su elección antes de que termine el conjuro.' },
  { key: 'truco_mago', name: 'Truco de Mago', level: 0, school: 'Transmutación', castingTime: '1 acción', range: '9 m', duration: 'Hasta 1 hora', concentration: false, ritual: false, desc: 'Pequeños efectos mágicos cosméticos: crear un sonido, encender una vela, dejar una marca, etc.' },
  { key: 'mano_de_mago', name: 'Mano de Mago', level: 0, school: 'Conjuración', castingTime: '1 acción', range: '9 m', duration: '1 minuto', concentration: false, ritual: false, desc: 'Crea una mano espectral que puede manipular objetos, abrir puertas o sostener cosas a distancia.' },
  { key: 'ilusion_menor', name: 'Ilusión Menor', level: 0, school: 'Ilusión', castingTime: '1 acción', range: '9 m', duration: '1 minuto', concentration: false, ritual: false, desc: 'Creás un sonido o una imagen ilusoria inmóvil y silenciosa (o viceversa) del tamaño de un cubo de 1,5 m.' },
  { key: 'prestidigitacion', name: 'Prestidigitación', level: 0, school: 'Transmutación', castingTime: '1 acción', range: '3 m', duration: 'Hasta 1 hora', concentration: false, ritual: false, desc: 'Truco de utilidad general: efectos sensoriales menores, limpiar o ensuciar algo pequeño, encender una mecha, etc.' },
  { key: 'taumaturgia', name: 'Taumaturgia', level: 0, school: 'Transmutación', castingTime: '1 acción', range: '9 m', duration: 'Hasta 1 minuto', concentration: false, ritual: false, desc: 'Manifestaciones menores de poder divino: voz atronadora, abrir puertas, hacer temblar objetos livianos, etc.' },
  { key: 'burla_cruel', name: 'Burla Cruel', level: 0, school: 'Encantamiento', castingTime: '1 acción', range: '18 m', duration: '1 turno', concentration: false, ritual: false, desc: 'Insulto mágico: el objetivo hace salvación de Sabiduría o sufre 1d4 de daño psíquico y desventaja en su próximo ataque.' },

  { key: 'misil_magico', name: 'Misil Mágico', level: 1, school: 'Evocación', castingTime: '1 acción', range: '36 m', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Tres dardos de energía que impactan automáticamente, 1d4+1 de daño de fuerza cada uno.' },
  { key: 'escudo', name: 'Escudo', level: 1, school: 'Abjuración', castingTime: '1 reacción', range: 'Personal', duration: '1 ronda', concentration: false, ritual: false, desc: 'Reacción que otorga +5 a la CA hasta el inicio de tu próximo turno, y bloquea el Misil Mágico.', effectPreset: { kind: 'buff', rounds: 1, modifiers: [{ target: 'ac', amount: 5 }] } },
  { key: 'armadura_de_mago', name: 'Armadura de Mago', level: 1, school: 'Abjuración', castingTime: '1 acción', range: 'Toque', duration: '8 horas', concentration: false, ritual: false, desc: 'La CA base del objetivo (sin armadura) pasa a ser 13 + modificador de Destreza mientras dure.' },
  { key: 'curar_heridas', name: 'Curar Heridas', level: 1, school: 'Evocación', castingTime: '1 acción', range: 'Toque', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Cura 1d8 + modificador de característica de lanzamiento de puntos de golpe al tocar a la criatura.' },
  { key: 'palabra_sanadora', name: 'Palabra Sanadora', level: 1, school: 'Evocación', castingTime: '1 acción adicional', range: '18 m', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Cura 1d4 + modificador de característica a distancia, sin necesidad de tocar al objetivo.' },
  { key: 'bendicion', name: 'Bendición', level: 1, school: 'Encantamiento', castingTime: '1 acción', range: '9 m', duration: 'Concentración, hasta 1 minuto', concentration: true, ritual: false, desc: 'Hasta 3 criaturas suman 1d4 a tiradas de ataque y salvaciones mientras dure.', effectPreset: { kind: 'buff', rounds: 10, modifiers: [{ target: 'spellAttack', amount: 2 }, { target: 'save.str', amount: 2 }, { target: 'save.dex', amount: 2 }, { target: 'save.con', amount: 2 }, { target: 'save.int', amount: 2 }, { target: 'save.wis', amount: 2 }, { target: 'save.cha', amount: 2 }] } },
  { key: 'maldicion', name: 'Maldición (Bane)', level: 1, school: 'Encantamiento', castingTime: '1 acción', range: '9 m', duration: 'Concentración, hasta 1 minuto', concentration: true, ritual: false, desc: 'Hasta 3 objetivos restan 1d4 a tiradas de ataque y salvaciones mientras dure (salvación de Carisma para resistirlo).', effectPreset: { kind: 'debuff', rounds: 10, modifiers: [{ target: 'spellAttack', amount: -2 }, { target: 'save.str', amount: -2 }, { target: 'save.dex', amount: -2 }, { target: 'save.con', amount: -2 }, { target: 'save.int', amount: -2 }, { target: 'save.wis', amount: -2 }, { target: 'save.cha', amount: -2 }] } },
  { key: 'marca_del_cazador', name: 'Marca del Cazador', level: 1, school: 'Adivinación', castingTime: '1 acción adicional', range: '27 m', duration: 'Concentración, hasta 1 hora', concentration: true, ritual: false, desc: 'Marcás a una criatura: tus ataques contra ella suman 1d6 de daño extra, y tenés ventaja para rastrearla.' },
  { key: 'maldicion_brujo', name: 'Maldición (Hex)', level: 1, school: 'Encantamiento', castingTime: '1 acción adicional', range: '27 m', duration: 'Concentración, hasta 1 hora', concentration: true, ritual: false, desc: 'El objetivo sufre 1d6 de daño necrótico extra por tus ataques, y tiene desventaja en pruebas de una característica elegida.' },
  { key: 'paso_brumoso', name: 'Paso Brumoso', level: 2, school: 'Conjuración', castingTime: '1 acción adicional', range: 'Personal', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Te teletransportás hasta 9 m a un espacio desocupado que puedas ver.' },
  { key: 'invisibilidad', name: 'Invisibilidad', level: 2, school: 'Ilusión', castingTime: '1 acción', range: 'Toque', duration: 'Concentración, hasta 1 hora', concentration: true, ritual: false, desc: 'El objetivo se vuelve invisible hasta que ataque, lance un conjuro o termine el efecto.' },
  { key: 'telarana', name: 'Telaraña', level: 2, school: 'Conjuración', castingTime: '1 acción', range: '18 m', duration: 'Concentración, hasta 1 hora', concentration: true, ritual: false, desc: 'Cubre un área con telarañas que restringen el movimiento; salvación de Destreza o quedan apresados.' },
  { key: 'agrandar_reducir', name: 'Agrandar/Reducir', level: 2, school: 'Transmutación', castingTime: '1 acción', range: '9 m', duration: 'Concentración, hasta 1 minuto', concentration: true, ritual: false, desc: 'Duplica o reduce a la mitad el tamaño del objetivo, con ventaja o desventaja en pruebas/daño de Fuerza según el caso.' },
  { key: 'piel_corteza', name: 'Piel de Corteza (Barkskin)', level: 2, school: 'Transmutación', castingTime: '1 acción', range: 'Toque', duration: 'Concentración, hasta 1 hora', concentration: true, ritual: false, desc: 'La Clase de Armadura del objetivo no puede ser menor a 16 mientras dure el conjuro.' },
  { key: 'sugestion', name: 'Sugestión', level: 2, school: 'Encantamiento', castingTime: '1 acción', range: '9 m', duration: 'Concentración, hasta 8 horas', concentration: true, ritual: false, desc: 'Convencés mágicamente a una criatura de seguir un curso de acción razonable que le describís.' },
  { key: 'contraconjuro', name: 'Contraconjuro', level: 3, school: 'Abjuración', castingTime: '1 reacción', range: '18 m', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Interrumpís el conjuro de otra criatura mientras lo está lanzando.' },
  { key: 'bola_de_fuego', name: 'Bola de Fuego', level: 3, school: 'Evocación', castingTime: '1 acción', range: '45 m', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Explosión de fuego en una esfera de 6 m de radio: 8d6 de daño de fuego (mitad con salvación de Destreza).' },
  { key: 'relampago', name: 'Relámpago', level: 3, school: 'Evocación', castingTime: '1 acción', range: 'Personal (línea de 30 m)', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Una línea de electricidad de 30 por 1,5 m inflige 8d6 de daño de rayo (mitad con salvación de Destreza).' },
  { key: 'volar', name: 'Volar', level: 3, school: 'Transmutación', castingTime: '1 acción', range: 'Toque', duration: 'Concentración, hasta 10 minutos', concentration: true, ritual: false, desc: 'El objetivo gana velocidad de vuelo de 18 m mientras dure el conjuro.' },
  { key: 'contrahechizo_menor', name: 'Disipar Magia', level: 3, school: 'Abjuración', castingTime: '1 acción', range: '36 m', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Termina un conjuro activo sobre una criatura, objeto o efecto mágico.' },
  { key: 'toque_vampirico', name: 'Toque Vampírico', level: 3, school: 'Nigromancia', castingTime: '1 acción', range: 'Toque', duration: 'Concentración, hasta 1 minuto', concentration: true, ritual: false, desc: 'Ataque de conjuro cuerpo a cuerpo: 3d6 de daño necrótico, y recuperás la mitad como puntos de golpe.' },
  { key: 'presteza', name: 'Presteza (Haste)', level: 3, school: 'Transmutación', castingTime: '1 acción', range: '9 m', duration: 'Concentración, hasta 1 minuto', concentration: true, ritual: false, desc: 'El objetivo duplica su velocidad, gana +2 a la CA y una acción adicional; al terminar queda aturdido un turno.', effectPreset: { kind: 'buff', rounds: 10, modifiers: [{ target: 'ac', amount: 2 }] } },
  { key: 'invocar_relampagos', name: 'Invocar Relámpagos', level: 3, school: 'Conjuración', castingTime: '1 acción', range: '36 m', duration: 'Concentración, hasta 10 minutos', concentration: true, ritual: false, desc: 'Una nube de tormenta inflige 3d10 de daño de rayo por asalto (mitad con salvación de Destreza).' },
  { key: 'muro_de_fuego', name: 'Muro de Fuego', level: 4, school: 'Evocación', castingTime: '1 acción', range: '36 m', duration: 'Concentración, hasta 1 minuto', concentration: true, ritual: false, desc: 'Crea un muro de fuego que inflige 5d8 de daño de fuego a quien lo cruce o esté cerca.' },
  { key: 'polimorfar', name: 'Polimorfar', level: 4, school: 'Transmutación', castingTime: '1 acción', range: '18 m', duration: 'Concentración, hasta 1 hora', concentration: true, ritual: false, desc: 'Transformás a una criatura en una bestia de desafío igual o menor, reemplazando sus estadísticas.' },
  { key: 'invisibilidad_mejorada', name: 'Invisibilidad Mejorada', level: 4, school: 'Ilusión', castingTime: '1 acción', range: 'Toque', duration: 'Concentración, hasta 1 minuto', concentration: true, ritual: false, desc: 'El objetivo es invisible aunque ataque o lance conjuros, durante toda la duración.' },
  { key: 'muro_de_hielo', name: 'Muro de Hielo', level: 6, school: 'Evocación', castingTime: '1 acción', range: '36 m', duration: 'Concentración, hasta 10 minutos', concentration: true, ritual: false, desc: 'Crea un muro de hielo sólido que bloquea el paso y puede fragmentarse en trozos peligrosos.' },
  { key: 'curar_heridas_masivo', name: 'Curación en Masa', level: 5, school: 'Evocación', castingTime: '1 acción', range: '18 m', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Reparte hasta 700 (6d8+HP) puntos de curación entre varias criaturas cercanas dentro del área.' },
  { key: 'resurreccion_menor', name: 'Devolver la Vida', level: 5, school: 'Nigromancia', castingTime: '1 acción', range: 'Toque', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Devuelve a la vida a una criatura muerta hace menos de un minuto, con 1 punto de golpe.' },
  { key: 'muro_de_fuerza', name: 'Muro de Fuerza', level: 5, school: 'Evocación', castingTime: '1 acción', range: '36 m', duration: 'Concentración, hasta 10 minutos', concentration: true, ritual: false, desc: 'Crea un muro invisible y indestructible que bloquea el paso físico y mágico.' },
  { key: 'palabra_de_poder_aturdir', name: 'Palabra de Poder: Aturdir', level: 8, school: 'Encantamiento', castingTime: '1 acción', range: '18 m', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Si el objetivo tiene 150 PG o menos, queda aturdido sin necesidad de tirada de salvación.' },
  { key: 'meteoros', name: 'Enjambre de Meteoros', level: 9, school: 'Evocación', castingTime: '1 acción', range: '1,6 km', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Cuatro esferas de fuego caen del cielo, 20d6 de daño de fuego y 20d6 de daño contundente combinados por esfera (mitad con salvación de Destreza).' },
  { key: 'heroismo', name: 'Heroísmo', level: 1, school: 'Encantamiento', castingTime: '1 acción', range: 'Toque', duration: 'Concentración, hasta 1 minuto', concentration: true, ritual: false, desc: 'El objetivo gana puntos de golpe temporales al empezar y es inmune a estar asustado mientras dure.' },
  { key: 'ayuda', name: 'Ayuda (Aid)', level: 2, school: 'Abjuración', castingTime: '1 acción', range: '9 m', duration: '8 horas', concentration: false, ritual: false, desc: 'Hasta 3 criaturas ganan +5 a sus puntos de golpe máximos y actuales mientras dure.' },
];
