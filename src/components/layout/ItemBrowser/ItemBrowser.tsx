import React, { useState, useMemo } from "react";
import {FilterPanel} from "./FilterPanel";
import {ItemGrid} from "./ItemGrid";
import {ItemModal} from "./ItemModal";
import "../../../styles/ItemBrowser.scss"; // Your retro styles
import { Weapon } from '../../../constants/game/weapons_db';
import { DEFAULT_PLAYER } from "../../game/Player";
import { Grid3X3, List } from "lucide-react";

export const ItemBrowser = ({ items: weapons }: { items: Weapon[] }) => {
  const [filters, setFilters] = useState<{ [key: string]: number }>({ str: 0, dex: 0, int: 0, fai: 0 });
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (column: string, value: string) => {
    if (sortOrder === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortOrder(column);
      setSortDirection("asc");
    }
  };

const filteredWeapons = useMemo(() => {
  return weapons.filter(
    (w: Weapon) =>
      w.requirements.str! <= filters.str &&
      w.requirements.dex! <= filters.dex &&
      w.requirements.int! <= filters.int &&
      w.requirements.fai! <= filters.fai
  );
}, [filters, weapons]);

  return (
    <div className="browser-container">
      <h1 className="text-center text-cyan-400 text-lg mb-4">
        DISCOVER AND COMPARE LEGENDARY WEAPONS
      </h1>
      <FilterPanel filters={filters} setFilters={setFilters} />
      <div className="view-toggle flex gap-2 mb-4">
        <button
          className={`rpg-button ${viewMode === "grid" ? "active" : ""}`}
          onClick={() => setViewMode("grid")}
        >
          <Grid3X3 className="w-5 h-5" /> Grid
        </button>
        <button
          className={`rpg-button ${viewMode === "list" ? "active" : ""}`}
          onClick={() => setViewMode("list")}
        >
          <List className="w-5 h-5" /> List
        </button>
      </div>

      <ItemGrid
        weapons={filteredWeapons}
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
          viewMode={viewMode}
        />
      )}
    </div>
  );
};
