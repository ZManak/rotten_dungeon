import React, { useState, useMemo } from "react";
import { Search, Sword, Shield, X, Grid3X3, List, Filter } from "lucide-react";
import { Weapon, GAME_WEAPONS, WeaponRarity, WeaponCategory } from "../../constants/game/weapons_db";
import { getRarityStyle } from "../../utils/game/utils_weapons";
import { DEFAULT_PLAYER, Player } from "../game/Player";
import  WeaponCard  from "../../components/layout/WeaponCard";
import  WeaponModal  from "../../components/layout/WeapoModal";

interface PlayerStatsPanelProps {
  playerStats: Player["stats"];
  setPlayerStats: React.Dispatch<React.SetStateAction<Player["stats"]>>;
}

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

// Enhanced Player Stats Panel

const PlayerStatsPanel = ({ playerStats, setPlayerStats }) => {
    const handleStatChange = (stat, value) => {
      setPlayerStats({
        ...playerStats,
        [stat]: value,
      });
    };

    const handleResetStats = () => {
      setPlayerStats(DEFAULT_PLAYER.stats);
    };

  return (
    <>
    <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700/50">
      <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-3">
        <Shield className="w-6 h-6 text-blue-400" />
        Player Statistics
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <label className="text-green-400 text-sm font-bold uppercase tracking-wide">
            Strength
          </label>
          <input
            type="number"
            value={playerStats.str}
            onChange={(e) =>
              setPlayerStats({
                ...playerStats,
                str: parseInt(e.target.value) || 0,
              })
            }
            className="w-full bg-gray-900/60 text-white p-3 rounded-lg border border-gray-600/50 
                     focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all
                     text-lg font-semibold"
            min="0"
            max="99"
          />
        </div>
        <div className="space-y-2">
          <label className="text-yellow-400 text-sm font-bold uppercase tracking-wide">
            Dexterity
          </label>
          <input
            type="number"
            value={playerStats.dex}
            onChange={(e) =>
              setPlayerStats({
                ...playerStats,
                dex: parseInt(e.target.value) || 0,
              })
            }
            className="w-full bg-gray-900/60 text-white p-3 rounded-lg border border-gray-600/50 
                     focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all
                     text-lg font-semibold"
            min="0"
            max="99"
          />
        </div>
        <div className="space-y-2">
          <label className="text-blue-400 text-sm font-bold uppercase tracking-wide">
            Intelligence
          </label>
          <input
            type="number"
            value={playerStats.int}
            onChange={(e) =>
              setPlayerStats({
                ...playerStats,
                int: parseInt(e.target.value) || 0,
              })
            }
            className="w-full bg-gray-900/60 text-white p-3 rounded-lg border border-gray-600/50 
                     focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all
                     text-lg font-semibold"
            min="0"
            max="99"
          />
        </div>
        <div className="space-y-2">
          <label className="text-purple-400 text-sm font-bold uppercase tracking-wide">
            Faith
          </label>
          <input
            type="number"
            value={playerStats.fai}
            onChange={(e) =>
              setPlayerStats({
                ...playerStats,
                fai: parseInt(e.target.value) || 0,
              })
            }
            className="w-full bg-gray-900/60 text-white p-3 rounded-lg border border-gray-600/50 
                     focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all
                     text-lg font-semibold"
            min="0"
            max="99"
          />
        </div>
      </div>
    </div>
    </>
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
    return Object.values(GAME_WEAPONS).filter((weapon) => {
      const matchesSearch =
        weapon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        weapon.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || weapon.category === selectedCategory;
      const matchesRarity =
        selectedRarity === "all" || weapon.rarity === selectedRarity;

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
                {Object.entries(WeaponCategory).map(([key, value]) => (
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
                {Object.entries(WeaponRarity).map(([key, value]) => (
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
              weapon={weapon}                           
              playerStats={playerStats}
              onClick={setSelectedWeapon}
              isCompact={viewMode === "list"}
            />
          ))}
        </div>

        {filteredWeapons.length === 0 && (
          <div className="text-center text-gray-400 py-20">
            <Sword className="w-16 h-16 mx-auto mb-6 opacity-30" />
            <p className="text-2xl mb-2">No weapons found</p>
            <p className="text-lg opacity-70">
              Try adjusting your search criteria
            </p>
          </div>
        )}

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
export { WeaponCard, WeaponModal, PlayerStatsPanel };