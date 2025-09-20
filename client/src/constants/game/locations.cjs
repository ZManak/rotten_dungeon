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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "cjs", { value: true });
exports.GAME_SUBLOCATIONS = exports.GAME_LOCATIONS = exports.TimeOfDay = exports.WeatherCondition = exports.LocationDifficulty = exports.LocationType = void 0;
exports.getGameLocations = getGameLocations;
exports.distributeItemsAndEntities = distributeItemsAndEntities;
var locations_1 = require("../../utils/game/locations.cjs");
var LocationType;
(function (LocationType) {
    LocationType["SAFE_ZONE"] = "safe_zone";
    LocationType["DUNGEON"] = "dungeon";
    LocationType["WILDERNESS"] = "wilderness";
    LocationType["TOWN"] = "town";
    LocationType["BOSS_AREA"] = "boss_area";
    LocationType["PVP_AREA"] = "pvp_area";
    LocationType["INSTANCED_AREA"] = "instanced_area";
})(LocationType || (exports.LocationType = LocationType = {}));
var LocationDifficulty;
(function (LocationDifficulty) {
    LocationDifficulty[LocationDifficulty["PEACEFUL"] = 0] = "PEACEFUL";
    LocationDifficulty[LocationDifficulty["EASY"] = 1] = "EASY";
    LocationDifficulty[LocationDifficulty["NORMAL"] = 2] = "NORMAL";
    LocationDifficulty[LocationDifficulty["HARD"] = 3] = "HARD";
    LocationDifficulty[LocationDifficulty["ELITE"] = 4] = "ELITE";
    LocationDifficulty[LocationDifficulty["LEGENDARY"] = 5] = "LEGENDARY";
})(LocationDifficulty || (exports.LocationDifficulty = LocationDifficulty = {}));
// Weather Conditions
var WeatherCondition;
(function (WeatherCondition) {
    WeatherCondition["CLEAR"] = "clear";
    WeatherCondition["RAIN"] = "rain";
    WeatherCondition["STORM"] = "storm";
    WeatherCondition["FOG"] = "fog";
    WeatherCondition["SNOW"] = "snow";
    WeatherCondition["WIND"] = "wind";
})(WeatherCondition || (exports.WeatherCondition = WeatherCondition = {}));
// Time of Day
var TimeOfDay;
(function (TimeOfDay) {
    TimeOfDay["DAWN"] = "dawn";
    TimeOfDay["DAY"] = "day";
    TimeOfDay["DUSK"] = "dusk";
    TimeOfDay["NIGHT"] = "night";
})(TimeOfDay || (exports.TimeOfDay = TimeOfDay = {}));
// Game World Locations
// Game World Locations
exports.GAME_LOCATIONS = {
    // STARTER AREAS
    undead_asylum: {
        id: 'undead_asylum',
        name: 'Undead Asylum',
        description: 'A dark and gloomy asylum for the undead.',
        flavorText: 'The air is thick with the scent of decay and despair. Shadows dance on the walls, and the distant wails of lost souls echo through the halls.',
        type: LocationType.DUNGEON,
        difficulty: LocationDifficulty.EASY,
        recommendedLevel: { min: 1, max: 5 },
        imageUrl: 'https://i.ibb.co/5W6V5kS/undead-asylum.jpg',
        music: 'undead_asylum',
        ambientSound: ['undead_asylum_ambient'],
        weather: [WeatherCondition.RAIN, WeatherCondition.WIND],
        entities: [
            { id: 'peaceful_undead', name: 'Undead', type: 'passive', spawnChance: 1, respawnTime: 60, maxCount: 5 },
            { id: 'undead', name: 'Undead', type: 'hostile', level: 1, spawnChance: 1, respawnTime: 30, maxCount: 2 },
            { id: 'assylum_guard', name: 'Demonic Guard', type: 'unique', level: 3, spawnChance: 1, maxCount: 1 },
        ],
        items: [
            { id: 'undead_asylum_key', name: 'Undead Asylum Key', type: 'treasure', requirements: { questCompleted: ['undead_asylum_key'] },
                rarity: 'common',
                dropChance: 1 },
        ],
        connections: ['undead_asylum_cell', 'undead_asylum_corridor', 'undead_asylum_hall', 'undead_asylum_courtyard'],
        allowsRest: false,
        allowsPvp: true,
        allowsTrade: true,
        isInstanced: true,
        maxPlayers: 5,
        onEnter: ['undead_asylum_on_enter'],
        questGivers: ['undead_asylum_quest_giver'],
        createdAt: new Date(),
        updatedAt: new Date(),
        discoveredBy: [],
        isActive: true,
    },
    ruined_village: {
        id: 'ruined_village',
        name: 'Crumbling Village',
        description: 'A desolate village that has been overrun by docile wolfs.',
        flavorText: 'The village is crumbling, and the wolfs are taking over. They are peaceful, but their presence is unsettling.',
        type: LocationType.TOWN,
        difficulty: LocationDifficulty.EASY,
        recommendedLevel: { min: 1, max: 5 },
        weather: [WeatherCondition.RAIN, WeatherCondition.FOG],
        entities: [
            { id: 'peaceful_wolf', name: 'Wolf', type: 'passive', spawnChance: 1, respawnTime: 60, maxCount: 4 },
            { id: 'wolf_priestess', name: 'Wolf Priestess', type: 'unique', level: 3, spawnChance: 1, maxCount: 1 },
        ],
        items: [
            { id: 'ruined_village_church_key', name: 'Wolf Church Key', type: 'treasure', requirements: { questCompleted: ['ruined_village_key'] },
                rarity: 'common',
                dropChance: 1 },
        ],
        connections: ['ruined_village_plaza', 'ruined_village_outskirts', 'ruined_village_graveyard', 'ruined_village_church'],
        allowsRest: false,
        allowsPvp: true,
        allowsTrade: true,
        isInstanced: true,
        maxPlayers: 20,
        questGivers: ['ruined_village_quest_giver'],
        createdAt: new Date(),
        updatedAt: new Date(),
        discoveredBy: [],
        isActive: true,
    },
};
exports.GAME_SUBLOCATIONS = {
    undead_asylum_cell: (0, locations_1.createSublocation)(__assign({}, exports.GAME_LOCATIONS['undead_asylum']), {
        id: 'cell',
        name: 'Asylum Cell',
        description: 'A small, dark cell where prisoners were kept.',
        flavorText: 'The cell is damp and cold. The walls are covered in scratches and graffiti from past inmates.',
        entities: [
            { id: 'imprisoned_undead', name: 'Imprisoned Undead', type: 'passive', spawnChance: 1, respawnTime: 60, maxCount: 2 },
            { id: 'cell_guard', name: 'Cell Guard', type: 'hostile', level: 2, spawnChance: 1, respawnTime: 30, maxCount: 1 },
        ],
        items: [
            { id: 'rusty_key', name: 'Rusty Key', type: 'treasure', rarity: 'common', dropChance: 1 },
            { id: 'old_note', name: 'Old Note', type: 'quest', rarity: 'uncommon', dropChance: 0.3 },
        ],
    }),
    ruined_village_plaza: (0, locations_1.createSublocation)(__assign({}, exports.GAME_LOCATIONS['ruined_village']), {
        id: 'plaza',
        name: 'Plaza',
        description: 'The main square of the village.',
        flavorText: 'Ruined central square of the village, overgrown with wolfs.',
        entities: [
            { id: 'wolf', name: 'Wolf', type: 'hostile', level: 1, spawnChance: 1, respawnTime: 30, maxCount: 2 },
        ],
        items: [
            { id: 'wolf_fur', name: 'Wolf Fur', type: 'treasure', rarity: 'common', dropChance: 0.5 },
            { id: 'wolf_tooth', name: 'Wolf Tooth', type: 'quest', rarity: 'uncommon', dropChance: 0.3 },
        ]
    }),
};
function getGameLocations() {
    return __spreadArray(__spreadArray([], Object.values(exports.GAME_LOCATIONS), true), Object.values(exports.GAME_SUBLOCATIONS), true);
}
function distributeItemsAndEntities(parent) {
    if (!parent.sublocations || parent.sublocations.length === 0) {
        return parent;
    }
    var distribute = function (items, entities, sublocations) {
        items.forEach(function (item) {
            var randomIndex = Math.floor(Math.random() * sublocations.length);
            sublocations[randomIndex].items = sublocations[randomIndex].items || [];
            sublocations[randomIndex].items.push(item);
        });
        entities.forEach(function (entity) {
            var randomIndex = Math.floor(Math.random() * sublocations.length);
            sublocations[randomIndex].entities = sublocations[randomIndex].entities || [];
            sublocations[randomIndex].entities.push(entity);
        });
    };
    var updatedSublocations = parent.sublocations.map(function (sublocation) { return (__assign(__assign({}, sublocation), { items: [], entities: [] })); });
    distribute(parent.items, parent.entities, updatedSublocations);
    return __assign(__assign({}, parent), { items: [], entities: [], sublocations: updatedSublocations });
}
// Example usage
var locations = getGameLocations();
var distributedLocations = locations.map(distributeItemsAndEntities);
console.log(distributedLocations);
