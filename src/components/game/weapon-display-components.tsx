import React, { useState, useMemo } from "react";
import { Search, Sword, Shield, X, Grid3X3, List, Filter } from "lucide-react";
import { Weapon } from "../../constants/game/weapons_db";
import { getRarityStyle } from "../../utils/game/utils_weapons";
import { Player } from "./Player";

// Mock data and utilities (keeping your existing structure)
const WEAPON_CATEGORIES = {
  SWORD: "sword",
  PAIRED_SWORDS: "paired_swords",
  STAFF: "staff",
  CROSSBOW: "crossbow",
  DAGGER: "dagger",
  AXE: "axe",
  BOW: "bow",
  WAND: "wand",
};

const WEAPON_RARITIES = {
  COMMON: { name: "common", color: "text-gray-400", bg: "bg-gray-900/30" },
  UNCOMMON: {
    name: "uncommon",
    color: "text-green-400",
    bg: "bg-green-900/20",
  },
  RARE: { name: "rare", color: "text-blue-400", bg: "bg-blue-900/20" },
  EPIC: { name: "epic", color: "text-purple-400", bg: "bg-purple-900/20" },
  LEGENDARY: {
    name: "legendary",
    color: "text-yellow-400",
    bg: "bg-yellow-900/20",
  },
  ARTIFACT: { name: "artifact", color: "text-red-400", bg: "bg-red-900/20" },
};

const MOCK_WEAPONS = [
  {
    id: "poison_heavy_paired_swords",
    name: "Poison Heavy Paired Swords",
    description:
      "Twin blades coated with a deadly toxin that seeps into wounds.",
    flavorText:
      "Forged by assassins, these blades drip with malevolent poison.",
    category: WEAPON_CATEGORIES.PAIRED_SWORDS,
    rarity: WEAPON_RARITIES.RARE,
    tags: ["dual_wield", "poison", "assassin", "paired"],
    attackRating: { base: 79 },
    hitChance: 60,
    critChance: 10,
    critMultiplier: 1.2,
    attackPattern: {
      hits: 2,
      targets: { min: 1, max: 2 },
      hitsPerTarget: { min: 1, max: 2 },
    },
    requirements: { str: 15, dex: 10, int: 0, fai: 0 },
    scaling: { str: 0.89, dex: 0.55 },
    effects: [
      {
        name: "Poison",
        description:
          "Take 6 damage every action. Lasts 31 actions. Applied to target on crit",
        type: "poison",
        damagePerAction: 6,
        duration: 31,
      },
    ],
    value: 730,
    weight: 6.5,
    enhancementLevel: 3,
  },
  {
    id: "dragonslayer_greatsword",
    name: "Dragonslayer Greatsword",
    description: "A massive blade forged from dragon scale and blessed steel.",
    flavorText: "This weapon has tasted the blood of ancient wyrms.",
    category: WEAPON_CATEGORIES.SWORD,
    rarity: WEAPON_RARITIES.LEGENDARY,
    tags: ["two_handed", "dragon_slayer", "blessed", "massive"],
    attackRating: { base: 180 },
    hitChance: 75,
    critChance: 15,
    critMultiplier: 2.5,
    attackPattern: {
      hits: 1,
      targets: { min: 1, max: 3 },
      hitsPerTarget: { min: 1, max: 1 },
    },
    requirements: { str: 35, dex: 12, fai: 15, level: 20 },
    scaling: { str: 0.95, fai: 0.3 },
    effects: [
      {
        name: "Dragon Bane",
        description: "Deals massive damage to draconic creatures.",
        type: "buff",
      },
      {
        name: "Holy Fire",
        description: "Burns undead with sacred flames.",
        type: "burn",
        damagePerAction: 25,
        duration: 5,
      },
    ],
    value: 15000,
    weight: 25,
    enhancementLevel: 7,
    isUnique: true,
  },
  {
    id: "staff_of_frost",
    name: "Staff of Eternal Frost",
    description: "A crystalline staff that radiates bone-chilling cold.",
    flavorText: "Ice crystals form in the air around this ancient weapon.",
    category: WEAPON_CATEGORIES.STAFF,
    rarity: WEAPON_RARITIES.EPIC,
    tags: ["magic", "ice", "two_handed", "crystalline"],
    attackRating: { base: 45 },
    hitChance: 90,
    critChance: 25,
    critMultiplier: 1.8,
    attackPattern: {
      hits: 1,
      targets: { min: 1, max: 5 },
      hitsPerTarget: { min: 1, max: 1 },
    },
    requirements: { int: 25, str: 8, level: 15 },
    scaling: { int: 0.85, fai: 0.2 },
    effects: [
      {
        name: "Freeze",
        description: "Slows enemy actions with intense cold.",
        type: "freeze",
        duration: 3,
      },
    ],
    value: 3500,
    weight: 4.8,
    enhancementLevel: 5,
  },
];

// Utility functions
const calculateScalingBonus = (weapon: Weapon, playerStats) => {
  let bonusDamage = 0;
  if (weapon.scaling.str && playerStats.str) {
    bonusDamage += Math.floor(playerStats.str * weapon.scaling.str);
  }
  if (weapon.scaling.dex && playerStats.dex) {
    bonusDamage += Math.floor(playerStats.dex * weapon.scaling.dex);
  }
  if (weapon.scaling.int && playerStats.int) {
    bonusDamage += Math.floor(playerStats.int * weapon.scaling.int);
  }
  if (weapon.scaling.fai && playerStats.fai) {
    bonusDamage += Math.floor(playerStats.fai * weapon.scaling.fai);
  }
  return bonusDamage;
};

const calculateTotalAttackRating = (weapon: Weapon, playerStats) => {
  const base = weapon.attackRating.base;
  const bonus = calculateScalingBonus(weapon, playerStats);
  const total = base + bonus;
  return { base, bonus, total };
};

// Enhanced Weapon Card Component with better styling
const WeaponCard = ({
  weapon,
  playerStats,
  onClick,
  isCompact,
}: {
  weapon: Weapon;
  playerStats: {
    str?: number;
    dex?: number;
    int?: number;
    fai?: number;
  };
  onClick: any;
  isCompact?: boolean;
}) => {
  const attackRating = calculateTotalAttackRating(weapon, playerStats);

  if (isCompact) {
    return (
      <div
        className={`bg-${getRarityStyle(weapon.rarity)} border-2 border-gray-700/50 rounded-xl p-4 cursor-pointer 
                   hover:border-gray-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-200
                   backdrop-blur-sm bg-gray-800/40`}
        onClick={() => onClick(weapon)}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className={`font-bold text-lg ${getRarityStyle(weapon.rarity)} truncate`}>
              {weapon.name}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2 mt-1">
              {weapon.description}
            </p>
          </div>
          <div className="flex items-center gap-3 ml-4">
            {weapon.enhancementLevel > 0 && (
              <span className="text-yellow-400 font-bold text-lg">
                +{weapon.enhancementLevel}
              </span>
            )}
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {attackRating.total}
              </div>
              <div className="text-xs text-gray-400">Total AR</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-${weapon.rarity.bg} border-2 border-gray-700/50 rounded-xl p-6 cursor-pointer 
                 hover:border-gray-500 hover:shadow-xl hover:scale-105 transition-all duration-200
                 backdrop-blur-sm bg-gray-800/40 group`}
      onClick={() => onClick(weapon)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3
            className={`font-bold text-xl ${getRarityStyle(weapon.rarity)} mb-2 group-hover:text-white transition-colors`}
          >
            {weapon.name}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            {weapon.description}
          </p>
          {weapon.flavorText && (
            <p className="text-gray-500 italic text-sm">
              "{weapon.flavorText}"
            </p>
          )}
        </div>
        {weapon.enhancementLevel > 0 && (
          <div className="bg-yellow-500/20 text-yellow-400 font-bold px-3 py-1 rounded-lg ml-4">
            +{weapon.enhancementLevel}
          </div>
        )}
      </div>

      {/* Combat Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-900/40 rounded-lg p-3 text-center border border-gray-700/30">
          <div className="text-cyan-400 text-xs font-semibold uppercase tracking-wide mb-1">
            Hit Chance
          </div>
          <div className="text-white text-lg font-bold">
            {weapon.hitChance}%
          </div>
        </div>
        <div className="bg-gray-900/40 rounded-lg p-3 text-center border border-gray-700/30">
          <div className="text-purple-400 text-xs font-semibold uppercase tracking-wide mb-1">
            Crit Chance
          </div>
          <div className="text-white text-lg font-bold">
            {weapon.critChance}%
          </div>
        </div>
      </div>

      {/* Requirements and Scaling */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <div className="text-yellow-400 text-sm font-bold mb-3 uppercase tracking-wide">
            Requirements
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-green-400 text-sm">STR</span>
              <span className="text-white font-semibold">
                {weapon.requirements.str || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-yellow-400 text-sm">DEX</span>
              <span className="text-white font-semibold">
                {weapon.requirements.dex || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-400 text-sm">INT</span>
              <span className="text-white font-semibold">
                {weapon.requirements.int || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-400 text-sm">FAI</span>
              <span className="text-white font-semibold">
                {weapon.requirements.fai || 0}
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="text-yellow-400 text-sm font-bold mb-3 uppercase tracking-wide">
            Scaling
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">STR</span>
              <span className="text-white font-semibold">
                {Math.round((weapon.scaling.str || 0) * 100)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">DEX</span>
              <span className="text-white font-semibold">
                {Math.round((weapon.scaling.dex || 0) * 100)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">INT</span>
              <span className="text-white font-semibold">
                {Math.round((weapon.scaling.int || 0) * 100)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">FAI</span>
              <span className="text-white font-semibold">
                {Math.round((weapon.scaling.fai || 0) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-center text-sm pt-4 border-t border-gray-700/50">
        <div className="text-gray-400">
          <span className="text-yellow-400 font-semibold">{weapon.value}</span>{" "}
          Gold
        </div>
        <div className="text-gray-400">
          Weight: <span className="text-white">{weapon.weight}</span>
        </div>
      </div>
    </div>
  );
};

// Enhanced Player Stats Panel
const PlayerStatsPanel = ({ playerStats, setPlayerStats }) => {
  return (
    <div className="stats-panel bg-black border-2 border-[#00ffcc] p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
      {["str", "dex", "int", "fai"].map((stat) => (
        <div key={stat}>
          <label className="text-[#00ffcc]">{stat.toUpperCase()}</label>
          <input
            type="number"
            value={playerStats[stat]}
            onChange={(e) =>
              setPlayerStats({
                ...playerStats,
                [stat]: parseInt(e.target.value) || 0,
              })
            }
            className="w-full bg-[#111] text-white border border-[#00ffcc] p-1 mt-1"
            min="0"
            max="99"
          />
        </div>
      ))}
    </div>
  );
};

// Enhanced Weapon Modal (keeping your existing structure but with better styling)
const WeaponModal = ( weapon: Weapon, playerStats: Player['stats'], onClose : () => void ) => {
  if (!weapon) return null;

  const attackRating = calculateTotalAttackRating(weapon, playerStats);

  return (
    <div className="weapon-modal fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 font-mono text-xs">
  <div className="bg-[#000] border-4 border-yellow-400 p-6 max-w-xl w-full shadow-2xl">
    <h2 className="text-red-400 text-lg mb-2">{weapon.name}</h2>
    <p className="text-gray-300 mb-2">{weapon.description}</p>
    <p className="italic text-gray-500 mb-4">"{weapon.flavorText}"</p>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="text-green-400">ATK</label>
        <div className="text-white">{attackRating.total}</div>
      </div>
      <div>
        <label className="text-purple-400">Crit</label>
        <div className="text-white">{weapon.critChance}%</div>
      </div>
    </div>

    <div className="text-yellow-400 mb-2">Effects:</div>
    {weapon.effects?.map(effect => ( <div key={effect.name} className="mb-2">
        <span className="text-green-400 font-bold">{effect.name}</span>
        <p className="text-gray-300 ml-2">{effect.description}</p>
      </div>
    ))}

    <button onClick={onClose} className="rpg-button mt-4">Close</button>
  </div>
</div>
  );
};

// Main Component with enhanced styling
const WeaponBrowser = () => {
  const [playerStats, setPlayerStats] = useState({
    str: 26,
    dex: 20,
    int: 8,
    fai: 5,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRarity, setSelectedRarity] = useState("all");
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  const filteredWeapons = useMemo(() => {
    return MOCK_WEAPONS.filter((weapon) => {
      const matchesSearch =
        weapon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        weapon.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || weapon.category === selectedCategory;
      const matchesRarity =
        selectedRarity === "all" || weapon.rarity.name === selectedRarity;

      return matchesSearch && matchesCategory && matchesRarity;
    });
  }, [searchTerm, selectedCategory, selectedRarity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="max-w-7xl mx-auto p-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent flex items-center justify-center gap-4">
            <Sword className="w-12 h-12 text-yellow-400" />
            Weapon Arsenal
          </h1>
          <p className="text-gray-400 text-xl">
            Discover and compare legendary weapons
          </p>
        </div>

        <PlayerStatsPanel
          playerStats={playerStats}
          setPlayerStats={setPlayerStats}
        />

        {/* Enhanced Filters */}
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700/50">
          <div className="flex flex-wrap gap-6 items-center">
            {/* Search */}
            <div className="flex-1 min-w-80">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search weapons by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-900/60 text-white pl-12 pr-4 py-3 rounded-lg border border-gray-600/50 
                           focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all
                           placeholder-gray-500 text-lg"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-900/60 text-white px-4 py-3 rounded-lg border border-gray-600/50 
                         focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all
                         text-lg min-w-40"
              >
                <option value="all">All Categories</option>
                {Object.entries(WEAPON_CATEGORIES).map(([key, value]) => (
                  <option key={key} value={value}>
                    {key.replace("_", " ")}
                  </option>
                ))}
              </select>

              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="bg-gray-900/60 text-white px-4 py-3 rounded-lg border border-gray-600/50 
                         focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all
                         text-lg min-w-36"
              >
                <option value="all">All Rarities</option>
                {Object.entries(WEAPON_RARITIES).map(([key, value]) => (
                  <option key={key} value={value.name}>
                    {key}
                  </option>
                ))}
              </select>

              <div className="flex gap-2 bg-gray-900/60 p-2 rounded-lg border border-gray-600/50">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                  title="Grid View"
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                  title="List View"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-gray-400 text-lg mb-6 text-center">
          <span className="font-semibold text-white">
            {filteredWeapons.length}
          </span>{" "}
          weapon{filteredWeapons.length !== 1 ? "s" : ""} found
        </div>

        {/* Weapons Display */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }
        >
          {filteredWeapons.map((weapon) => (
            <WeaponCard
              key={weapon.id}
              weapon={weapon as unknown as Weapon}
              playerStats={playerStats}
              onClick={setSelectedWeapon}
              isCompact={viewMode === "list"}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWeapons.map((weapon: any) => {
          return (
            
            <WeaponCard
              key={weapon.id}
              weapon={weapon}
              playerStats={playerStats}
              onClick={setSelectedWeapon}
              isCompact={viewMode === "list"}
            />
          );
        }
        )}
        </div>
          
          {/* Weapon Modal */}
          {selectedWeapon && (
            <WeaponModal
              weapon={selectedWeapon}
              playerStats={playerStats}
              onClose={() => setSelectedWeapon(null)}
            />
          )}
      </div>
  );
};

export default WeaponBrowser;
export { WeaponCard, WeaponModal, PlayerStatsPanel };