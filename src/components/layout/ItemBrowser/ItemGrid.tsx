import React from "react";
import { ItemCard } from "./ItemCard";
import { Weapon } from "../../../constants/game/weapons_db";
import "../../../styles/ItemBrowser.scss"; 
interface ItemGridProps {
    weapons: Weapon[];
    selectedWeapon: Weapon | null;
    setSelectedWeapon: (weapon: Weapon) => void;
    viewMode: "grid" | "list";
}

export const ItemGrid = ({
  weapons,
  selectedWeapon,
  setSelectedWeapon,
  viewMode,
}: ItemGridProps) => {
  const layoutClass = viewMode === "grid" ? "grid-container" : "list-container";

  return (
    <div className={layoutClass}>
      {weapons.map((weapon, index) => (
        <ItemCard
          key={weapon.id || index}
          weapon={weapon}
          isSelected={selectedWeapon?.name === weapon.name}
          onClick={() => setSelectedWeapon(weapon)}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};
