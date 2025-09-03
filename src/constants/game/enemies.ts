// src/constants/game/enemies.ts

/**
 * Enemy Types - Different categories of enemies
 */
export enum EnemyType {
  BEAST = "beast", // Animals and creatures
  UNDEAD = "undead", // Zombies, skeletons, ghosts
  HUMANOID = "humanoid", // Bandits, guards, NPCs
  ELEMENTAL = "elemental", // Fire, water, earth, air
  DEMON = "demon", // Demonic creatures
  CONSTRUCT = "construct", // Golems, automatons
  DRAGON = "dragon", // Dragons and dragonkin
  ABERRATION = "aberration", // Weird, otherworldly creatures
  PLANT = "plant", // Carnivorous plants, treants
  SPIRIT = "spirit", // Ethereal beings
}

/**
 * Enemy Rarity/Difficulty Tiers
 */
export enum EnemyRarity {
  COMMON = "common", // Basic enemies
  UNCOMMON = "uncommon", // Slightly stronger
  RARE = "rare", // Notable challenge
  ELITE = "elite", // Mini-bosses
  BOSS = "boss", // Major bosses
  LEGENDARY = "legendary", // Raid-level encounters
}

/**
 * Combat Behaviors - How enemies act in battle
 */
export enum CombatBehavior {
  AGGRESSIVE = "aggressive", // Always attacks
  DEFENSIVE = "defensive", // Focuses on defense/healing
  BALANCED = "balanced", // Mix of offense and defense
  BERSERKER = "berserker", // High damage, low defense
  SUPPORT = "support", // Buffs allies, debuffs enemies
  TACTICAL = "tactical", // Uses abilities strategically
  COWARD = "coward", // Flees when health is low
  GUARDIAN = "guardian", // Protects other enemies
}

/**
 * Status Effects and Resistances
 */
export interface StatusResistance {
  poison?: number; // 0-1, where 1 = immune
  fire?: number;
  ice?: number;
  lightning?: number;
  dark?: number;
  light?: number;
  physical?: number;
  magic?: number;
  stun?: number;
  sleep?: number;
  charm?: number;
  fear?: number;
}

/**
 * Enemy Abilities - Special attacks and powers
 */
export interface EnemyAbility {
  id: string;
  name: string;
  description: string;
  type: "attack" | "buff" | "debuff" | "heal" | "summon" | "special";

  // Damage and Effects
  damage?: {
    base: number;
    scaling?: number; // Damage per enemy level
    type: "physical" | "magic" | "true";
    element?: "fire" | "ice" | "lightning" | "dark" | "light";
  };

  // Healing
  healing?: {
    base: number;
    scaling?: number;
    targetType: "self" | "ally" | "all_allies";
  };

  // Status Effects
  statusEffects?: {
    effect: string; // Effect name
    duration: number; // Turns
    strength: number; // Effect magnitude
    chance: number; // 0-1 probability
  }[];

  // Usage Constraints
  cooldown: number; // Turns before reuse
  uses?: number; // Limited uses per combat
  triggerCondition?: {
    healthBelow?: number; // Use when health < X%
    enemiesAlive?: number; // Use when X+ enemies alive
    playerCount?: number; // Use when X+ players present
    turnNumber?: number; // Use on specific turn
  };

  // Targeting
  targetType: "single" | "multiple" | "all" | "self" | "random";
  maxTargets?: number;
  range?: number;

  // Animation and Effects
  animationDuration?: number;
  soundEffect?: string;
  visualEffect?: string;
}

/**
 * Loot Drop Information
 */
export interface LootDrop {
  itemId: string;
  dropChance: number; // 0-1 probability
  minQuantity: number;
  maxQuantity: number;
  requiresQuest?: string[]; // Only drops if player has these quests
  rareDropBonus?: number; // Bonus chance for rare drops
}

/**
 * Enemy Scaling - How enemies adapt to player level/party size
 */
export interface EnemyScaling {
  healthPerLevel: number;
  damagePerLevel: number;
  defensePerLevel: number;
  experiencePerLevel: number;

  // Party scaling
  healthPerPlayer: number; // Additional HP per party member
  damagePerPlayer: number; // Additional damage per party member

  // Level caps
  minLevel: number;
  maxLevel: number;
}

/**
 * AI Patterns - Complex behavior scripts
 */
export interface AIPattern {
  name: string;
  priority: number; // Higher = more likely to execute
  conditions: {
    healthAbove?: number; // Execute when health > X%
    healthBelow?: number; // Execute when health < X%
    enemiesAlive?: number; // Execute when X enemies alive
    playerCount?: number; // Execute based on player count
    hasStatusEffect?: string;
    turnsSinceLastUse?: number;
  };
  actions: {
    abilityId: string;
    weight: number; // Relative probability
  }[];
}

/**
 * Core Enemy Interface
 */
export interface Enemy {
  // Basic Information
  id: string;
  name: string;
  displayName?: string; // Alternative name for special variants
  description: string;
  flavorText?: string;

  // Classification
  type: EnemyType;
  rarity: EnemyRarity;
  tags: string[]; // Additional categorization

  // Visual
  sprite?: string;
  animationSet?: string;
  size: "tiny" | "small" | "medium" | "large" | "huge" | "gargantuan";

  // Base Stats
  level: number;
  health: number;
  mana?: number;
  attack: number;
  defense: number;
  magicAttack?: number;
  magicDefense?: number;
  speed: number; // Initiative/turn order
  accuracy: number; // Hit chance modifier
  evasion: number; // Dodge chance
  criticalChance: number; // Critical hit probability
  criticalMultiplier: number; // Critical hit damage multiplier

  // Resistances and Immunities
  resistances: StatusResistance;
  immunities?: string[]; // Complete immunity to certain effects
  weaknesses?: string[]; // Takes extra damage from these

  // Combat Behavior
  behavior: CombatBehavior;
  abilities: EnemyAbility[];
  aiPatterns: AIPattern[];

  // Scaling
  scaling: EnemyScaling;

  // Rewards
  experienceReward: number;
  goldReward: { min: number; max: number };
  lootTable: LootDrop[];

  // Special Properties
  isFlying?: boolean;
  isUndead?: boolean;
  hasRegeneration?: boolean;
  regenerationRate?: number;
  canSummon?: boolean;
  summonLimit?: number;

  // Encounter Data
  spawnLocations: string[]; // Location IDs where this enemy can spawn
  spawnWeight: number; // Relative spawn probability
  packSize: { min: number; max: number }; // How many spawn together

  // Lore and World Building
  habitat?: string;
  dietaryHabits?: string;
  socialStructure?: string;
  threat_level?: string;
  knownWeaknesses?: string[];

  // Metadata
  isActive: boolean;
  version: string;
  lastModified: Date;
}

/**
 * Game Enemies Database
 */
export const GAME_ENEMIES: { [key: string]: Enemy } = {
  // ===== COMMON FOREST CREATURES =====

  shadow_wolf: {
    id: "shadow_wolf",
    name: "Shadow Wolf",
    description:
      "A wolf corrupted by dark magic, with glowing red eyes and wisps of shadow trailing from its form.",
    flavorText:
      "Once a noble creature of the forest, now twisted by the creeping darkness that plagues these lands.",

    type: EnemyType.BEAST,
    rarity: EnemyRarity.COMMON,
    tags: ["corrupted", "pack_hunter", "forest"],

    sprite: "/assets/enemies/shadow_wolf.png",
    animationSet: "quadruped_medium",
    size: "medium",

    level: 4,
    health: 60,
    mana: 20,
    attack: 18,
    defense: 8,
    magicDefense: 5,
    speed: 85,
    accuracy: 75,
    evasion: 20,
    criticalChance: 0.15,
    criticalMultiplier: 1.5,

    resistances: {
      dark: 0.5,
      light: -0.3, // Takes 30% more light damage
      physical: 0.1,
    },
    weaknesses: ["light", "silver"],

    behavior: CombatBehavior.AGGRESSIVE,
    abilities: [
      {
        id: "bite_attack",
        name: "Savage Bite",
        description: "A vicious bite attack that can cause bleeding.",
        type: "attack",
        damage: {
          base: 22,
          scaling: 2,
          type: "physical",
        },
        statusEffects: [
          {
            effect: "bleeding",
            duration: 3,
            strength: 5,
            chance: 0.3,
          },
        ],
        cooldown: 0,
        targetType: "single",
        animationDuration: 0.8,
        soundEffect: "wolf_bite.ogg",
        visualEffect: "blood_splash",
      },
      {
        id: "shadow_pounce",
        name: "Shadow Pounce",
        description: "Leaps through shadows to attack with increased damage.",
        type: "attack",
        damage: {
          base: 30,
          scaling: 3,
          type: "physical",
          element: "dark",
        },
        cooldown: 3,
        targetType: "single",
        triggerCondition: {
          healthBelow: 0.7,
        },
        animationDuration: 1.2,
        soundEffect: "shadow_whoosh.ogg",
        visualEffect: "shadow_trail",
      },
      {
        id: "howl_of_dread",
        name: "Howl of Dread",
        description: "A terrifying howl that can frighten enemies.",
        type: "debuff",
        statusEffects: [
          {
            effect: "fear",
            duration: 2,
            strength: 1,
            chance: 0.6,
          },
        ],
        cooldown: 5,
        uses: 1,
        targetType: "all",
        triggerCondition: {
          healthBelow: 0.4,
        },
        animationDuration: 2.0,
        soundEffect: "wolf_howl.ogg",
        visualEffect: "fear_aura",
      },
    ],

    aiPatterns: [
      {
        name: "Pack Tactics",
        priority: 8,
        conditions: {
          enemiesAlive: 2,
        },
        actions: [
          { abilityId: "shadow_pounce", weight: 7 },
          { abilityId: "bite_attack", weight: 3 },
        ],
      },
      {
        name: "Desperate Assault",
        priority: 9,
        conditions: {
          healthBelow: 0.3,
        },
        actions: [
          { abilityId: "howl_of_dread", weight: 6 },
          { abilityId: "shadow_pounce", weight: 4 },
        ],
      },
      {
        name: "Standard Combat",
        priority: 5,
        conditions: {},
        actions: [
          { abilityId: "bite_attack", weight: 7 },
          { abilityId: "shadow_pounce", weight: 3 },
        ],
      },
    ],

    scaling: {
      healthPerLevel: 8,
      damagePerLevel: 2,
      defensePerLevel: 1,
      experiencePerLevel: 5,
      healthPerPlayer: 15,
      damagePerPlayer: 3,
      minLevel: 2,
      maxLevel: 8,
    },

    experienceReward: 25,
    goldReward: { min: 5, max: 15 },
    lootTable: [
      {
        itemId: "shadow_essence",
        dropChance: 0.15,
        minQuantity: 1,
        maxQuantity: 1,
      },
      {
        itemId: "wolf_pelt",
        dropChance: 0.4,
        minQuantity: 1,
        maxQuantity: 2,
      },
      {
        itemId: "sharp_fang",
        dropChance: 0.25,
        minQuantity: 1,
        maxQuantity: 1,
      },
    ],

    spawnLocations: ["dark_forest", "shadow_realm_portal"],
    spawnWeight: 7,
    packSize: { min: 1, max: 3 },

    habitat: "Corrupted forests and shadow-touched wilderness",
    dietaryHabits: "Carnivorous, feeds on dark magic",
    socialStructure: "Pack hunters, led by alpha",
    threat_level: "Moderate - dangerous in groups",
    knownWeaknesses: ["Light magic", "Silver weapons", "Pack separation"],

    isActive: true,
    version: "1.0",
    lastModified: new Date("2024-01-15"),
  },

  // ===== ELEMENTAL CREATURES =====

  crystal_guardian: {
    id: "crystal_guardian",
    name: "Crystal Guardian",
    description:
      "A towering construct made of pure crystalline energy, pulsing with magical power and ancient protective enchantments.",
    flavorText:
      "Created by ancient mages to guard their most precious treasures, these beings are both beautiful and deadly.",

    type: EnemyType.CONSTRUCT,
    rarity: EnemyRarity.BOSS,
    tags: ["magical", "guardian", "crystal", "ancient"],

    sprite: "/assets/enemies/crystal_guardian.png",
    animationSet: "construct_large",
    size: "large",

    level: 10,
    health: 250,
    mana: 100,
    attack: 25,
    defense: 20,
    magicAttack: 35,
    magicDefense: 25,
    speed: 40,
    accuracy: 90,
    evasion: 5,
    criticalChance: 0.05,
    criticalMultiplier: 2.0,

    resistances: {
      physical: 0.3,
      magic: 0.2,
      lightning: 0.5,
      ice: 0.4,
      fire: -0.2,
    },
    immunities: ["poison", "bleeding", "disease", "charm", "fear"],
    weaknesses: ["fire", "sonic"],

    behavior: CombatBehavior.GUARDIAN,
    abilities: [
      {
        id: "crystal_slam",
        name: "Crystal Slam",
        description: "A devastating physical attack that can shatter armor.",
        type: "attack",
        damage: {
          base: 40,
          scaling: 4,
          type: "physical",
        },
        statusEffects: [
          {
            effect: "armor_break",
            duration: 4,
            strength: 3,
            chance: 0.4,
          },
        ],
        cooldown: 2,
        targetType: "single",
        animationDuration: 1.5,
        soundEffect: "crystal_impact.ogg",
        visualEffect: "crystal_shards",
      },
      {
        id: "prismatic_blast",
        name: "Prismatic Blast",
        description: "Fires a beam of concentrated magical energy.",
        type: "attack",
        damage: {
          base: 35,
          scaling: 5,
          type: "magic",
          element: "light",
        },
        cooldown: 3,
        targetType: "single",
        range: 3,
        animationDuration: 2.0,
        soundEffect: "energy_blast.ogg",
        visualEffect: "rainbow_beam",
      },
      {
        id: "crystal_barrier",
        name: "Crystal Barrier",
        description: "Creates a protective barrier that reflects damage.",
        type: "buff",
        statusEffects: [
          {
            effect: "damage_reflection",
            duration: 3,
            strength: 25,
            chance: 1.0,
          },
          {
            effect: "defense_boost",
            duration: 3,
            strength: 10,
            chance: 1.0,
          },
        ],
        cooldown: 6,
        targetType: "self",
        triggerCondition: {
          healthBelow: 0.6,
        },
        animationDuration: 1.8,
        soundEffect: "crystal_chime.ogg",
        visualEffect: "protective_aura",
      },
      {
        id: "crystal_storm",
        name: "Crystal Storm",
        description: "Unleashes a devastating area attack when near death.",
        type: "attack",
        damage: {
          base: 50,
          scaling: 6,
          type: "magic",
          element: "light",
        },
        cooldown: 8,
        uses: 1,
        targetType: "all",
        triggerCondition: {
          healthBelow: 0.2,
        },
        animationDuration: 3.0,
        soundEffect: "crystal_explosion.ogg",
        visualEffect: "crystal_storm_vfx",
      },
    ],

    aiPatterns: [
      {
        name: "Desperate Measures",
        priority: 10,
        conditions: {
          healthBelow: 0.25,
        },
        actions: [
          { abilityId: "crystal_storm", weight: 8 },
          { abilityId: "crystal_barrier", weight: 2 },
        ],
      },
      {
        name: "Defensive Stance",
        priority: 7,
        conditions: {
          healthBelow: 0.6,
          playerCount: 3,
        },
        actions: [
          { abilityId: "crystal_barrier", weight: 6 },
          { abilityId: "prismatic_blast", weight: 4 },
        ],
      },
      {
        name: "Aggressive Assault",
        priority: 6,
        conditions: {
          healthAbove: 0.6,
        },
        actions: [
          { abilityId: "crystal_slam", weight: 5 },
          { abilityId: "prismatic_blast", weight: 5 },
        ],
      },
    ],

    scaling: {
      healthPerLevel: 20,
      damagePerLevel: 3,
      defensePerLevel: 2,
      experiencePerLevel: 15,
      healthPerPlayer: 50,
      damagePerPlayer: 8,
      minLevel: 8,
      maxLevel: 15,
    },

    experienceReward: 150,
    goldReward: { min: 50, max: 100 },
    lootTable: [
      {
        itemId: "pure_crystal",
        dropChance: 1.0,
        minQuantity: 2,
        maxQuantity: 4,
      },
      {
        itemId: "crystal_core",
        dropChance: 0.6,
        minQuantity: 1,
        maxQuantity: 1,
      },
      {
        itemId: "guardian_essence",
        dropChance: 0.3,
        minQuantity: 1,
        maxQuantity: 1,
      },
      {
        itemId: "crystal_sword",
        dropChance: 0.1,
        minQuantity: 1,
        maxQuantity: 1,
        rareDropBonus: 0.05,
      },
    ],

    hasRegeneration: true,
    regenerationRate: 5,

    spawnLocations: ["crystal_cave"],
    spawnWeight: 10,
    packSize: { min: 1, max: 1 },

    habitat: "Crystal caves and magical sanctuaries",
    socialStructure: "Solitary guardian",
    threat_level: "High - Boss encounter",
    knownWeaknesses: ["Fire magic", "Sonic attacks", "Dispel magic"],

    isActive: true,
    version: "1.2",
    lastModified: new Date("2024-01-20"),
  },

  // ===== UNDEAD CREATURES =====

  ancient_lich: {
    id: "ancient_lich",
    name: "Archlich Valdris",
    displayName: "Valdris, the Eternal Scholar",
    description:
      "The undead remnant of a powerful archmage, bound to this realm by dark rituals and an insatiable thirst for forbidden knowledge.",
    flavorText:
      "Once the greatest scholar of the ancient kingdom, Valdris chose undeath over mortality to continue his research into the deepest mysteries of magic.",

    type: EnemyType.UNDEAD,
    rarity: EnemyRarity.LEGENDARY,
    tags: ["undead", "spellcaster", "boss", "ancient", "intelligent"],

    sprite: "/assets/enemies/ancient_lich.png",
    animationSet: "humanoid_floating",
    size: "medium",

    level: 18,
    health: 400,
    mana: 200,
    attack: 20,
    defense: 15,
    magicAttack: 60,
    magicDefense: 35,
    speed: 60,
    accuracy: 95,
    evasion: 15,
    criticalChance: 0.2,
    criticalMultiplier: 2.5,

    resistances: {
      dark: 0.8,
      ice: 0.6,
      physical: 0.4,
      light: -0.5,
      fire: 0.3,
    },
    immunities: ["poison", "disease", "bleeding", "fatigue", "charm", "sleep"],
    weaknesses: ["light", "silver", "blessed"],

    behavior: CombatBehavior.TACTICAL,
    abilities: [
      {
        id: "drain_life",
        name: "Drain Life",
        description: "Drains life force from enemies to heal himself.",
        type: "attack",
        damage: {
          base: 35,
          scaling: 4,
          type: "magic",
          element: "dark",
        },
        healing: {
          base: 20,
          scaling: 2,
          targetType: "self",
        },
        cooldown: 2,
        targetType: "single",
        animationDuration: 2.5,
        soundEffect: "life_drain.ogg",
        visualEffect: "dark_tendrils",
      },
      {
        id: "bone_prison",
        name: "Bone Prison",
        description: "Traps enemies in a cage of bones, preventing movement.",
        type: "debuff",
        statusEffects: [
          {
            effect: "immobilized",
            duration: 3,
            strength: 1,
            chance: 0.8,
          },
          {
            effect: "vulnerable",
            duration: 3,
            strength: 15,
            chance: 1.0,
          },
        ],
        cooldown: 4,
        targetType: "single",
        animationDuration: 2.0,
        soundEffect: "bone_rattle.ogg",
        visualEffect: "bone_cage",
      },
      {
        id: "death_bolt",
        name: "Death Bolt",
        description: "A bolt of pure necrotic energy.",
        type: "attack",
        damage: {
          base: 55,
          scaling: 6,
          type: "magic",
          element: "dark",
        },
        statusEffects: [
          {
            effect: "necrotic_decay",
            duration: 4,
            strength: 8,
            chance: 0.6,
          },
        ],
        cooldown: 3,
        targetType: "single",
        range: 5,
        animationDuration: 1.8,
        soundEffect: "death_magic.ogg",
        visualEffect: "necrotic_bolt",
      },
      {
        id: "raise_minions",
        name: "Raise Skeletal Minions",
        description: "Summons skeletal warriors to aid in battle.",
        type: "summon",
        cooldown: 8,
        uses: 2,
        targetType: "self",
        triggerCondition: {
          healthBelow: 0.7,
          enemiesAlive: 1,
        },
        animationDuration: 3.0,
        soundEffect: "necromancy_ritual.ogg",
        visualEffect: "summoning_circle",
      },
      {
        id: "apocalypse",
        name: "Apocalypse",
        description:
          "The ultimate spell of destruction, devastating all enemies.",
        type: "attack",
        damage: {
          base: 80,
          scaling: 10,
          type: "magic",
          element: "dark",
        },
        cooldown: 12,
        uses: 1,
        targetType: "all",
        triggerCondition: {
          healthBelow: 0.15,
        },
        animationDuration: 5.0,
        soundEffect: "apocalypse_spell.ogg",
        visualEffect: "dark_explosion",
      },
    ],

    aiPatterns: [
      {
        name: "Final Gambit",
        priority: 10,
        conditions: {
          healthBelow: 0.2,
        },
        actions: [{ abilityId: "apocalypse", weight: 10 }],
      },
      {
        name: "Summon Reinforcements",
        priority: 8,
        conditions: {
          healthBelow: 0.7,
          enemiesAlive: 1,
        },
        actions: [
          { abilityId: "raise_minions", weight: 9 },
          { abilityId: "bone_prison", weight: 1 },
        ],
      },
      {
        name: "Tactical Spellcasting",
        priority: 6,
        conditions: {
          healthAbove: 0.3,
        },
        actions: [
          { abilityId: "death_bolt", weight: 4 },
          { abilityId: "bone_prison", weight: 3 },
          { abilityId: "drain_life", weight: 3 },
        ],
      },
      {
        name: "Desperate Measures",
        priority: 7,
        conditions: {
          healthBelow: 0.3,
        },
        actions: [
          { abilityId: "drain_life", weight: 6 },
          { abilityId: "death_bolt", weight: 4 },
        ],
      },
    ],

    scaling: {
      healthPerLevel: 25,
      damagePerLevel: 5,
      defensePerLevel: 2,
      experiencePerLevel: 25,
      healthPerPlayer: 80,
      damagePerPlayer: 12,
      minLevel: 15,
      maxLevel: 25,
    },

    experienceReward: 500,
    goldReward: { min: 150, max: 300 },
    lootTable: [
      {
        itemId: "lich_phylactery_fragment",
        dropChance: 1.0,
        minQuantity: 1,
        maxQuantity: 1,
        requiresQuest: ["defeat_archlich_valdris"],
      },
      {
        itemId: "staff_of_valdris",
        dropChance: 0.3,
        minQuantity: 1,
        maxQuantity: 1,
      },
      {
        itemId: "ancient_spell_tome",
        dropChance: 0.6,
        minQuantity: 1,
        maxQuantity: 2,
      },
      {
        itemId: "soul_gem",
        dropChance: 0.4,
        minQuantity: 2,
        maxQuantity: 5,
      },
      {
        itemId: "necrotic_essence",
        dropChance: 0.8,
        minQuantity: 3,
        maxQuantity: 8,
      },
    ],

    isUndead: true,
    canSummon: true,
    summonLimit: 4,

    spawnLocations: ["ancient_ruins"],
    spawnWeight: 10,
    packSize: { min: 1, max: 1 },

    habitat: "Ancient ruins and necromantic sanctuaries",
    socialStructure: "Commands lesser undead",
    threat_level: "Extreme - Legendary boss",
    knownWeaknesses: [
      "Holy magic",
      "Blessed weapons",
      "Sunlight",
      "Turn undead spells",
    ],

    isActive: true,
    version: "1.3",
    lastModified: new Date(),
  },

  // ===== SUPPORT/PACK ENEMIES =====
  lich: {
    id: "lich",
    name: "Lich",
    description: "A powerful undead creature that commands lesser undead.",
    type: EnemyType.UNDEAD,
    rarity: EnemyRarity.LEGENDARY,
    tags: ["undead", "spellcaster"],
    sprite: "/assets/enemies/undead/undead_lich.png",
    animationSet: "undead",
    size: "medium",
    level: 18,
    health: 400,
    mana: 200,
    attack: 20,
    defense: 15,
    magicAttack: 60,
    magicDefense: 35,
    speed: 60,
    accuracy: 95,
    evasion: 15,
    criticalChance: 0.2,
    criticalMultiplier: 2.5,
    resistances: {
      dark: 0.8,
      light: 0.3,
      physical: 0.1,
    },
    immunities: ["poison"],
    weaknesses: ["fire", "magic"],
    behavior: CombatBehavior.AGGRESSIVE,
    abilities: [
      {
        id: "bone_prison",
        name: "Bone Prison",
        description: "Prisons the target with bone.",
        type: "debuff",
        targetType: "single",
        cooldown: 10,
        damage: {
          base: 40,
          scaling: 4,
          type: "physical",
        },
        statusEffects: [
          {
            effect: "bone_prison",
            duration: 10,
            strength: 0,
            chance: 1.0,
          },
        ],
        animationDuration: 0.8,
        soundEffect: "bone_prison.ogg",
        visualEffect: "bone_prison",
      },
    ],
    scaling: {
      healthPerLevel: 50,
      damagePerLevel: 10,
      defensePerLevel: 5,
      experiencePerLevel: 50,
      healthPerPlayer: 120,
      damagePerPlayer: 20,
      minLevel: 20,
      maxLevel: 30,
    },
    experienceReward: 1000,
    goldReward: { min: 300, max: 500 },
    lootTable: [],

    isUndead: true,
    canSummon: true,
    summonLimit: 4,

    spawnLocations: ["ancient_ruins"],
    spawnWeight: 10,
    packSize: { min: 1, max: 1 },

    habitat: "Ancient ruins and necromantic sanctuaries",
    socialStructure: "Commands lesser undead",
    threat_level: "Extreme - Legendary boss",
    knownWeaknesses: [
      "Holy magic",
      "Blessed weapons",
      "Sunlight",
      "Turn undead spells",
    ],

    isActive: true,
    version: "1.3",
    lastModified: new Date(),
    aiPatterns: [],
  },

  //MOBS

  skeleton: {
    id: "",
    name: "",
    description: "",
    type: EnemyType.BEAST,
    rarity: EnemyRarity.COMMON,
    tags: ["mob"],
    size: "tiny",
    level: 0,
    health: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    accuracy: 0,
    evasion: 0,
    criticalChance: 0,
    criticalMultiplier: 0,
    resistances: {
      physical: 0,
      magic: 0,
    },
    behavior: CombatBehavior.AGGRESSIVE,
    abilities: [],
    aiPatterns: [],
    scaling: {
      healthPerLevel: 0,
      damagePerLevel: 0,
      defensePerLevel: 0,
      experiencePerLevel: 0,
      healthPerPlayer: 0,
      damagePerPlayer: 0,
      minLevel: 0,
      maxLevel: 0,
    },
    experienceReward: 0,
    goldReward: {
      min: 0,
      max: 0,
    },
    lootTable: [],
    spawnLocations: [],
    spawnWeight: 0,
    packSize: {
      min: 0,
      max: 0,
    },
    isActive: false,
    version: "",
    lastModified: new Date(),
  },
};
