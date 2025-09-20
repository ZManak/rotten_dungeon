"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "CommonJS", { value: true });
exports.createSublocation = createSublocation;
// Utility function to create a sublocation inheriting properties from a parent location
function createSublocation(parent, overrides) {
    return __assign(__assign(__assign({}, parent), overrides), { id: "".concat(parent.id, "_").concat(overrides.id || 'sublocation'), sublocations: overrides.sublocations || [] });
}
// Example usage:
// const parentLocation: Location = {
//     id: 'parent_location',
//     name: 'Parent Location',
//     description: 'A description of the parent location',
//     type: LocationType.SAFE_ZONE,
//     difficulty: LocationDifficulty.PEACEFUL,
//     recommendedLevel: { min: 1, max: 10 },
//     min: 1,
//     max: 10,
//     imageUrl: 'parent_location_image.jpg',
//     music: 'parent_location_music.mp3',
//     ambientSound: ['ambient_sound_1.mp3', 'ambient_sound_2.mp3'],
//     weather: [WeatherCondition.CLEAR, WeatherCondition.RAIN],
//     entities: [],
//     items: [],
//     effects: [],
//     connections: ['sublocation_1', 'sublocation_2'],
//     travelTime: 30,
//     travelRequirements: {
//         questCompleted: ['quest_1', 'quest_2'],
//         itemRequired: ['item_1', 'item_2'],
//         levelRequired: 10,
//         goldCost: 100,
//     },
//     questCompleted: ['quest_1', 'quest_2'],
//     itemRequired: ['item_1', 'item_2'],
//     levelRequired: 10,
//     goldCost: 100,
// }
// const sublocation1: Location = createSublocation(parentLocation, {
//     id: 'sublocation_1',
//     name: 'Sublocation 1',
//     description: 'A description of sublocation 1',
//     type: LocationType.SAFE_ZONE,
//     difficulty: LocationDifficulty.PEACEFUL,
//     recommendedLevel: { min: 1, max: 10 },
//     min: 1,
//     max: 10,
//     imageUrl: 'sublocation_1_image.jpg',
//     music: 'sublocation_1_music.mp3',
//     ambientSound: ['ambient_sound_1.mp3', 'ambient_sound_2.mp3'],
//     weather: [WeatherCondition.CLEAR, WeatherCondition.RAIN],
//     entities: [],
//     items: [],
//     effects: [],
//     connections: ['sublocation_2'],
//     travelTime: 30,
//     travelRequirements: {
