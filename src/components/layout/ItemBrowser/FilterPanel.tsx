import React from "react";
import "../../../styles/ItemBrowser.scss"; 
interface FilterPanelProps {
  filters: { [key: string]: number };
  setFilters: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
}
export const FilterPanel = ({
  filters,
  setFilters,
}: FilterPanelProps): React.ReactElement => {
  const [sortBy, setSortBy] = React.useState("name");

  return (
    <div className="filter-panel mb-4">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="rpg-button"
      >
        <option value="name">Name</option>
        <option value="attack">Attack</option>
        <option value="crit">Crit Chance</option>
        <option value="rarity">Rarity</option>
      </select>
      {["str", "dex", "int", "fai"].map((stat) => (
        <div key={stat}>
          <label className="text-[#00ffcc]">{stat.toUpperCase()}</label>
          <input
            type="number"
            value={filters[stat] || 0}
            onChange={(e) =>
              setFilters({ ...filters, [stat]: parseInt(e.target.value) || 0 })
            }
            className="bg-[#111] text-white border border-[#00ffcc] p-1 w-16"
            min="0"
            max="99"
          />
        </div>
      ))}
    </div>
  );
};

