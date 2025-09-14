import type { Location } from "../../constants/game/locations";

/**
 * Creates a sublocation from a parent location
 */
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

// Placeholder functions to avoid breaking imports
export function populateLocationEntities(): void {
  console.log('populateLocationEntities: Placeholder - implement later');
}

export function getDynamicLocationEntities(): any {
  return [];
}