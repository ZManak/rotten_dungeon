import React, { useState, useMemo } from 'react';
import { Search, Filter, Sword, Shield, Zap, Star, TrendingUp, Eye, X } from 'lucide-react';

// Mock data based on the weapons system
const WEAPON_CATEGORIES = {
  SWORD: 'sword',
  PAIRED_SWORDS: 'paired_swords',
  STAFF: 'staff',
  CROSSBOW: 'crossbow',
  DAGGER: 'dagger',
  AXE: 'axe',
  BOW: 'bow',
  WAND: 'wand'
};

const WEAPON_RARITIES = {
  COMMON: { name: 'common', color: 'text-gray-400', bg: 'bg-gray-900' },
  UNCOMMON: { name: 'uncommon', color: 'text-green-400', bg: 'bg-green-900' },
  RARE: { name: 'rare', color: 'text-blue-400', bg: 'bg-blue-900' },
  EPIC: { name: 'epic', color: 'text-purple-400', bg: 'bg-purple-900' },
  LEGENDARY: { name: 'legendary', color: 'text-yellow-400', bg: 'bg-yellow-900' },
  ARTIFACT: { name: 'artifact', color: 'text-red-400', bg: 'bg-red-900' }
};

const MOCK_WEAPONS = [
  {
    id: 'poison_heavy_paired_swords',
    name: 'Poison Heavy Paired Swords',
    description: 'Twin blades coated with a deadly toxin that seeps into wounds.',
    flavorText: 'Forged by assassins, these blades drip with malevolent poison.',
    category: WEAPON_CATEGORIES.PAIRED_SWORDS,
    rarity: WEAPON_RARITIES.RARE,
    tags: ['dual_wield', 'poison', 'assassin', 'paired'],
    attackRating: { base: 79 },
    hitChance: 60,
    critChance: 10,
    critMultiplier: 1.20,
    attackPattern: { hits: 2, targets: { min: 1, max: 2 }, hitsPerTarget: { min: 1, max: 2 } },
    requirements: { str: 15, dex: 10, int: 0, fai: 0 },
    scaling: { str: 0.89, dex: 0.55 },
    effects: [{
      name: 'Poison',
      description: 'Take 6 damage every action. Lasts 31 actions. Applied to target on crit',
      type: 'poison',
      damagePerAction: 6,
      duration: 31
    }],
    value: 730,
    weight: 6.5,
    enhancementLevel: 3
  },
  {
    id: 'dragonslayer_greatsword',
    name: 'Dragonslayer Greatsword',
    description: 'A massive blade forged from dragon scale and blessed steel.',
    flavorText: 'This weapon has tasted the blood of ancient wyrms.',
    category: WEAPON_CATEGORIES.SWORD,
    rarity: WEAPON_RARITIES.LEGENDARY,
    tags: ['two_handed', 'dragon_slayer', 'blessed', 'massive'],
    attackRating: { base: 180 },
    hitChance: 75,
    critChance: 15,
    critMultiplier: 2.5,
    attackPattern: { hits: 1, targets: { min: 1, max: 3 }, hitsPerTarget: { min: 1, max: 1 } },
    requirements: { str: 35, dex: 12, fai: 15, level: 20 },
    scaling: { str: 0.95, fai: 0.30 },
    effects: [
      {
        name: 'Dragon Bane',
        description: 'Deals massive damage to draconic creatures.',
        type: 'buff'
      },
      {
        name: 'Holy Fire',
        description: 'Burns undead with sacred flames.',
        type: 'burn',
        damagePerAction: 25,
        duration: 5
      }
    ],
    value: 15000,
    weight: 25,
    enhancementLevel: 7,
    isUnique: true
  },
  {
    id: 'staff_of_frost',
    name: 'Staff of Eternal Frost',
    description: 'A crystalline staff that radiates bone-chilling cold.',
    flavorText: 'Ice crystals form in the air around this ancient weapon.',
    category: WEAPON_CATEGORIES.STAFF,
    rarity: WEAPON_RARITIES.EPIC,
    tags: ['magic', 'ice', 'two_handed', 'crystalline'],
    attackRating: { base: 45 },
    hitChance: 90,
    critChance: 25,
    critMultiplier: 1.8,
    attackPattern: { hits: 1, targets: { min: 1, max: 5 }, hitsPerTarget: { min: 1, max: 1 } },
    requirements: { int: 25, str: 8, level: 15 },
    scaling: { int: 0.85, fai: 0.20 },
    effects: [{
      name: 'Freeze',
      description: 'Slows enemy actions with intense cold.',
      type: 'freeze',
      duration: 3
    }],
    value: 3500,
    weight: 4.8,
    enhancementLevel: 5
  }
];

// Utility functions
const calculateScalingBonus = (weapon, playerStats) => {
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

const calculateTotalAttackRating = (weapon, playerStats) => {
  const base = weapon.attackRating.base;
  const bonus = calculateScalingBonus(weapon, playerStats);
  const total = base + bonus;
  return { base, bonus, total };
};

// Enhanced Weapon Card Component
const WeaponCard = ({ weapon, playerStats, onClick, isCompact = false }) => {
  const attackRating = calculateTotalAttackRating(weapon, playerStats);
  const rarity = weapon.rarity;

  if (isCompact) {
    return (
      <div 
        className={`${rarity.bg} border border-gray-700 rounded-lg p-3 cursor-pointer hover:border-gray-500 transition-all`}
        onClick={() => onClick(weapon)}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className={`font-semibold text-sm ${rarity.color}`}>{weapon.name}</h3>
          <div className="flex items-center gap-1">
            {weapon.enhancementLevel > 0 && (
              <span className="text-yellow-400 text-xs">+{weapon.enhancementLevel}</span>
            )}
            <TrendingUp className="w-3 h-3 text-gray-400" />
          </div>
        </div>
        <div className="text-xl font-bold text-white mb-1">
          {attackRating.base} + {attackRating.bonus}
        </div>
        <div className="text-sm text-gray-400">
          Total AR: {attackRating.total}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`${rarity.bg} border border-gray-700 rounded-lg p-6 cursor-pointer hover:border-gray-500 transition-all hover:scale-105`}
      onClick={() => onClick(weapon)}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className={`font-bold text-lg ${rarity.color} mb-1`}>{weapon.name}</h3>
          <p className="text-gray-400 text-sm mb-2">{weapon.description}</p>
        </div>
        {weapon.enhancementLevel > 0 && (
          <span className="text-yellow-400 font-semibold">+{weapon.enhancementLevel}</span>
        )}
      </div>

      {/* Attack Rating */}
      <div className="mb-4">
        <div className="text-white text-sm mb-1">ATK RATING</div>
        <div className="text-red-400 text-xl font-bold">
          {weapon.category.includes('slash') ? 'slash: ' : ''}{attackRating.base}
        </div>
        <div className="text-green-400 text-sm">
          [{attackRating.base} + {attackRating.bonus}]
        </div>
        <div className="text-teal-400 text-lg font-semibold">
          Total AR: {attackRating.total}
        </div>
      </div>

      {/* Combat Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="text-cyan-400">Hit Chance:</span> {weapon.hitChance}%
        </div>
        <div>
          <span className="text-orange-400">Hits:</span> {weapon.attackPattern.hits}
        </div>
        <div>
          <span className="text-purple-400">Crit Chance:</span> {weapon.critChance}%
        </div>
        <div>
          <span className="text-pink-400">Targets:</span> {weapon.attackPattern.targets.min}-{weapon.attackPattern.targets.max}
        </div>
        <div>
          <span className="text-yellow-400">Crit Mult:</span> {weapon.critMultiplier}
        </div>
        <div>
          <span className="text-blue-400">Hits/Target:</span> {weapon.attackPattern.hitsPerTarget.min}-{weapon.attackPattern.hitsPerTarget.max}
        </div>
      </div>

      {/* Requirements and Scaling */}
      <div className="flex gap-8 mb-4">
        <div>
          <div className="text-yellow-400 text-sm font-semibold mb-1">REQS</div>
          <div className="text-green-400 text-sm">str {weapon.requirements.str}</div>
          <div className="text-yellow-400 text-sm">dex {weapon.requirements.dex}</div>
          <div className="text-blue-400 text-sm">int {weapon.requirements.int || 0}</div>
          <div className="text-purple-400 text-sm">fai {weapon.requirements.fai || 0}</div>
        </div>
        <div>
          <div className="text-yellow-400 text-sm font-semibold mb-1">SCALING</div>
          <div className="text-white text-sm">{Math.round((weapon.scaling.str || 0) * 100)}%</div>
          <div className="text-white text-sm">{Math.round((weapon.scaling.dex || 0) * 100)}%</div>
          <div className="text-white text-sm">{Math.round((weapon.scaling.int || 0) * 100)}%</div>
          <div className="text-white text-sm">{Math.round((weapon.scaling.fai || 0) * 100)}%</div>
        </div>
      </div>

      {/* Effects */}
      {weapon.effects && weapon.effects.length > 0 && (
        <div className="mb-4">
          <div className="text-yellow-400 text-sm font-semibold mb-2">EFFECTS</div>
          {weapon.effects.map((effect, idx) => (
            <div key={idx} className="mb-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm font-semibold">{effect.name}</span>
              </div>
              <div className="text-gray-300 text-sm ml-4">
                {effect.description}
              </div>
              {effect.damagePerAction && (
                <div className="text-gray-400 text-xs ml-4">
                  ├ Take {effect.damagePerAction} damage every action.
                  {effect.duration && <span><br />└ Lasts {effect.duration} actions</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Value */}
      <div className="text-gray-400 text-sm">
        Value: {weapon.value}💰
      </div>
    </div>
  );
};

// Detailed Weapon Modal
const WeaponModal = ({ weapon, playerStats, onClose }) => {
  if (!weapon) return null;

  const attackRating = calculateTotalAttackRating(weapon, playerStats);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex justify-between items-start">
          <div>
            <h2 className={`text-2xl font-bold ${weapon.rarity.color} mb-2`}>{weapon.name}</h2>
            <p className="text-gray-300">{weapon.description}</p>
            {weapon.flavorText && (
              <p className="text-gray-500 italic mt-2">"{weapon.flavorText}"</p>
            )}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Detailed Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Attack Rating */}
            <div className={`${weapon.rarity.bg} p-4 rounded-lg`}>
              <h3 className="text-white font-semibold mb-3">ATK RATING</h3>
              <div className="text-red-400 text-2xl font-bold">
                slash: {attackRating.base}
              </div>
              <div className="text-green-400">
                [{attackRating.base} + {attackRating.bonus}]
              </div>
              <div className="text-teal-400 text-xl font-semibold mt-2">
                Total AR: {attackRating.total}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-yellow-400 font-semibold mb-3">REQS</h3>
              <div className="space-y-1">
                <div className="text-green-400">str {weapon.requirements.str}</div>
                <div className="text-yellow-400">dex {weapon.requirements.dex}</div>
                <div className="text-blue-400">int {weapon.requirements.int || 0}</div>
                <div className="text-purple-400">fai {weapon.requirements.fai || 0}</div>
                {weapon.requirements.level && (
                  <div className="text-white">lvl {weapon.requirements.level}</div>
                )}
              </div>
            </div>

            {/* Scaling */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-yellow-400 font-semibold mb-3">SCALING</h3>
              <div className="space-y-1">
                <div className="text-white">{Math.round((weapon.scaling.str || 0) * 100)}%</div>
                <div className="text-white">{Math.round((weapon.scaling.dex || 0) * 100)}%</div>
                <div className="text-white">{Math.round((weapon.scaling.int || 0) * 100)}%</div>
                <div className="text-white">{Math.round((weapon.scaling.fai || 0) * 100)}%</div>
              </div>
            </div>
          </div>

          {/* Combat Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 p-3 rounded text-center">
              <div className="text-cyan-400 text-sm">Hit Chance</div>
              <div className="text-white text-lg font-semibold">{weapon.hitChance}%</div>
            </div>
            <div className="bg-gray-800 p-3 rounded text-center">
              <div className="text-purple-400 text-sm">Crit Chance</div>
              <div className="text-white text-lg font-semibold">{weapon.critChance}%</div>
            </div>
            <div className="bg-gray-800 p-3 rounded text-center">
              <div className="text-yellow-400 text-sm">Crit Mult</div>
              <div className="text-white text-lg font-semibold">{weapon.critMultiplier}</div>
            </div>
            <div className="bg-gray-800 p-3 rounded text-center">
              <div className="text-orange-400 text-sm">Hits</div>
              <div className="text-white text-lg font-semibold">{weapon.attackPattern.hits}</div>
            </div>
          </div>

          {/* Effects */}
          {weapon.effects && weapon.effects.length > 0 && (
            <div className="bg-gray-800 p-4 rounded-lg mb-6">
              <h3 className="text-yellow-400 font-semibold mb-3">EFFECTS</h3>
              {weapon.effects.map((effect, idx) => (
                <div key={idx} className="mb-3 last:mb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 font-semibold">{effect.name}</span>
                  </div>
                  <div className="text-gray-300 ml-5 mb-2">{effect.description}</div>
                  {effect.damagePerAction && (
                    <div className="text-gray-400 text-sm ml-5">
                      ├ Take {effect.damagePerAction} damage every action.<br />
                      {effect.duration && `└ Lasts ${effect.duration} actions`}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Value:</span> <span className="text-white">{weapon.value}💰</span>
            </div>
            <div>
              <span className="text-gray-400">Weight:</span> <span className="text-white">{weapon.weight}</span>
            </div>
            <div>
              <span className="text-gray-400">Enhancement:</span> <span className="text-yellow-400">+{weapon.enhancementLevel}</span>
            </div>
            <div>
              <span className="text-gray-400">Category:</span> <span className="text-white">{weapon.category.replace('_', ' ')}</span>
            </div>
          </div>

          {/* Tags */}
          {weapon.tags && weapon.tags.length > 0 && (
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {weapon.tags.map(tag => (
                  <span key={tag} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                    {tag.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Player Stats Panel
const PlayerStatsPanel = ({ playerStats, setPlayerStats }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-6">
      <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
        <Shield className="w-4 h-4" />
        Player Stats
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="text-green-400 text-sm">STR</label>
          <input
            type="number"
            value={playerStats.str}
            onChange={(e) => setPlayerStats({...playerStats, str: parseInt(e.target.value) || 0})}
            className="w-full bg-gray-700 text-white p-2 rounded mt-1"
            min="0"
            max="99"
          />
        </div>
        <div>
          <label className="text-yellow-400 text-sm">DEX</label>
          <input
            type="number"
            value={playerStats.dex}
            onChange={(e) => setPlayerStats({...playerStats, dex: parseInt(e.target.value) || 0})}
            className="w-full bg-gray-700 text-white p-2 rounded mt-1"
            min="0"
            max="99"
          />
        </div>
        <div>
          <label className="text-blue-400 text-sm">INT</label>
          <input
            type="number"
            value={playerStats.int}
            onChange={(e) => setPlayerStats({...playerStats, int: parseInt(e.target.value) || 0})}
            className="w-full bg-gray-700 text-white p-2 rounded mt-1"
            min="0"
            max="99"
          />
        </div>
        <div>
          <label className="text-purple-400 text-sm">FAI</label>
          <input
            type="number"
            value={playerStats.fai}
            onChange={(e) => setPlayerStats({...playerStats, fai: parseInt(e.target.value) || 0})}
            className="w-full bg-gray-700 text-white p-2 rounded mt-1"
            min="0"
            max="99"
          />
        </div>
      </div>
    </div>
  );
};

// Main Weapon Browser Component
const WeaponBrowser = () => {
  const [playerStats, setPlayerStats] = useState({ str: 26, dex: 20, int: 8, fai: 5 });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const filteredWeapons = useMemo(() => {
    return MOCK_WEAPONS.filter(weapon => {
      const matchesSearch = weapon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          weapon.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || weapon.category === selectedCategory;
      const matchesRarity = selectedRarity === 'all' || weapon.rarity.name === selectedRarity;
      
      return matchesSearch && matchesCategory && matchesRarity;
    });
  }, [searchTerm, selectedCategory, selectedRarity]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Sword className="w-8 h-8 text-yellow-400" />
          Weapon Arsenal
        </h1>

        <PlayerStatsPanel playerStats={playerStats} setPlayerStats={setPlayerStats} />

        {/* Filters */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search weapons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded"
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              <option value="all">All Categories</option>
              {Object.entries(WEAPON_CATEGORIES).map(([key, value]) => (
                <option key={key} value={value}>{key.replace('_', ' ')}</option>
              ))}
            </select>

            {/* Rarity Filter */}
            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              <option value="all">All Rarities</option>
              {Object.entries(WEAPON_RARITIES).map(([key, value]) => (
                <option key={key} value={value.name}>{key}</option>
              ))}
            </select>

            {/* View Mode */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600' : 'bg-gray-700'}`}
              >
                <div className="w-4 h-4 bg-current rounded grid grid-cols-2 gap-0.5"></div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600' : 'bg-gray-700'}`}
              >
                <div className="w-4 h-4 bg-current rounded flex flex-col gap-0.5"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-gray-400 text-sm mb-4">
          {filteredWeapons.length} weapon{filteredWeapons.length !== 1 ? 's' : ''} found
        </div>

        {/* Weapons Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
        }>
          {filteredWeapons.map(weapon => (
            <WeaponCard
              key={weapon.id}
              weapon={weapon}
              playerStats={playerStats}
              onClick={setSelectedWeapon}
              isCompact={viewMode === 'list'}
            />
          ))}
        </div>

        {filteredWeapons.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <Sword className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No weapons match your search criteria.</p>
          </div>
        )}

        {/* Weapon Detail Modal */}
        {selectedWeapon && (
          <WeaponModal
            weapon={selectedWeapon}
            playerStats={playerStats}
            onClose={() => setSelectedWeapon(null)}
          />
        )}
      </div>
    </div>
  );
};

export default WeaponBrowser;