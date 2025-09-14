import { createSublocation } from "../../utils/game/locations";

export enum LocationType {
    SAFE_ZONE = 'safe_zone',
    DUNGEON = 'dungeon',
    WILDERNESS = 'wilderness',
    TOWN = 'town',
    BOSS_AREA = 'boss_area',
    PVP_AREA = 'pvp_area',
    INSTANCED_AREA = 'instanced_area',
}

export enum LocationDifficulty {
    PEACEFUL = 0, // No enemies
    EASY = 1,     // Level 1-5 enemies, basic loot
    NORMAL = 2,   // Level 6-10 enemies, common loot
    HARD = 3,     // Level 11-15 enemies, rare loot
    ELITE = 4,    // Level 16-20 enemies, ultra rare loot
    LEGENDARY = 5,// Level 21-25 enemies, legendary loot
}

// Weather Conditions

export enum WeatherCondition {
    CLEAR = 'clear',
    RAIN = 'rain',
    STORM = 'storm',
    FOG = 'fog',
    SNOW = 'snow',
    WIND = 'wind',
}

// Time of Day

export enum TimeOfDay {
    DAWN = 'dawn',
    DAY = 'day',
    DUSK = 'dusk',
    NIGHT = 'night',
}

// Entity Types found in the game world
export interface LocationEntity {
    id: string;
    name: string;
    type: 'hostile' | 'neutral' | 'interactive' | 'passive' | 'unique';
    level?: number;
    respawnTime?: number;   // in minutes
    spawnChance?: number;   // 0-1 probability
    maxCount: number;     // Maximum number of this entity in the location
    requirements?: {
        questCompleted?: string[];
        itemRequired?: string[];
        levelRequired?: number;
        timeOfDay?: TimeOfDay[];
    };
    loot?: {
        common?: string[];
        rare?: string[];
        legendary?: string[];
    };
}

// Item Types found in the game world
export interface LocationItem {
    id: string;
    name: string;
    type: 'weapon' | 'armor' | 'consumable' | 'material' | 'quest' | 'treasure';
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    requirements?: {
        questCompleted?: string[];
        skillLevel?: {[skill: string]: number};
        timeOfDay?: TimeOfDay[];
    };
    dropChance?: number;    // 0-1 probability
    respawnTime?: number;   // in minutes
    hidden?: boolean;       // If true, the item is not visible in the game world
}

// Enviromental Effects found in the game world
export interface LocationEffect {
    id: string;
    name: string;
    description: string;
    effects: {
        damage?: number;
        heal?: number;
        statModifier?: {[stat: string]: number};
        abilityModifier?: {[ability: string]: number};
    }
    duration?: number;      //in entities actions
    requirements?: {
        weather?: WeatherCondition[];
        questCompleted?: string[];
        timeOfDay?: TimeOfDay[];
        playerLevel?: {min?: number, max?: number};
    };
    hidden?: boolean;       // If true, the effect is not visible in the game world
}

// Main Location Interface
export interface Location {
    id: string;
    name: string;
    description: string;
    flavorText: string;
    
    type: LocationType;
    difficulty: LocationDifficulty;
    recommendedLevel: {min: number, max: number};

    imageUrl?: string;
    music?: string;
    ambientSound?: string[];
    weather?: WeatherCondition[];

    entities?: LocationEntity[];
    items?: LocationItem[];
    effects?: LocationEffect[];

    // navigation
    connections: string[]; // Array of location ids
    travelTime?: number;    // in minutes
    travelRequirements?: {
        questCompleted?: string[];
        itemRequired?: string[];
        levelRequired?: number;
        goldCost?: number;
    }
    sublocations?: Location[]; // Array of location ids that are sublocations of this location
    
    // Properties
    allowsRest: boolean;
    allowsPvp: boolean;
    allowsTrade: boolean;
    isInstanced: boolean;
    maxPlayers: number;

    // Events
    onEnter?: string[];
    onExit?: string[];
    periodic?: {eventId: string, intervalMinutes: number}[];
    questGivers?: string[]; //NPC IDs that can give quests

    // Shops
    shops?: {
        merchantId: string;
        name: string;
        itemCategories: string[];
        buyMultiplier: number;
        sellMultiplier: number;
    }[];

    // Metadata
    createdAt?: Date;
    updatedAt?: Date;
    discoveredBy?: string[]; // Array of player ids who have discovered this location
    isActive?: boolean;
    isHidden?: boolean; // If true, the location is not visible in the game world
    tags?: string[]; // Additional tags for categorization
}

// Game World Locations
export const BASE_GAME_LOCATIONS: { [key: string]: Location } = {
  // STARTER AREAS

  undead_asylum: {
    id: "undead_asylum",
    name: "Undead Asylum",
    description: "A dark and gloomy asylum for the undead.",
    flavorText:
      "The air is thick with the scent of decay and despair. Shadows dance on the walls, and the distant wails of lost souls echo through the halls.",
    type: LocationType.DUNGEON,
    difficulty: LocationDifficulty.EASY,
    recommendedLevel: { min: 1, max: 5 },
    imageUrl: "https://i.ibb.co/5W6V5kS/undead-asylum.jpg",
    music: "undead_asylum",
    ambientSound: ["undead_asylum_ambient"],
    weather: [WeatherCondition.RAIN, WeatherCondition.WIND],
    entities: [
      {
        id: "peaceful_undead",
        name: "Undead",
        type: "passive",
        spawnChance: 1,
        respawnTime: 60,
        maxCount: 5,
      },
      {
        id: "undead",
        name: "Undead",
        type: "hostile",
        level: 1,
        spawnChance: 1,
        respawnTime: 30,
        maxCount: 2,
      },
      {
        id: "assylum_guard",
        name: "Demonic Guard",
        type: "unique",
        level: 3,
        spawnChance: 1,
        maxCount: 1,
      },
    ],
    items: [
      {
        id: "undead_asylum_key",
        name: "Undead Asylum Key",
        type: "treasure",
        requirements: { questCompleted: ["undead_asylum_key"] },
        rarity: "common",
        dropChance: 1,
      },
    ],
    connections: [
      "undead_asylum_cell",
      "undead_asylum_corridor",
      "undead_asylum_hall",
      "undead_asylum_courtyard",
    ],
    allowsRest: false,
    allowsPvp: true,
    allowsTrade: true,
    isInstanced: true,
    maxPlayers: 5,
    onEnter: ["undead_asylum_on_enter"],
    questGivers: ["undead_asylum_quest_giver"],
    sublocations: [
      
    ],

    createdAt: new Date(),
    updatedAt: new Date(),
    discoveredBy: [],
    isActive: true,
    isHidden: false,
    tags: [],
  },
  ruined_village: {
    id: "ruined_village",
    name: "Crumbling Village",
    description: "A desolate village that has been overrun by docile wolfs.",
    flavorText:
      "The village is crumbling, and the wolfs are taking over. They are peaceful, but their presence is unsettling.",
    type: LocationType.TOWN,
    difficulty: LocationDifficulty.EASY,
    recommendedLevel: { min: 1, max: 5 },
    weather: [WeatherCondition.RAIN, WeatherCondition.FOG],

    entities: [
      {
        id: "peaceful_wolf",
        name: "Wolf",
        type: "passive",
        spawnChance: 1,
        respawnTime: 60,
        maxCount: 4,
      },
      {
        id: "wolf_priestess",
        name: "Wolf Priestess",
        type: "unique",
        level: 3,
        spawnChance: 1,
        maxCount: 1,
      },
    ],

    items: [
      {
        id: "ruined_village_church_key",
        name: "Wolf Church Key",
        type: "treasure",
        requirements: { questCompleted: ["ruined_village_key"] },
        rarity: "common",
        dropChance: 1,
      },
    ],
    connections: [
      "ruined_village_plaza",
      "ruined_village_outskirts",
      "ruined_village_graveyard",
      "ruined_village_church",
    ],
    allowsRest: false,
    allowsPvp: true,
    allowsTrade: true,
    isInstanced: true,
    maxPlayers: 20,

    questGivers: ["ruined_village_quest_giver"],

    createdAt: new Date(),
    updatedAt: new Date(),
    discoveredBy: [],
    isActive: true,
    isHidden: false,
    tags: ['hub', 'town'],
  },
};
  

export const GAME_SUBLOCATIONS: { [key: string]: Location } = {
  undead_asylum_cell: createSublocation(
    { ...BASE_GAME_LOCATIONS.undead_asylum, sublocations: [] },
    {
      id: 'cell',
      name: 'Asylum Cell',
      description: 'A small, dark cell where prisoners were kept.',
      flavorText: 'The cell is damp and cold. The walls are covered in scratches and graffiti from past inmates.',
    }
  ),
  undead_asylum_hall: createSublocation(
    { ...BASE_GAME_LOCATIONS.undead_asylum, sublocations: [] },
    {
      id: 'hall',
      name: 'Asylum Hall', 
      description: 'A large room with stone walls and a high ceiling.',
      flavorText: 'The hall is dimly lit, and the walls are covered in scratches and graffiti from past inmates.',
    }
  ),
  undead_asylum_courtyard: createSublocation(
    { ...BASE_GAME_LOCATIONS.undead_asylum, sublocations: [] },
    {
      id: 'courtyard',
      name: 'Asylum Courtyard',
      description: 'A large courtyard with stone walls and a high ceiling.',
      flavorText: 'The courtyard is dimly lit, and the walls are covered in scratches and graffiti from past inmates.',
    }
  ),
  undead_asylum_corridor: createSublocation(
    { ...BASE_GAME_LOCATIONS.undead_asylum, sublocations: [] },
    {
      id: 'corridor',
      name: 'Asylum Corridor',
      description: 'A narrow corridor with stone walls and a high ceiling.',
      flavorText: 'The corridor is dimly lit, and the walls are covered in scratches and graffiti from past inmates.',
    },
  ),
  ruined_village_plaza: createSublocation(
    { ...BASE_GAME_LOCATIONS.ruined_village, sublocations: [] },
    {
      id: 'plaza',
      name: 'Plaza',
      description: 'A bustling plaza with a fountain and a market.',
      flavorText: 'The plaza is bustling with people and activity.',
    },
    ),
    ruined_village_outskirts: createSublocation(
      { ...BASE_GAME_LOCATIONS.ruined_village, sublocations: [] },
      {
        id: 'outskirts',
        name: 'Outskirts',
        description: 'A quiet outskirts with a small village.',
        flavorText: 'The outskirts are quiet and peaceful.',
      }
    )
}

export const GAME_LOCATIONS: { [key: string]: Location } = {
  undead_asylum: {
    ...BASE_GAME_LOCATIONS.undead_asylum,
    sublocations: [
      GAME_SUBLOCATIONS.undead_asylum_cell,
      GAME_SUBLOCATIONS.undead_asylum_hall,
      GAME_SUBLOCATIONS.undead_asylum_courtyard,
      GAME_SUBLOCATIONS.undead_asylum_corridor
    ]
  },
  ruined_village: {
    ...BASE_GAME_LOCATIONS.ruined_village,
    sublocations: [
      GAME_SUBLOCATIONS.ruined_village_plaza,
      GAME_SUBLOCATIONS.ruined_village_outskirts,
    ]
  }
}

export function getGameLocations (): Location[] {
    return [...Object.values(GAME_LOCATIONS), ...Object.values(GAME_SUBLOCATIONS)]
}


// Example usage

//Generate Layouts
// Store the original location data without distributed items/entities
const ORIGINAL_LOCATION_DATA: { [key: string]: { items: LocationItem[] | undefined, entities: LocationEntity[] | undefined} } = {};

// Initialize original data storage
function storeOriginalLocationData(): void {
  Object.values(GAME_LOCATIONS).forEach(location => {
    if (location.sublocations && location.sublocations.length > 0) {
      ORIGINAL_LOCATION_DATA[location.id] = {
        items: location.items ? [...location.items] : [],
        entities: location.entities ? [...location.entities] : []
      };
    }
  });
}

// Enhanced distribution function that creates a new random layout
export function distributeItemsAndEntities(parent: Location, seed?: string): Location {
  if (!parent.sublocations || parent.sublocations.length === 0) {
    return parent;
  }

  // Get original items and entities (not previously distributed ones)
  const originalData = ORIGINAL_LOCATION_DATA[parent.id];
  const itemsToDistribute = originalData ? [...originalData.items as LocationItem[]] : (parent.items ? [...parent.items] : []);
  const entitiesToDistribute = originalData ? [...originalData.entities as LocationEntity[]] : (parent.entities as LocationEntity[] ? [...parent.entities as LocationEntity[]] : []);

  // Create a seeded random function if seed is provided (for deterministic layouts)
  const getRandom = seed ? createSeededRandom(seed) : Math.random;

  // Clear all sublocations first
  const clearedSublocations = parent.sublocations.map(sublocation => ({
    ...sublocation,
    items: [] as LocationItem[],
    entities: [] as LocationEntity[]
  }));

  // Distribute items randomly
  itemsToDistribute.forEach((item) => {
    const randomIndex = Math.floor(getRandom() * clearedSublocations.length);
    clearedSublocations[randomIndex].items = clearedSublocations[randomIndex].items || [];
    clearedSublocations[randomIndex].items.push(item as LocationItem);
  });

  // Distribute entities randomly
  entitiesToDistribute.forEach((entity) => {
    const randomIndex = Math.floor(getRandom() * clearedSublocations.length);
    clearedSublocations[randomIndex].entities = clearedSublocations[randomIndex].entities || [];
    clearedSublocations[randomIndex].entities.push(entity);
  });

  return {
    ...parent,
    items: [], // Clear parent items since they're now distributed
    entities: [], // Clear parent entities since they're now distributed
    sublocations: clearedSublocations,
  };
}

// Advanced distribution with more control
export function distributeItemsAndEntitiesAdvanced(
  parent: Location, 
  options: {
    seed?: string;
    minItemsPerSublocation?: number;
    maxItemsPerSublocation?: number;
    minEntitiesPerSublocation?: number;
    maxEntitiesPerSublocation?: number;
    guaranteedDistribution?: boolean; // Ensures every sublocation gets at least something
  } = {}
): Location {
  if (!parent.sublocations || parent.sublocations.length === 0) {
    return parent;
  }

  const {
    seed,
    minItemsPerSublocation = 0,
    maxItemsPerSublocation = Infinity,
    minEntitiesPerSublocation = 0,
    maxEntitiesPerSublocation = Infinity,
    guaranteedDistribution = false
  } = options;

  const originalData = ORIGINAL_LOCATION_DATA[parent.id];
  const itemsToDistribute = originalData ? [...originalData.items as LocationItem[]] : (parent.items ? [...parent.items] : []);
  const entitiesToDistribute = originalData ? [...originalData.entities as LocationEntity[]] : (parent.entities ? [...parent.entities] : []);

  const getRandom = seed ? createSeededRandom(seed) : Math.random;

  // Initialize sublocations with empty arrays
  const distributedSublocations = parent.sublocations.map(sublocation => ({
    ...sublocation,
    items: [] as LocationItem[],
    entities: [] as LocationEntity[]
  }));

  // Guaranteed distribution: ensure each sublocation gets at least one item/entity
  if (guaranteedDistribution && distributedSublocations.length > 0) {
    // Distribute one item to each sublocation first (if we have enough)
    for (let i = 0; i < Math.min(distributedSublocations.length, itemsToDistribute.length); i++) {
      distributedSublocations[i].items.push(itemsToDistribute.splice(0, 1)[0]);
    }
    
    // Distribute one entity to each sublocation first (if we have enough)
    for (let i = 0; i < Math.min(distributedSublocations.length, entitiesToDistribute.length); i++) {
      distributedSublocations[i].entities.push(entitiesToDistribute.splice(0, 1)[0]);
    }
  }

  // Distribute remaining items
  itemsToDistribute.forEach(item => {
    let attempts = 0;
    let placed = false;
    
    while (!placed && attempts < 100) { // Prevent infinite loops
      const randomIndex = Math.floor(getRandom() * distributedSublocations.length);
      const sublocation = distributedSublocations[randomIndex];
      
      if (sublocation.items.length < maxItemsPerSublocation) {
        sublocation.items.push(item);
        placed = true;
      }
      attempts++;
    }
  });

  // Distribute remaining entities
  entitiesToDistribute.forEach(entity => {
    let attempts = 0;
    let placed = false;
    
    while (!placed && attempts < 100) { // Prevent infinite loops
      const randomIndex = Math.floor(getRandom() * distributedSublocations.length);
      const sublocation = distributedSublocations[randomIndex];
      
      if (sublocation.entities.length < maxEntitiesPerSublocation) {
        sublocation.entities.push(entity);
        placed = true;
      }
      attempts++;
    }
  });

  return {
    ...parent,
    items: [],
    entities: [],
    sublocations: distributedSublocations,
  };
}

// Seeded random function for deterministic layouts
function createSeededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return function() {
    hash = (hash * 9301 + 49297) % 233280;
    return hash / 233280;
  };
}

// Function to get a fresh layout for a location
export function getLocationWithFreshLayout(locationId: string, seed?: string): Location | null {
  const baseLocation = GAME_LOCATIONS[locationId];
  if (!baseLocation) return null;
  
  return distributeItemsAndEntities(baseLocation, seed);
}

// Function to get location layout with advanced options
export function getLocationWithAdvancedLayout(
  locationId: string, 
  options: Parameters<typeof distributeItemsAndEntitiesAdvanced>[1] = {}
): Location | null {
  const baseLocation = GAME_LOCATIONS[locationId];
  if (!baseLocation) return null;
  
  return distributeItemsAndEntitiesAdvanced(baseLocation, options);
}

// Game state management functions
export class LocationManager {
  private currentLayouts: Map<string, Location> = new Map();
  
  // Get a location with current layout, or generate new one if not exists
  getLocation(locationId: string, forceNewLayout: boolean = false): Location | null {
    if (forceNewLayout || !this.currentLayouts.has(locationId)) {
      const freshLocation = getLocationWithFreshLayout(locationId);
      if (freshLocation) {
        this.currentLayouts.set(locationId, freshLocation);
      }
      return freshLocation;
    }
    
    return this.currentLayouts.get(locationId) || null;
  }
  
  // Generate new layout for a specific location
  refreshLocationLayout(locationId: string, seed?: string): Location | null {
    const freshLocation = getLocationWithFreshLayout(locationId, seed);
    if (freshLocation) {
      this.currentLayouts.set(locationId, freshLocation);
    }
    return freshLocation;
  }
  
  // Clear all cached layouts (useful for reset or new game)
  clearAllLayouts(): void {
    this.currentLayouts.clear();
  }
}

// Initialize the original data storage
storeOriginalLocationData();

// Example usage:
const locationManager = new LocationManager();

// Get undead asylum with a fresh random layout
const randomLayout = locationManager.getLocation('undead_asylum', true);

// Get undead asylum with a seeded layout (same seed = same layout)
const seededLayout = getLocationWithFreshLayout('undead_asylum', 'player123_visit1');

// Get undead asylum with advanced distribution options
const advancedLayout = getLocationWithAdvancedLayout('undead_asylum', {
  seed: 'advanced_seed',
  guaranteedDistribution: true,
  maxItemsPerSublocation: 2,
  maxEntitiesPerSublocation: 1
});

// Clear all cached layouts (useful for reset or new game)
locationManager.clearAllLayouts();

// Generate new layout for a specific location
const newLayout = locationManager.refreshLocationLayout('undead_asylum', 'player123_visit2');

// Get a location with current layout, or generate new one if not exists
const currentLayout = locationManager.getLocation('undead_asylum');

// Get a location with current layout, or generate new one if not exists (forced)
const forcedLayout = locationManager.getLocation('undead_asylum', true);

//Console log