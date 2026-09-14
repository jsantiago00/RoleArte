// Compendio de referencia: razas, clases y conjuros conocidos, basados en el contenido
// abierto (SRD) de D&D 5ª edición. Los textos son resúmenes propios, no copias literales
// de los libros. Es un punto de partida editable: lo que falte se puede seguir cargando
// a mano en la ficha como texto libre (clase, subclase y conjuros no dejan de ser campos
// de texto normales).

export const RACES = [
  {
    key: 'humano', name: 'Humano',
    abilityBonuses: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
    speed: 30, size: 'Mediano',
    languages: 'Común y un idioma adicional a elección',
    traits: [
      { name: 'Adaptable', desc: 'Un idioma y competencias adicionales según la variante que uses en tu mesa.' },
    ],
  },
  {
    key: 'elfo_alto', name: 'Elfo (Alto)',
    abilityBonuses: { dex: 2, int: 1 },
    speed: 30, size: 'Mediano',
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
    speed: 35, size: 'Mediano',
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
    speed: 25, size: 'Mediano',
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
    speed: 25, size: 'Mediano',
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
    speed: 25, size: 'Pequeño',
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
    speed: 25, size: 'Pequeño',
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
    speed: 30, size: 'Mediano',
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
    speed: 25, size: 'Pequeño',
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
    speed: 25, size: 'Pequeño',
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
    speed: 30, size: 'Mediano',
    languages: 'Común, Élfico y un idioma adicional',
    traits: [
      { name: 'Aumento de característica adicional', desc: 'Elegí +1 a dos características distintas (además del +2 a Carisma); sumalo manualmente en Características.' },
      { name: 'Visión en la oscuridad', desc: 'Ves con poca luz hasta 18 m como si fuera luz brillante, y en oscuridad como luz tenue.' },
      { name: 'Sentidos feéricos', desc: 'Ventaja en salvaciones contra ser hechizado; la magia no puede dormirte.' },
      { name: 'Versatilidad en habilidades', desc: 'Competencia en dos habilidades a tu elección.' },
    ],
  },
  {
    key: 'semielfo_drow', name: 'Semielfo (Ascendencia Drow)',
    abilityBonuses: { cha: 2 },
    speed: 30, size: 'Mediano',
    languages: 'Común, Élfico y un idioma adicional',
    traits: [
      { name: 'Aumento de característica adicional', desc: 'Elegí +1 a dos características distintas (además del +2 a Carisma); sumalo manualmente en Características.' },
      { name: 'Visión en la oscuridad superior', desc: 'Ves con poca luz hasta 36 m como si fuera luz brillante, y en oscuridad como luz tenue.' },
      { name: 'Sentidos feéricos', desc: 'Ventaja en salvaciones contra ser hechizado; la magia no puede dormirte.' },
      { name: 'Magia drow', desc: 'Conocés el cantrip Luces Danzantes (Carisma). Al llegar a nivel 3 podés lanzar Fuego Feérico una vez por descanso largo, y a nivel 5, Oscuridad una vez por descanso largo.' },
      { name: 'Sensibilidad a la luz solar', desc: 'Desventaja en tiradas de ataque y en Percepción basada en la vista cuando vos o el objetivo están bajo luz solar directa.' },
    ],
  },
  {
    key: 'semiorco', name: 'Semiorco',
    abilityBonuses: { str: 2, con: 1 },
    speed: 30, size: 'Mediano',
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
    speed: 30, size: 'Mediano',
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

// Arquetipos base (subclases) por clase. "category" es el nombre que usa cada clase para
// este tipo de elección (Dominio, Camino, Patrón, etc.) y "minLevel" el nivel en que
// normalmente se elige. Al aplicar un arquetipo se agrega su rasgo principal a "Rasgos y
// dotes"; no incluye la progresión completa de niveles superiores.
export const SUBCLASSES = [
  { key: 'barbaro_berserker', classKey: 'barbaro', category: 'Camino Primigenio', minLevel: 3, name: 'Camino del Berserker', desc: 'Podés entrar en frenesí durante tu furia para atacar con más fuerza a costa de quedar agotado al terminarla.' },
  { key: 'barbaro_totemico', classKey: 'barbaro', category: 'Camino Primigenio', minLevel: 3, name: 'Camino del Totémico', desc: 'Elegís un espíritu totémico (Oso, Águila o Lobo) que te da un beneficio especial mientras estás en furia.' },

  { key: 'bardo_conocimiento', classKey: 'bardo', category: 'Colegio Bárdico', minLevel: 3, name: 'Colegio del Conocimiento (Lore)', desc: 'Ganás competencia en habilidades adicionales y podés gastar inspiración bárdica para debilitar la tirada de ataque, daño o habilidad de un enemigo.' },
  { key: 'bardo_valor', classKey: 'bardo', category: 'Colegio Bárdico', minLevel: 3, name: 'Colegio del Valor (Valor)', desc: 'Ganás competencia con armas marciales, armadura media y escudos, y podés dar tu inspiración bárdica para sumar daño al ataque de un aliado.' },

  { key: 'brujo_arconte_feerico', classKey: 'brujo', category: 'Patrón de Otro Mundo', minLevel: 1, name: 'El Arconte Feérico (Archfey)', desc: 'Tu patrón es un ser del Plano Feérico. Una vez por descanso corto o largo podés encantar o asustar a las criaturas cercanas que elijas.' },
  { key: 'brujo_innoble', classKey: 'brujo', category: 'Patrón de Otro Mundo', minLevel: 1, name: 'El Innoble (The Fiend)', desc: 'Tu patrón es un ser del Averno o los Abismos. Cuando reducís a un enemigo a 0 PG ganás puntos de golpe temporales.' },
  { key: 'brujo_viejo_terrible', classKey: 'brujo', category: 'Patrón de Otro Mundo', minLevel: 1, name: 'El Viejo Terrible (Great Old One)', desc: 'Tu patrón es una entidad incomprensible de otro plano. Podés comunicarte telepáticamente con criaturas cercanas.' },
  { key: 'brujo_pacto_cadena', classKey: 'brujo', category: 'Don de Pacto', minLevel: 3, name: 'Pacto de la Cadena', desc: 'Aprendés el conjuro Encontrar Familiar y podés elegir formas especiales de familiar (pseudodragón, quasit, etc.); podés ordenarle atacar como acción adicional.' },
  { key: 'brujo_pacto_filo', classKey: 'brujo', category: 'Don de Pacto', minLevel: 3, name: 'Pacto del Filo', desc: 'Como acción, podés crear un arma de pacto mágica en tu mano (cualquier arma cuerpo a cuerpo con la que tengas competencia). Si la soltás desaparece tras un turno, y podés volver a invocarla como acción adicional; cuenta como mágica al superar resistencias.' },
  { key: 'brujo_pacto_tomo', classKey: 'brujo', category: 'Don de Pacto', minLevel: 3, name: 'Pacto del Tomo', desc: 'Recibís el Grimorio, un tomo que te permite aprender tres trucos adicionales de cualquier lista de conjuros.' },

  { key: 'clerigo_conocimiento', classKey: 'clerigo', category: 'Dominio Divino', minLevel: 1, name: 'Dominio del Conocimiento', desc: 'Ganás competencia en habilidades de estudio (sumando el doble de tu bono de competencia en ellas) y una forma de otorgar competencias temporales a aliados.' },
  { key: 'clerigo_vida', classKey: 'clerigo', category: 'Dominio Divino', minLevel: 1, name: 'Dominio de la Vida', desc: 'Tus conjuros de curación restauran puntos de golpe adicionales, y ganás competencia con armadura pesada.' },
  { key: 'clerigo_luz', classKey: 'clerigo', category: 'Dominio Divino', minLevel: 1, name: 'Dominio de la Luz', desc: 'Ganás el truco Llama Sagrada y una explosión de luz cegadora que podés usar como acción adicional.' },
  { key: 'clerigo_naturaleza', classKey: 'clerigo', category: 'Dominio Divino', minLevel: 1, name: 'Dominio de la Naturaleza', desc: 'Ganás competencia con armadura pesada, un truco adicional de la lista de druida y competencia en una habilidad relacionada con la naturaleza.' },
  { key: 'clerigo_tempestad', classKey: 'clerigo', category: 'Dominio Divino', minLevel: 1, name: 'Dominio de la Tempestad', desc: 'Ganás competencia con armas marciales y armadura pesada, y podés sumar daño de rayo o trueno a tus ataques con arma.' },
  { key: 'clerigo_engano', classKey: 'clerigo', category: 'Dominio Divino', minLevel: 1, name: 'Dominio del Engaño', desc: 'Podés disfrazar tu apariencia (o la de un objeto) como acción adicional para engañar a tus enemigos.' },
  { key: 'clerigo_guerra', classKey: 'clerigo', category: 'Dominio Divino', minLevel: 1, name: 'Dominio de la Guerra', desc: 'Ganás competencia con armas marciales y armadura pesada, y podés sumar tu bono de competencia a una tirada de ataque propia o de un aliado cercano.' },

  { key: 'druida_tierra', classKey: 'druida', category: 'Círculo Druídico', minLevel: 2, name: 'Círculo de la Tierra', desc: 'Ganás conjuros adicionales según el terreno donde te iniciaste, y podés recuperar espacios de conjuro gastados con un descanso corto.' },
  { key: 'druida_luna', classKey: 'druida', category: 'Círculo Druídico', minLevel: 2, name: 'Círculo de la Luna', desc: 'Podés transformarte en bestias de mayor desafío al usar Forma Salvaje, y gastar espacios de conjuro para recuperar puntos de golpe mientras estás transformado.' },

  { key: 'explorador_cazador', classKey: 'explorador', category: 'Arquetipo de Explorador', minLevel: 3, name: 'Cazador', desc: 'Elegís técnicas de cazador enfocadas en enfrentar amenazas específicas (un enemigo poderoso, un grupo de enemigos débiles, etc.).' },
  { key: 'explorador_bestias', classKey: 'explorador', category: 'Arquetipo de Explorador', minLevel: 3, name: 'Señor de las Bestias (Beast Master)', desc: 'Ganás un compañero animal que lucha a tu lado y mejora junto con vos según subís de nivel.' },

  { key: 'guerrero_campeon', classKey: 'guerrero', category: 'Arquetipo Marcial', minLevel: 3, name: 'Campeón', desc: 'Tu rango de golpe crítico con armas se amplía a 19 o 20 en el dado de ataque.' },
  { key: 'guerrero_maestro_batalla', classKey: 'guerrero', category: 'Arquetipo Marcial', minLevel: 3, name: 'Maestro de Batalla (Battle Master)', desc: 'Ganás dados superiores y maniobras (ej. ataque certero, zancadilla) para potenciar tus ataques y maniobras marciales.' },
  { key: 'guerrero_caballero_mistico', classKey: 'guerrero', category: 'Arquetipo Marcial', minLevel: 3, name: 'Caballero Místico (Eldritch Knight)', desc: 'Aprendés a lanzar conjuros de mago (sobre todo de Abjuración y Evocación), y podés atar un arma a vos para invocarla a tu mano.' },

  { key: 'hechicero_dracónico', classKey: 'hechicero', category: 'Origen de Hechicería', minLevel: 1, name: 'Linaje Dracónico', desc: 'Elegís un tipo de dragón: ganás puntos de golpe máximos adicionales y resistencia al tipo de daño asociado a ese dragón.' },
  { key: 'hechicero_magia_salvaje', classKey: 'hechicero', category: 'Origen de Hechicería', minLevel: 1, name: 'Magia Salvaje', desc: 'Tu magia es impredecible: al lanzar un conjuro de nivel 1 o superior podés provocar un efecto de magia salvaje aleatorio.' },

  { key: 'mago_abjuracion', classKey: 'mago', category: 'Tradición Arcana', minLevel: 2, name: 'Escuela de Abjuración', desc: 'Copiás más rápido y barato los conjuros de abjuración, y podés crear un escudo arcano temporal que absorbe daño.' },
  { key: 'mago_adivinacion', classKey: 'mago', category: 'Tradición Arcana', minLevel: 2, name: 'Escuela de Adivinación', desc: 'Copiás más rápido los conjuros de adivinación, y ganás dados especiales (Portento) para reemplazar cualquier tirada de ataque, salvación o habilidad.' },
  { key: 'mago_conjuracion', classKey: 'mago', category: 'Tradición Arcana', minLevel: 2, name: 'Escuela de Conjuración', desc: 'Copiás más rápido los conjuros de conjuración, y podés invocar un espíritu menor que actúa como tus sentidos o entrega objetos a distancia.' },
  { key: 'mago_encantamiento', classKey: 'mago', category: 'Tradición Arcana', minLevel: 2, name: 'Escuela de Encantamiento', desc: 'Copiás más rápido los conjuros de encantamiento, y podés hechizar brevemente a una criatura con un toque.' },
  { key: 'mago_evocacion', classKey: 'mago', category: 'Tradición Arcana', minLevel: 2, name: 'Escuela de Evocación', desc: 'Copiás más rápido los conjuros de evocación, y podés esculpir tus conjuros de área para no dañar a tus aliados.' },
  { key: 'mago_ilusion', classKey: 'mago', category: 'Tradición Arcana', minLevel: 2, name: 'Escuela de Ilusión', desc: 'Copiás más rápido los conjuros de ilusión, y tus ilusiones menores pueden tener propiedades físicas leves (sonido, olor, temperatura).' },
  { key: 'mago_nigromancia', classKey: 'mago', category: 'Tradición Arcana', minLevel: 2, name: 'Escuela de Nigromancia', desc: 'Copiás más rápido los conjuros de nigromancia, y los muertos vivientes que creás con tus conjuros ganan puntos de golpe extra.' },
  { key: 'mago_transmutacion', classKey: 'mago', category: 'Tradición Arcana', minLevel: 2, name: 'Escuela de Transmutación', desc: 'Copiás más rápido los conjuros de transmutación, y creás una Piedra de Transmutación que te da un beneficio menor permanente mientras la lleves.' },

  { key: 'monje_mano_abierta', classKey: 'monje', category: 'Tradición Monástica', minLevel: 3, name: 'Camino de la Mano Abierta', desc: 'Tus técnicas de golpe aturdidor pueden derribar, empujar o impedir la reacción del objetivo.' },
  { key: 'monje_sombra', classKey: 'monje', category: 'Tradición Monástica', minLevel: 3, name: 'Camino de la Sombra', desc: 'Ganás técnicas menores de ilusión y oscuridad, incluida la posibilidad de teletransportarte entre sombras.' },
  { key: 'monje_cuatro_elementos', classKey: 'monje', category: 'Tradición Monástica', minLevel: 3, name: 'Camino de los Cuatro Elementos', desc: 'Aprendés disciplinas elementales que activás gastando puntos de ki, como golpes de fuego o ráfagas de viento.' },

  { key: 'paladin_devocion', classKey: 'paladin', category: 'Juramento Sagrado', minLevel: 3, name: 'Juramento de Devoción', desc: 'Tus votos son de honestidad, honor y compasión; ganás una opción de Canalizar Divinidad para marcar a un enemigo con luz sagrada.' },
  { key: 'paladin_ancianos', classKey: 'paladin', category: 'Juramento Sagrado', minLevel: 3, name: 'Juramento de los Ancianos', desc: 'Tus votos protegen la luz, la belleza y la vida frente a la oscuridad; ganás una opción de Canalizar Divinidad para crear un estallido cegador.' },
  { key: 'paladin_venganza', classKey: 'paladin', category: 'Juramento Sagrado', minLevel: 3, name: 'Juramento de Venganza', desc: 'Tus votos son de castigo hacia quienes cometen grandes males; ganás una opción de Canalizar Divinidad para tener ventaja en ataques contra un objetivo elegido.' },

  { key: 'picaro_ladron', classKey: 'picaro', category: 'Arquetipo de Pícaro', minLevel: 3, name: 'Ladrón (Thief)', desc: 'Podés usar objetos o herramientas con una acción adicional extra, y trepar sin penalización de velocidad.' },
  { key: 'picaro_asesino', classKey: 'picaro', category: 'Arquetipo de Pícaro', minLevel: 3, name: 'Asesino (Assassin)', desc: 'Tenés ventaja automática en ataques contra criaturas sorprendidas, y esos golpes se consideran crítico si impactan.' },
  { key: 'picaro_embaucador', classKey: 'picaro', category: 'Arquetipo de Pícaro', minLevel: 3, name: 'Embaucador Arcano (Arcane Trickster)', desc: 'Aprendés a lanzar conjuros de mago (sobre todo de ilusión y encantamiento), incluyendo Mano de Mago espectral.' },

  { key: 'artifice_alquimista', classKey: 'artifice', category: 'Especialización de Artífice', minLevel: 3, name: 'Alquimista', desc: 'Preparás conjuros alquímicos adicionales y podés crear un experimento que replica los efectos de una poción de curación u otro brebaje.' },
  { key: 'artifice_artillero', classKey: 'artifice', category: 'Especialización de Artífice', minLevel: 3, name: 'Artillero', desc: 'Creás un cañón mágico portátil (Eldritch Cannon) que dispara rayos de fuego, ácido o fuerza, o protege a tus aliados.' },
  { key: 'artifice_encantador_batalla', classKey: 'artifice', category: 'Especialización de Artífice', minLevel: 3, name: 'Encantador de Batalla (Battle Smith)', desc: 'Construís un Defensor de Acero, un autómata compañero que lucha a tu lado, y podés encantar un arma para golpear a distancia con ella.' },
  { key: 'artifice_armero', classKey: 'artifice', category: 'Especialización de Artífice', minLevel: 3, name: 'Armero (Armorer)', desc: 'Construís una armadura potenciada que vestís vos mismo, con un modelo Guardián (más resistente) o Infiltrador (más ágil).' },
];

// effectPreset: cuando existe, "Aplicar como efecto activo" crea una entrada lista en
// Efectos activos con esos modificadores. Solo se incluyó donde el efecto es un bono
// plano y claro; para bonos basados en dados (ej. 1d4) se usa un promedio aproximado,
// aclarado en la descripción.
// Los nombres incluyen el original en inglés entre paréntesis para que se puedan buscar
// en cualquiera de los dos idiomas (la traducción de la mesa a veces varía).
export const SPELLS = [
  { key: 'fuego_fatuo', name: 'Fuego Fatuo (Fire Bolt)', level: 0, school: 'Evocación', castingTime: '1 acción', range: '36 m', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Ataque de conjuro a distancia que inflige daño de fuego (1d10, escala con el nivel de personaje).' },
  { key: 'rayo_escarcha', name: 'Rayo de Escarcha (Ray of Frost)', level: 0, school: 'Evocación', castingTime: '1 acción', range: '18 m', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Ataque de conjuro a distancia con daño de frío (1d8) que además reduce la velocidad del objetivo 3 m hasta tu próximo turno.' },
  { key: 'llama_sagrada', name: 'Llama Sagrada (Sacred Flame)', level: 0, school: 'Evocación', castingTime: '1 acción', range: '18 m', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'El objetivo hace una salvación de Destreza o sufre daño radiante (1d8); ignora la cobertura parcial.' },
  { key: 'descarga_eldritch', name: 'Descarga Eldritch (Eldritch Blast)', level: 0, school: 'Evocación', castingTime: '1 acción', range: '36 m', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Rayo de energía crepitante: ataque de conjuro a distancia con 1d10 de daño de fuerza (más rayos a niveles altos).' },
  { key: 'hoja_atronadora', name: 'Hoja Atronadora (Booming Blade)', level: 0, school: 'Evocación', castingTime: '1 acción', range: 'Personal (arma cuerpo a cuerpo)', duration: '1 turno', concentration: false, ritual: false, desc: 'Golpeás con un arma cuerpo a cuerpo envuelta en energía tronante; si el objetivo se mueve antes de tu próximo turno, sufre daño de trueno extra.' },
  { key: 'orientacion', name: 'Orientación (Guidance)', level: 0, school: 'Adivinación', castingTime: '1 acción', range: 'Toque', duration: 'Concentración, hasta 1 minuto', concentration: true, ritual: false, desc: 'El objetivo suma 1d4 a una prueba de característica de su elección antes de que termine el conjuro.' },
  { key: 'mano_de_mago', name: 'Mano de Mago (Mage Hand)', level: 0, school: 'Conjuración', castingTime: '1 acción', range: '9 m', duration: '1 minuto', concentration: false, ritual: false, desc: 'Crea una mano espectral que puede manipular objetos, abrir puertas o sostener cosas a distancia.' },
  { key: 'ilusion_menor', name: 'Ilusión Menor (Minor Illusion)', level: 0, school: 'Ilusión', castingTime: '1 acción', range: '9 m', duration: '1 minuto', concentration: false, ritual: false, desc: 'Creás un sonido o una imagen ilusoria inmóvil y silenciosa (o viceversa) del tamaño de un cubo de 1,5 m.' },
  { key: 'prestidigitacion', name: 'Prestidigitación (Prestidigitation)', level: 0, school: 'Transmutación', castingTime: '1 acción', range: '3 m', duration: 'Hasta 1 hora', concentration: false, ritual: false, desc: 'Truco de utilidad general: efectos sensoriales menores, limpiar o ensuciar algo pequeño, encender una mecha, etc.' },
  { key: 'taumaturgia', name: 'Taumaturgia (Thaumaturgy)', level: 0, school: 'Transmutación', castingTime: '1 acción', range: '9 m', duration: 'Hasta 1 minuto', concentration: false, ritual: false, desc: 'Manifestaciones menores de poder divino: voz atronadora, abrir puertas, hacer temblar objetos livianos, etc.' },
  { key: 'burla_cruel', name: 'Burla Cruel (Vicious Mockery)', level: 0, school: 'Encantamiento', castingTime: '1 acción', range: '18 m', duration: '1 turno', concentration: false, ritual: false, desc: 'Insulto mágico: el objetivo hace salvación de Sabiduría o sufre 1d4 de daño psíquico y desventaja en su próximo ataque.' },

  { key: 'misil_magico', name: 'Misil Mágico (Magic Missile)', level: 1, school: 'Evocación', castingTime: '1 acción', range: '36 m', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Tres dardos de energía que impactan automáticamente, 1d4+1 de daño de fuerza cada uno.' },
  { key: 'escudo', name: 'Escudo (Shield)', level: 1, school: 'Abjuración', castingTime: '1 reacción', range: 'Personal', duration: '1 ronda', concentration: false, ritual: false, desc: 'Reacción que otorga +5 a la CA hasta el inicio de tu próximo turno, y bloquea el Misil Mágico.', effectPreset: { kind: 'buff', rounds: 1, modifiers: [{ target: 'ac', amount: 5 }] } },
  { key: 'armadura_de_mago', name: 'Armadura de Mago (Mage Armor)', level: 1, school: 'Abjuración', castingTime: '1 acción', range: 'Toque', duration: '8 horas', concentration: false, ritual: false, desc: 'La CA base del objetivo (sin armadura) pasa a ser 13 + modificador de Destreza mientras dure.' },
  { key: 'armadura_de_agathys', name: 'Armadura de Agathys (Armor of Agathys)', level: 1, school: 'Abjuración', castingTime: '1 acción', range: 'Personal', duration: '1 hora', concentration: false, ritual: false, desc: 'Ganás 5 puntos de golpe temporales; mientras te duren, quien te golpee cuerpo a cuerpo sufre 5 de daño de frío (más a niveles altos). Los PG temporales se cargan manualmente en Combate.' },
  { key: 'curar_heridas', name: 'Curar Heridas (Cure Wounds)', level: 1, school: 'Evocación', castingTime: '1 acción', range: 'Toque', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Cura 1d8 + modificador de característica de lanzamiento de puntos de golpe al tocar a la criatura.' },
  { key: 'palabra_sanadora', name: 'Palabra Sanadora (Healing Word)', level: 1, school: 'Evocación', castingTime: '1 acción adicional', range: '18 m', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Cura 1d4 + modificador de característica a distancia, sin necesidad de tocar al objetivo.' },
  { key: 'bendicion', name: 'Bendición (Bless)', level: 1, school: 'Encantamiento', castingTime: '1 acción', range: '9 m', duration: 'Concentración, hasta 1 minuto', concentration: true, ritual: false, desc: 'Hasta 3 criaturas suman 1d4 a tiradas de ataque y salvaciones mientras dure.', effectPreset: { kind: 'buff', rounds: 10, modifiers: [{ target: 'spellAttack', amount: 2 }, { target: 'save.str', amount: 2 }, { target: 'save.dex', amount: 2 }, { target: 'save.con', amount: 2 }, { target: 'save.int', amount: 2 }, { target: 'save.wis', amount: 2 }, { target: 'save.cha', amount: 2 }] } },
  { key: 'maldicion', name: 'Maldición (Bane)', level: 1, school: 'Encantamiento', castingTime: '1 acción', range: '9 m', duration: 'Concentración, hasta 1 minuto', concentration: true, ritual: false, desc: 'Hasta 3 objetivos restan 1d4 a tiradas de ataque y salvaciones mientras dure (salvación de Carisma para resistirlo).', effectPreset: { kind: 'debuff', rounds: 10, modifiers: [{ target: 'spellAttack', amount: -2 }, { target: 'save.str', amount: -2 }, { target: 'save.dex', amount: -2 }, { target: 'save.con', amount: -2 }, { target: 'save.int', amount: -2 }, { target: 'save.wis', amount: -2 }, { target: 'save.cha', amount: -2 }] } },
  { key: 'marca_del_cazador', name: 'Marca del Cazador (Hunter\'s Mark)', level: 1, school: 'Adivinación', castingTime: '1 acción adicional', range: '27 m', duration: 'Concentración, hasta 1 hora', concentration: true, ritual: false, desc: 'Marcás a una criatura: tus ataques contra ella suman 1d6 de daño extra, y tenés ventaja para rastrearla.' },
  { key: 'maldicion_brujo', name: 'Maldición del Brujo (Hex)', level: 1, school: 'Encantamiento', castingTime: '1 acción adicional', range: '27 m', duration: 'Concentración, hasta 1 hora', concentration: true, ritual: false, desc: 'El objetivo sufre 1d6 de daño necrótico extra por tus ataques, y tiene desventaja en pruebas de una característica elegida.' },
  { key: 'golpe_iracundo', name: 'Golpe Iracundo (Wrathful Smite)', level: 1, school: 'Evocación', castingTime: '1 acción adicional', range: 'Personal (arma cuerpo a cuerpo)', duration: 'Concentración, hasta 1 minuto', concentration: true, ritual: false, desc: 'Tu próximo golpe cuerpo a cuerpo suma 1d6 de daño psíquico y el objetivo debe salvar (Sabiduría) o queda asustado de vos mientras dure.' },
  { key: 'heroismo', name: 'Heroísmo (Heroism)', level: 1, school: 'Encantamiento', castingTime: '1 acción', range: 'Toque', duration: 'Concentración, hasta 1 minuto', concentration: true, ritual: false, desc: 'El objetivo gana puntos de golpe temporales al empezar y es inmune a estar asustado mientras dure.' },
  { key: 'paso_brumoso', name: 'Paso Brumoso (Misty Step)', level: 2, school: 'Conjuración', castingTime: '1 acción adicional', range: 'Personal', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Te teletransportás hasta 9 m a un espacio desocupado que puedas ver.' },
  { key: 'invisibilidad', name: 'Invisibilidad (Invisibility)', level: 2, school: 'Ilusión', castingTime: '1 acción', range: 'Toque', duration: 'Concentración, hasta 1 hora', concentration: true, ritual: false, desc: 'El objetivo se vuelve invisible hasta que ataque, lance un conjuro o termine el efecto.' },
  { key: 'telarana', name: 'Telaraña (Web)', level: 2, school: 'Conjuración', castingTime: '1 acción', range: '18 m', duration: 'Concentración, hasta 1 hora', concentration: true, ritual: false, desc: 'Cubre un área con telarañas que restringen el movimiento; salvación de Destreza o quedan apresados.' },
  { key: 'agrandar_reducir', name: 'Agrandar/Reducir (Enlarge/Reduce)', level: 2, school: 'Transmutación', castingTime: '1 acción', range: '9 m', duration: 'Concentración, hasta 1 minuto', concentration: true, ritual: false, desc: 'Duplica o reduce a la mitad el tamaño del objetivo, con ventaja o desventaja en pruebas/daño de Fuerza según el caso.' },
  { key: 'vision_borrosa', name: 'Visión Borrosa (Blur)', level: 2, school: 'Ilusión', castingTime: '1 acción', range: 'Personal', duration: 'Concentración, hasta 1 minuto', concentration: true, ritual: false, desc: 'Tu forma se vuelve borrosa: quien te ataque cuerpo a cuerpo o a distancia tiene desventaja, salvo que no dependa de la vista.' },
  { key: 'marca_radiante', name: 'Marca Radiante (Branding Smite)', level: 2, school: 'Evocación', castingTime: '1 acción adicional', range: 'Personal (arma cuerpo a cuerpo)', duration: 'Concentración, hasta 1 minuto', concentration: true, ritual: false, desc: 'Tu próximo golpe cuerpo a cuerpo suma 2d6 de daño radiante, hace visible al objetivo (aunque esté invisible) y lo marca con luz tenue mientras dure.' },
  { key: 'piel_corteza', name: 'Piel de Corteza (Barkskin)', level: 2, school: 'Transmutación', castingTime: '1 acción', range: 'Toque', duration: 'Concentración, hasta 1 hora', concentration: true, ritual: false, desc: 'La Clase de Armadura del objetivo no puede ser menor a 16 mientras dure el conjuro.' },
  { key: 'sugestion', name: 'Sugestión (Suggestion)', level: 2, school: 'Encantamiento', castingTime: '1 acción', range: '9 m', duration: 'Concentración, hasta 8 horas', concentration: true, ritual: false, desc: 'Convencés mágicamente a una criatura de seguir un curso de acción razonable que le describís.' },
  { key: 'ayuda', name: 'Ayuda (Aid)', level: 2, school: 'Abjuración', castingTime: '1 acción', range: '9 m', duration: '8 horas', concentration: false, ritual: false, desc: 'Hasta 3 criaturas ganan +5 a sus puntos de golpe máximos y actuales mientras dure.' },
  { key: 'contraconjuro', name: 'Contraconjuro (Counterspell)', level: 3, school: 'Abjuración', castingTime: '1 reacción', range: '18 m', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Interrumpís el conjuro de otra criatura mientras lo está lanzando.' },
  { key: 'bola_de_fuego', name: 'Bola de Fuego (Fireball)', level: 3, school: 'Evocación', castingTime: '1 acción', range: '45 m', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Explosión de fuego en una esfera de 6 m de radio: 8d6 de daño de fuego (mitad con salvación de Destreza).' },
  { key: 'relampago', name: 'Relámpago (Lightning Bolt)', level: 3, school: 'Evocación', castingTime: '1 acción', range: 'Personal (línea de 30 m)', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Una línea de electricidad de 30 por 1,5 m inflige 8d6 de daño de rayo (mitad con salvación de Destreza).' },
  { key: 'volar', name: 'Volar (Fly)', level: 3, school: 'Transmutación', castingTime: '1 acción', range: 'Toque', duration: 'Concentración, hasta 10 minutos', concentration: true, ritual: false, desc: 'El objetivo gana velocidad de vuelo de 18 m mientras dure el conjuro.' },
  { key: 'disipar_magia', name: 'Disipar Magia (Dispel Magic)', level: 3, school: 'Abjuración', castingTime: '1 acción', range: '36 m', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Termina un conjuro activo sobre una criatura, objeto o efecto mágico.' },
  { key: 'toque_vampirico', name: 'Toque Vampírico (Vampiric Touch)', level: 3, school: 'Nigromancia', castingTime: '1 acción', range: 'Toque', duration: 'Concentración, hasta 1 minuto', concentration: true, ritual: false, desc: 'Ataque de conjuro cuerpo a cuerpo: 3d6 de daño necrótico, y recuperás la mitad como puntos de golpe.' },
  { key: 'presteza', name: 'Presteza (Haste)', level: 3, school: 'Transmutación', castingTime: '1 acción', range: '9 m', duration: 'Concentración, hasta 1 minuto', concentration: true, ritual: false, desc: 'El objetivo duplica su velocidad, gana +2 a la CA y una acción adicional; al terminar queda aturdido un turno.', effectPreset: { kind: 'buff', rounds: 10, modifiers: [{ target: 'ac', amount: 2 }] } },
  { key: 'invocar_relampagos', name: 'Invocar Relámpagos (Call Lightning)', level: 3, school: 'Conjuración', castingTime: '1 acción', range: '36 m', duration: 'Concentración, hasta 10 minutos', concentration: true, ritual: false, desc: 'Una nube de tormenta inflige 3d10 de daño de rayo por asalto (mitad con salvación de Destreza).' },
  { key: 'muro_de_fuego', name: 'Muro de Fuego (Wall of Fire)', level: 4, school: 'Evocación', castingTime: '1 acción', range: '36 m', duration: 'Concentración, hasta 1 minuto', concentration: true, ritual: false, desc: 'Crea un muro de fuego que inflige 5d8 de daño de fuego a quien lo cruce o esté cerca.' },
  { key: 'polimorfar', name: 'Polimorfar (Polymorph)', level: 4, school: 'Transmutación', castingTime: '1 acción', range: '18 m', duration: 'Concentración, hasta 1 hora', concentration: true, ritual: false, desc: 'Transformás a una criatura en una bestia de desafío igual o menor, reemplazando sus estadísticas.' },
  { key: 'invisibilidad_mejorada', name: 'Invisibilidad Mejorada (Greater Invisibility)', level: 4, school: 'Ilusión', castingTime: '1 acción', range: 'Toque', duration: 'Concentración, hasta 1 minuto', concentration: true, ritual: false, desc: 'El objetivo es invisible aunque ataque o lance conjuros, durante toda la duración.' },
  { key: 'curar_heridas_masivo', name: 'Curación en Masa (Mass Cure Wounds)', level: 5, school: 'Evocación', castingTime: '1 acción', range: '18 m', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Reparte hasta 700 (6d8+HP) puntos de curación entre varias criaturas cercanas dentro del área.' },
  { key: 'resurreccion_menor', name: 'Devolver la Vida (Revivify)', level: 5, school: 'Nigromancia', castingTime: '1 acción', range: 'Toque', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Devuelve a la vida a una criatura muerta hace menos de un minuto, con 1 punto de golpe.' },
  { key: 'muro_de_fuerza', name: 'Muro de Fuerza (Wall of Force)', level: 5, school: 'Evocación', castingTime: '1 acción', range: '36 m', duration: 'Concentración, hasta 10 minutos', concentration: true, ritual: false, desc: 'Crea un muro invisible y indestructible que bloquea el paso físico y mágico.' },
  { key: 'muro_de_hielo', name: 'Muro de Hielo (Wall of Ice)', level: 6, school: 'Evocación', castingTime: '1 acción', range: '36 m', duration: 'Concentración, hasta 10 minutos', concentration: true, ritual: false, desc: 'Crea un muro de hielo sólido que bloquea el paso y puede fragmentarse en trozos peligrosos.' },
  { key: 'palabra_de_poder_aturdir', name: 'Palabra de Poder: Aturdir (Power Word Stun)', level: 8, school: 'Encantamiento', castingTime: '1 acción', range: '18 m', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Si el objetivo tiene 150 PG o menos, queda aturdido sin necesidad de tirada de salvación.' },
  { key: 'meteoros', name: 'Enjambre de Meteoros (Meteor Swarm)', level: 9, school: 'Evocación', castingTime: '1 acción', range: '1,6 km', duration: 'Instantáneo', concentration: false, ritual: false, desc: 'Cuatro esferas de fuego caen del cielo, 20d6 de daño de fuego y 20d6 de daño contundente combinados por esfera (mitad con salvación de Destreza).' },
];
