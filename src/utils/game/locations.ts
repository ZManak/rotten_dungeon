import { type Location } from '../../constants/game/locations'
    // Utility function to create a sublocation inheriting properties from a parent location

export function createSublocation ( parent: Location, overrides: Partial<Location>): Location {
    return {
        ...parent,
        ...overrides,
        id: `${parent.id}_${overrides.id || 'sublocation'}`,
        sublocations: overrides.sublocations || [],
    }
}



