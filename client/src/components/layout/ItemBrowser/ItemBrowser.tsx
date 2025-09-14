import React, { useState, useMemo } from "react";
import { FilterPanel } from "./FilterPanel";
import { ItemGrid } from "./ItemGrid";
import { ItemModal } from "./ItemModal";
import "../../../styles/ItemBrowser.scss"; // Your retro styles
import { Weapon } from "../../../constants/game/weapons_db";
import { DEFAULT_PLAYER } from "../../game/Player";
import { PlayerStatsPanel } from "./PlayerStatsPanel";

export const ItemBrowser = ({ items: weapons }: { items: Weapon[] }) => {
  const [filters, setFilters] = useState<{ [key: string]: number }>({
    str: 0,
    dex: 0,
    int: 0,
    fai: 0,
  });
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState("name");

const filteredWeapons = useMemo(() => {
  return weapons.filter(
    (w: Weapon) =>
      w.requirements.str! <= filters.str &&
      w.requirements.dex! <= filters.dex &&
      w.requirements.int! <= filters.int &&
      w.requirements.fai! <= filters.fai
  ); 
}, [filters, weapons]);

const sortedWeapons = useMemo(() => {
  const sorted = [...filteredWeapons];
  if (sortOrder === "name") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder === "attack") {
    sorted.sort((a, b) => b.attackRating - a.attackRating);
  } else if (sortOrder === "crit") {
    sorted.sort((a, b) => b.critChance - a.critChance);
  } else if (sortOrder === "rarity") {
    sorted.sort((a, b) => b.rarity.localeCompare(a.rarity));
  }
  return sorted;
}, [filteredWeapons, sortOrder]);

  return (
    <div className="browser-container">
      <h1 className="text-center text-cyan-400 text-lg mb-4">
        DISCOVER AND COMPARE LEGENDARY WEAPONS
      </h1>
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <PlayerStatsPanel stats={DEFAULT_PLAYER.stats} />
      <ItemGrid
        weapons={sortedWeapons}
        selectedWeapon={selectedWeapon}
        setSelectedWeapon={setSelectedWeapon}
        viewMode={viewMode}
      />
      {/* Weapon Modal for Details shows centered on the screen with a dark overlay when a weapon is selected, on top of the ItemGrid */}
      {selectedWeapon && (
        <ItemModal
          weapon={selectedWeapon}
          playerStats={DEFAULT_PLAYER.stats}
          onClose={() => setSelectedWeapon(null)}
        />
      )}
    </div>
  );
};
