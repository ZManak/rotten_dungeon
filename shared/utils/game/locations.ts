// import { GAME_ENEMIES, type Enemy } from "../../constants/game/enemies";
import type { Enemy } from "../../constants/game/enemies";
import {
  // GAME_LOCATIONS,
  type LocationEntity,
  type Location,
  TimeOfDay,
  BASE_GAME_LOCATIONS,
} from "../../constants/game/locations";

/**
 * Converts an Enemy to a LocationEntity with spawn configuration
 */
export function enemyToLocationEntity(
  enemy: Enemy,
  options: {
    spawnChance?: number;
    respawnTime?: number;
    maxCount?: number;
    requirements?: LocationEntity["requirements"];
    loot?: LocationEntity["loot"];
  } = {}
): LocationEntity {
  const {
    spawnChance = 1.0,
    respawnTime = 30, // default 30 minutes
    maxCount = enemy.packSize.max || 1,
    requirements,
    loot,
  } = options;

  // Convert enemy type to LocationEntity type
  let entityType: LocationEntity["type"];
  switch (enemy.behavior) {
    case "aggressive":
    case "berserker":
      entityType = "hostile";
      break;
    case "coward":
    case "defensive":
      entityType = "passive";
      break;
    case "support":
    case "guardian":
    case "tactical":
      entityType = "neutral";
      break;
    case "balanced":
    default:
      entityType =
        enemy.rarity === "boss" || enemy.rarity === "legendary"
          ? "unique"
          : "hostile";
      break;
  }

  // Convert enemy loot table to LocationEntity loot format
  const convertedLoot: LocationEntity["loot"] = loot || {
    common: enemy.lootTable
      .filter((drop) => drop.dropChance >= 0.3)
      .map((drop) => drop.itemId),
    rare: enemy.lootTable
      .filter((drop) => drop.dropChance >= 0.1 && drop.dropChance < 0.3)
      .map((drop) => drop.itemId),
    legendary: enemy.lootTable
      .filter((drop) => drop.dropChance < 0.1)
      .map((drop) => drop.itemId),
  };

  return {
    id: enemy.id,
    name: enemy.displayName || enemy.name,
    type: entityType,
    level: enemy.level,
    respawnTime,
    spawnChance,
    maxCount,
    requirements,
    loot: convertedLoot,
  };
}

/**
 * Populates location entities based on enemy spawn locations
 */
export function populateLocationEntities(): void {
  // Clear existing entities from locations
  Object.values(GAME_LOCATIONS).forEach((location) => {
    location.entities = [];
  });

  // Add enemies to their spawn locations
  Object.values(GAME_ENEMIES).forEach((enemy) => {
    if (!enemy.isActive) return;

    enemy.spawnLocations.forEach((spawnLocation) => {
      const location = Object.values(BASE_GAME_LOCATIONS).find(
        (loc) => loc.id === spawnLocation.id
      );
      if (!location) return;

      // Configure spawn parameters based on enemy rarity and location difficulty
      const spawnConfig = getSpawnConfigForEnemy(enemy, location);

      const locationEntity = enemyToLocationEntity(enemy, spawnConfig);

      if (!location.entities) location.entities = [];
      location.entities.push(locationEntity);
    });
  });
}

/**
 * Gets appropriate spawn configuration based on enemy and location
 */
function getSpawnConfigForEnemy(
  enemy: Enemy,
  location: Location
): Parameters<typeof enemyToLocationEntity>[1] {
  const baseConfig = {
    spawnChance: enemy.spawnWeight / 10, // Convert weight to probability
    respawnTime: 30,
    maxCount: enemy.packSize.max,
  };

  // Adjust based on enemy rarity
  switch (enemy.rarity) {
    case "legendary":
      return {
        ...baseConfig,
        spawnChance: Math.min(0.1, baseConfig.spawnChance),
        respawnTime: 180, // 3 hours
        maxCount: 1,
        requirements: {
          levelRequired: enemy.level - 2,
          questCompleted: [`encounter_${enemy.id}`],
        },
      };

    case "boss":
      return {
        ...baseConfig,
        spawnChance: Math.min(0.3, baseConfig.spawnChance),
        respawnTime: 120, // 2 hours
        maxCount: 1,
        requirements: {
          levelRequired: enemy.level - 3,
        },
      };

    case "elite":
      return {
        ...baseConfig,
        spawnChance: Math.min(0.5, baseConfig.spawnChance),
        respawnTime: 60, // 1 hour
        maxCount: Math.min(2, baseConfig.maxCount),
      };

    case "rare":
      return {
        ...baseConfig,
        spawnChance: Math.min(0.7, baseConfig.spawnChance),
        respawnTime: 45,
      };

    default: // common, uncommon
      return baseConfig;
  }
}

/**
 * Advanced population with custom spawn rules
 */
export function populateLocationEntitiesAdvanced(
  customRules: {
    [locationId: string]: {
      [enemyId: string]: Partial<Parameters<typeof enemyToLocationEntity>[1]>;
    };
  } = {}
): void {
  // First do basic population
  populateLocationEntities();

  // Then apply custom rules
  Object.entries(customRules).forEach(([locationId, enemyRules]) => {
    const location = GAME_LOCATIONS[locationId];
    if (!location || !location.entities) return;

    Object.entries(enemyRules).forEach(([enemyId, customConfig]) => {
      const entityIndex = location.entities!.findIndex(
        (entity) => entity.id === enemyId
      );
      if (entityIndex === -1) return;

      const enemy = GAME_ENEMIES[enemyId];
      if (!enemy) return;

      // Recreate entity with custom config
      const newEntity = enemyToLocationEntity(enemy, {
        ...getSpawnConfigForEnemy(enemy, location),
        ...customConfig,
      });

      location.entities![entityIndex] = newEntity;
    });
  });
}

/**
 * Filters enemies suitable for a specific location
 */
export function getEnemiesForLocation(location: Location): Enemy[] {
  return Object.values(GAME_ENEMIES).filter((enemy) => {
    if (!enemy.isActive) return false;

    // Check if enemy level matches location difficulty
    const locationLevelRange = location.recommendedLevel;
    if (
      enemy.level < locationLevelRange.min - 2 ||
      enemy.level > locationLevelRange.max + 3
    ) {
      return false;
    }

    // Check if enemy spawn locations include this location
    return enemy.spawnLocations.some((spawnLoc) => spawnLoc.id === location.id);
  });
}

/**
 * Adds a specific enemy to a specific location with custom config
 */
export function addEnemyToLocation(
  enemyId: string,
  locationId: string,
  config: Parameters<typeof enemyToLocationEntity>[1] = {}
): boolean {
  const enemy = GAME_ENEMIES[enemyId];
  const location = GAME_LOCATIONS[locationId];

  if (!enemy || !location || !enemy.isActive) return false;

  const spawnConfig = {
    ...getSpawnConfigForEnemy(enemy, location),
    ...config,
  };

  const locationEntity = enemyToLocationEntity(enemy, spawnConfig);

  if (!location.entities) location.entities = [];

  // Check if enemy already exists in location
  const existingIndex = location.entities.findIndex(
    (entity) => entity.id === enemyId
  );
  if (existingIndex !== -1) {
    location.entities[existingIndex] = locationEntity;
  } else {
    location.entities.push(locationEntity);
  }

  return true;
}

/**
 * Dynamic enemy population based on time of day, weather, etc.
 */
export function getDynamicLocationEntities(
  location: Location,
  context: {
    timeOfDay?: "dawn" | "day" | "dusk" | "night";
    weather?: string;
    playerLevel?: number;
    questsCompleted?: string[];
  } = {}
): LocationEntity[] {
  if (!location.entities) return [];

  return location.entities.filter((entity) => {
    // Check time-based requirements
    if (entity.requirements?.timeOfDay && context.timeOfDay) {
      if (!entity.requirements.timeOfDay.includes(context.timeOfDay as any)) {
        return false;
      }
    }

    // Check level requirements
    if (entity.requirements?.levelRequired && context.playerLevel) {
      if (context.playerLevel < entity.requirements.levelRequired) {
        return false;
      }
    }

    // Check quest requirements
    if (entity.requirements?.questCompleted && context.questsCompleted) {
      const hasRequiredQuests = entity.requirements.questCompleted.every(
        (quest) => context.questsCompleted!.includes(quest)
      );
      if (!hasRequiredQuests) {
        return false;
      }
    }

    return true;
  });
}

export function createSublocation(
  parent: Location,
  overrides: Partial<Location>
): Location {
  return {
    ...parent,
    ...overrides,
    id: `${parent.id}_${overrides.id || "sublocation"}`,
    sublocations: overrides.sublocations || [],
  };
}

// Note: populateLocationEntities() should be called manually after all imports are loaded
// to avoid circular dependency issues