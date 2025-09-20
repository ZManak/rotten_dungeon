// src/constants/game/weapons.ts

/**
 * Weapon Categories - Different types of weapons
 */
export enum WeaponCategory {
  SWORD = "sword",
  DAGGER = "dagger",
  AXE = "axe",
  MACE = "mace",
  BOW = "bow",
  CROSSBOW = "crossbow",
  STAFF = "staff",
  WAND = "wand",
  SPEAR = "spear",
  HAMMER = "hammer",
  WHIP = "whip",
  CLAW = "claw",
  PAIRED_SWORDS = "paired_swords",
  PAIRED_DAGGERS = "paired_daggers",
}

/**
 * Weapon Rarity Tiers
 */
export enum WeaponRarity {
  COMMON = "common",
  UNCOMMON = "uncommon",
  RARE = "rare",
  EPIC = "epic",
  LEGENDARY = "legendary",
  ARTIFACT = "artifact",
}

/**
 * Damage Types
 */
export enum DamageType {
  SLASH = "slash",
  THRUST = "thrust",
  BLUNT = "blunt",
  PIERCE = "pierce",
  MAGIC = "magic",
  FIRE = "fire",
  ICE = "ice",
  LIGHTNING = "lightning",
  DARK = "dark",
  LIGHT = "light",
  POISON = "poison",
}

/**
 * Weapon Requirements
 */
export interface WeaponRequirements {
  str: number; // Strength requirement
  dex: number; // Dexterity requirement
  int: number; // Intelligence requirement
  fai: number; // Faith requirement
  level?: number; // Character level requirement
  questCompleted?: string[]; // Required completed quests
}

/**
 * Weapon Scaling - How weapon damage scales with stats
 */
export interface WeaponScaling {
  str?: number; // Strength scaling (0-100%)
  dex?: number; // Dexterity scaling (0-100%)
  int?: number; // Intelligence scaling (0-100%)
  fai?: number; // Faith scaling (0-100%)
}

/**
 * Weapon Effects - Special effects applied on hit/crit
 */
export interface WeaponEffect {
  id: string;
  name: string;
  description: string;
  type:
    | "poison"
    | "burn"
    | "freeze"
    | "shock"
    | "bleed"
    | "curse"
    | "heal"
    | "buff"
    | "debuff";

  // Damage over time
  damagePerAction?: number;
  duration?: number; // in actions

  // Trigger conditions
  onHit?: boolean;
  onCrit?: boolean;
  chance?: number; // 0-1 probability

  // Status modifications
  statModifier?: {
    [stat: string]: number;
  };
}

/**
 * Attack Pattern - Defines how the weapon attacks
 */
export interface AttackPattern {
  hits: number; // Number of hits per attack
  targets: {
    min: number;
    max: number;
  };
  hitsPerTarget: {
    min: number;
    max: number;
  };
}

/**
 * Core Weapon Interface
 */
export interface Weapon {
  // Basic Information
  id: string;
  name: string;
  description: string;
  flavorText?: string;

  // Classification
  category: WeaponCategory;
  rarity: WeaponRarity;
  tags: string[];

  // Visual
  sprite?: string;
  iconUrl?: string;
  animationSet?: string;

  // Attack Rating
  attackRating: number; // Base attack rating

  // Combat Stats
  hitChance: number; // 0-100% base hit chance
  critChance: number; // 0-100% critical hit chance
  critMultiplier: number; // Critical hit damage multiplier
  attackSpeed?: number; // Attacks per turn or speed modifier

  // Attack Pattern
  attackPattern: AttackPattern;

  // Damage Types
  primaryDamageType: DamageType;
  secondaryDamageType?: DamageType;

  // Requirements and Scaling
  requirements: WeaponRequirements;
  scaling: WeaponScaling;

  // Special Effects
  effects?: WeaponEffect[];

  // Durability
  durability?: {
    current: number;
    max: number;
    repairCost?: number;
  };

  // Enhancement
  enhancementLevel: number; // +0 to +10 or similar
  canEnhance: boolean;
  enhancementMaterials?: string[]; // Item IDs needed for enhancement

  // Economic
  value: number; // Base gold value
  shopPrice?: number; // Price in shops
  sellPrice?: number; // Price when selling

  // Metadata
  isUnique?: boolean;
  isQuestItem?: boolean;
  isTradeable?: boolean;
  weight?: number;

  // Lore
  loreText?: string;
  origin?: string;
  previousOwners?: string[];
}

/**
 * Game Weapons Database
 */
export const GAME_WEAPONS: { [key: string]: Weapon } = {
  // ===== COMMON WEAPONS =====

  rusty_sword: {
    id: "rusty_sword",
    name: "Rusty Sword",
    description: "A worn blade that has seen better days.",
    flavorText: "The metal is pitted with rust, but it still holds an edge.",

    category: WeaponCategory.SWORD,
    rarity: WeaponRarity.COMMON,
    tags: ["starter", "one_handed", "metal"],

    attackRating: 25,

    hitChance: 85,
    critChance: 5,
    critMultiplier: 1.5,

    attackPattern: {
      hits: 1,
      targets: { min: 1, max: 1 },
      hitsPerTarget: { min: 1, max: 1 },
    },

    primaryDamageType: DamageType.SLASH,

    requirements: {
      str: 8,
      dex: 5,
      fai: 3,
      int: 3,
    },

    scaling: {
      str: 0.4, // 40% strength scaling
      dex: 0.2, // 20% dexterity scaling
      fai: 0.1, // 10% faith scaling
      int: 0.1, // 10% intelligence scaling
    },

    enhancementLevel: 0,
    canEnhance: true,

    value: 50,
    shopPrice: 75,
    sellPrice: 25,

    durability: {
      current: 80,
      max: 100,
      repairCost: 10,
    },

    isTradeable: true,
    weight: 3.5,

    loreText: "A common sword used by adventurers.",
    origin: "Unknown",
    previousOwners: ["John Doe", "Jane Smith"],
  },

  // ===== RARE WEAPONS =====

  poison_heavy_paired_swords: {
    id: "poison_heavy_paired_swords",
    name: "Poison Heavy Paired Swords",
    description:
      "Twin blades coated with a deadly toxin that seeps into wounds.",
    flavorText:
      "Forged by assassins, these blades drip with malevolent poison.",

    category: WeaponCategory.PAIRED_SWORDS,
    rarity: WeaponRarity.RARE,
    tags: ["dual_wield", "poison", "assassin", "paired"],

    sprite: "/assets/weapons/poison_paired_swords.png",
    iconUrl: "/assets/icons/poison_swords_icon.png",
    animationSet: "dual_sword",

    attackRating: 80,

    hitChance: 60,
    critChance: 10,
    critMultiplier: 1.2,
    attackSpeed: 1.2, // 20% faster attacks

    attackPattern: {
      hits: 2,
      targets: { min: 1, max: 2 },
      hitsPerTarget: { min: 1, max: 2 },
    },

    primaryDamageType: DamageType.SLASH,
    secondaryDamageType: DamageType.POISON,

    requirements: {
      str: 15,
      dex: 10,
      int: 0,
      fai: 0,
    },

    scaling: {
      str: 0.89, // 189% strength scaling (very high)
      dex: 0.55, // 55% dexterity scaling
      fai: 0.1, // 10% faith scaling
      int: 0.1, // 10% intelligence scaling
    },

    effects: [
      {
        id: "poison_application",
        name: "Poison",
        description: "Inflicts poison damage over time.",
        type: "poison",
        damagePerAction: 6,
        duration: 31,
        onCrit: true,
        chance: 1.0, // Always applies on crit
      },
    ],

    enhancementLevel: 3,
    canEnhance: true,
    enhancementMaterials: ["poison_crystal", "dark_steel"],

    value: 730,
    shopPrice: 1200,
    sellPrice: 365,

    durability: {
      current: 150,
      max: 200,
      repairCost: 50,
    },

    isTradeable: true,
    weight: 6.5,

    loreText:
      "These twin blades were wielded by the legendary assassin Vex the Shadowbane. Each sword was bathed in the venom of a thousand serpents.",
    origin: "Assassins Guild of the Eastern Reaches",
    previousOwners: ["Vex the Shadowbane", "Master Thief Korran"],
  },

  // ===== LEGENDARY WEAPONS =====

  dragonslayer_greatsword: {
    id: "dragonslayer_greatsword",
    name: "Dragonslayer Greatsword",
    description: "A massive blade forged from dragon scale and blessed steel.",
    flavorText: "This weapon has tasted the blood of ancient wyrms.",

    category: WeaponCategory.SWORD,
    rarity: WeaponRarity.LEGENDARY,
    tags: ["two_handed", "dragon_slayer", "blessed", "massive"],

    sprite: "/assets/weapons/dragonslayer_greatsword.png",
    animationSet: "greatsword_heavy",

    attackRating: 100,

    hitChance: 75,
    critChance: 15,
    critMultiplier: 2.5,
    attackSpeed: 0.7, // 30% slower but devastating

    attackPattern: {
      hits: 1,
      targets: { min: 1, max: 3 },
      hitsPerTarget: { min: 1, max: 1 },
    },

    primaryDamageType: DamageType.SLASH,
    secondaryDamageType: DamageType.LIGHT,

    requirements: {
      str: 35,
      dex: 12,
      fai: 15,
      int: 0,
    },

    scaling: {
      str: 0.95, // 95% strength scaling
      fai: 0.3, // 30% faith scaling
      dex: 0.1, // 10% dexterity scaling
      int: 0.1, // 10% intelligence scaling
    },

    effects: [
      {
        id: "dragon_bane",
        name: "Dragon Bane",
        description: "Deals massive damage to draconic creatures.",
        type: "buff",
        onHit: true,
        chance: 1.0,
        statModifier: {
          damage_vs_dragons: 200, // 200% more damage vs dragons
        },
      },
      {
        id: "holy_fire",
        name: "Holy Fire",
        description: "Burns undead with sacred flames.",
        type: "burn",
        damagePerAction: 25,
        duration: 5,
        onCrit: true,
        chance: 0.8,
      },
    ],

    enhancementLevel: 7,
    canEnhance: true,
    enhancementMaterials: ["dragon_heart", "blessed_ore", "ancient_runes"],

    value: 15000,
    sellPrice: 7500,

    durability: {
      current: 500,
      max: 500,
      repairCost: 200,
    },

    isUnique: true,
    isQuestItem: true,
    isTradeable: false,
    weight: 25,

    loreText:
      "Forged in the dying breath of Valdris the Crimson, this blade contains the essence of dragonfire and holy light. Only one exists in all the realms.",
    origin: "The Great Dragon War",
    previousOwners: ["Saint Matthias the Dragonslayer"],
  },

  // ===== MAGIC WEAPONS =====

  staff_of_frost: {
    id: "staff_of_frost",
    name: "Staff of Eternal Frost",
    description: "A crystalline staff that radiates bone-chilling cold.",
    flavorText: "Ice crystals form in the air around this ancient weapon.",

    category: WeaponCategory.STAFF,
    rarity: WeaponRarity.EPIC,
    tags: ["magic", "ice", "two_handed", "crystalline"],

    attackRating: 45,

    hitChance: 90,
    critChance: 25,
    critMultiplier: 1.8,

    attackPattern: {
      hits: 1,
      targets: { min: 1, max: 5 },
      hitsPerTarget: { min: 1, max: 1 },
    },

    primaryDamageType: DamageType.MAGIC,
    secondaryDamageType: DamageType.ICE,

    requirements: {
      int: 25,
      str: 8,
      fai: 0,
      dex: 0,
    },

    scaling: {
      int: 0.85, // 85% intelligence scaling
      fai: 0.2, // 20% faith scaling
      dex: 0.1, // 10% dexterity scaling
      str: 0.1, // 10% strength scaling
    },

    effects: [
      {
        id: "freeze",
        name: "Freeze",
        description: "Slows enemy actions with intense cold.",
        type: "freeze",
        duration: 3,
        onHit: true,
        chance: 0.4,
        statModifier: {
          speed: -50,
        },
      },
      {
        id: "ice_shard",
        name: "Ice Shard Explosion",
        description:
          "Critical hits create ice shards that damage nearby enemies.",
        type: 'buff',
        onCrit: true,
        chance: 1.0,
      },
    ],

    durability: {
      current: 300,
      max: 300,
    },

    enhancementLevel: 5,
    canEnhance: true,
    enhancementMaterials: ["eternal_ice", "mana_crystal"],

    value: 3500,
    shopPrice: 5000,
    sellPrice: 1750,

    weight: 4.8,
    isTradeable: true,

    loreText:
      "Carved from a glacier that never melts, this staff channels the primal force of winter itself.",
  },

  // ===== RANGED WEAPONS =====

  shadow_crossbow: {
    id: "shadow_crossbow",
    name: "Shadow Crossbow",
    description: "A crossbow that fires bolts of pure darkness.",

    category: WeaponCategory.CROSSBOW,
    rarity: WeaponRarity.RARE,
    tags: ["ranged", "dark", "stealth"],

    attackRating: 50,

    hitChance: 85,
    critChance: 20,
    critMultiplier: 2.0,

    attackPattern: {
      hits: 1,
      targets: { min: 1, max: 1 },
      hitsPerTarget: { min: 1, max: 1 },
    },

    primaryDamageType: DamageType.PIERCE,
    secondaryDamageType: DamageType.DARK,

    requirements: {
      dex: 20,
      int: 10,
      fai: 0,
      str: 0,
    },

    scaling: {
      dex: 0.7,
      int: 0.25,
      fai: 0.1,
      str: 0.1,
    },

    effects: [
      {
        id: "shadow_bolt",
        name: "Shadow Bolt",
        description: "Bolts pierce through multiple enemies.",
        type: "buff",
        onHit: true,
        chance: 0.3,
      },
    ],

    enhancementLevel: 2,
    canEnhance: true,

    value: 800,
    isTradeable: true,
    weight: 5.2,
  },
};

export default GAME_WEAPONS;
