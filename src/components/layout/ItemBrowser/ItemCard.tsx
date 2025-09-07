import React , { useState } from "react";
import { Weapon } from "../../../constants/game/weapons_db";
import "../../../styles/ItemBrowser.scss"; 
interface ItemCardProps {
    weapon: Weapon;
    isSelected: boolean;
    onClick: () => void;
    viewMode: "grid" | "list";
}

export const ItemCard = ({ weapon, isSelected, onClick, viewMode }: ItemCardProps) => {
    const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);
    return (
      <div
        className={`weapon-card ${weapon.rarity} ${isSelected ? "selected" : ""} ${viewMode}`}
        onClick={onClick}
      >
        <div
          className="weapon-card bg-[#1a1a1a] border-2 border-[#00ffcc] p-4 shadow-lg text-xs font-mono cursor-pointer hover:border-yellow-400 transition-all"
          onClick={() => setSelectedWeapon(weapon)}
        >
          <h3 className="text-yellow-400 text-sm mb-2">{weapon.name}</h3>
          <p className="text-gray-300 mb-2">{weapon.description}</p>
          <div className="text-green-400">ATK: {weapon.attackRating.base}</div>
          <div className="text-purple-400">Crit: {weapon.critChance}%</div>
          <div className="text-blue-400">Hit: {weapon.hitChance}%</div>
          <img
            src={weapon.iconUrl}
            alt={weapon.name}
            className="w-8 h-8 mb-2"
          />
          <p className="text-sm text-gray-400">Speed: {weapon.attackSpeed}</p>
          <p className="text-sm text-gray-400">
            Durability: {weapon.durability?.current}/{weapon.durability?.max}
          </p>
          {weapon.effects && weapon.effects.length > 0 && (
            <div className="text-yellow-400 mb-2">Effects:</div>
          )}
          {weapon.effects?.map((effect: any, idx: number) => (
            <div key={idx} className="mb-2">
              <span className="text-green-400 font-bold">{effect.name}</span>
              <p className="text-gray-300 ml-2">{effect.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
};
