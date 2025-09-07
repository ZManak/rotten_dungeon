import React, { useState, useMemo } from "react";
import { Search, Sword, Shield, X } from "lucide-react";
import GAME_WEAPONS, {
  Weapon,
  WeaponRarity,
  WeaponCategory,
} from "../../constants/game/weapons_db";
import {
  calculateTotalAttackRating,
  getRarityStyle,
} from "../../utils/game/utils_weapons";
import WeaponCard from "./WeaponCard";
import { Player, DEFAULT_PLAYER } from "../game/Player";
import WeaponModal from "./WeapoModal";

// Player Stats Type
type PlayerStats = (typeof DEFAULT_PLAYER)["stats"];

// Detailed Weapon Modal


// Player Stats Panel
interface PlayerStatsPanelProps {
  playerStats: PlayerStats;
  setPlayerStats: (stats: PlayerStats) => void;
}

const PlayerStatsPanel = ({
  playerStats,
  setPlayerStats,
}: PlayerStatsPanelProps) => {
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
            onChange={(e) =>
              setPlayerStats({
                ...playerStats,
                str: parseInt(e.target.value) || 0,
              })
            }
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
            onChange={(e) =>
              setPlayerStats({
                ...playerStats,
                dex: parseInt(e.target.value) || 0,
              })
            }
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
            onChange={(e) =>
              setPlayerStats({
                ...playerStats,
                int: parseInt(e.target.value) || 0,
              })
            }
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
            onChange={(e) =>
              setPlayerStats({
                ...playerStats,
                fai: parseInt(e.target.value) || 0,
              })
            }
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
  const [searchTerm, setSearchTerm] = useState("");
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    str: 26,
    dex: 20,
    int: 8,
    fai: 5,
  });

  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    WeaponCategory | "all"
  >("all");
  const [selectedRarity, setSelectedRarity] = useState<WeaponRarity | "all">(
    "all"
  );
  const [viewMode, setViewMode] = useState("grid");

  const filteredWeapons: Weapon[] = useMemo(() => {
    const weaponsArray = Object.values(GAME_WEAPONS);

    return weaponsArray.filter((weapon: Weapon) => {
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
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Sword className="w-8 h-8 text-yellow-400" />
          Weapon Arsenal
        </h1>

        <PlayerStatsPanel
          playerStats={playerStats}
          setPlayerStats={setPlayerStats}
        />

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
              onChange={(e) => {
                const value = e.target.value;
                setSelectedCategory(value as WeaponCategory | "all");
              }}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              <option value="all">All Categories</option>
              {Object.entries(WeaponCategory).map(([key, value]) => (
                <option key={key} value={value}>
                  {key.replace("_", " ")}
                </option>
              ))}
            </select>

            {/* Rarity Filter */}
            <select
              value={selectedRarity}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedRarity(value as WeaponRarity | "all");
              }}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              <option value="all">All Rarities</option>
              {Object.entries(WeaponRarity).map(([key, value]) => (
                <option key={key} value={value}>
                  {key.replace("_", " ")}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-600" : "bg-gray-700"} hover:bg-blue-500`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-blue-600" : "bg-gray-700"} hover:bg-blue-500`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-gray-400 text-sm mb-4">
          {filteredWeapons.length} weapon
          {filteredWeapons.length !== 1 ? "s" : ""} found
        </div>

        {/* Weapons Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredWeapons.map((weapon: Weapon) => (
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
