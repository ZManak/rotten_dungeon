import React from "react";
import { Weapon } from "../../../constants/game/weapons_db";
import { calculateTotalAttackRating } from "../../../utils/game/utils_weapons";
import { DEFAULT_PLAYER_STATS } from "../../game/Player";
import "../../../styles/ItemBrowser.scss"; 
interface ItemCardProps {
    weapon: Weapon;
    isSelected: boolean;
    onClick: () => void;
}

export const ItemCard = ({ weapon, isSelected, onClick }: ItemCardProps) => {
    
    return (
      <div
        className={`weapon-card ${weapon.rarity} ${isSelected ? "selected" : ""}`}
        onClick={onClick}
      >
        <h3 className="text-yellow-400 text-sm mb-2">{weapon.name}</h3>
        <span className="text-white">SCALING</span>
        <div className="scaling-text">
          <p className="text-green-400">STR: {weapon.scaling.str}</p>
          <p className="text-blue-400">DEX: {weapon.scaling.dex}</p>
          <p className="text-purple-400">INT: {weapon.scaling.int}</p>
          <p className="text-pink-400">FAI: {weapon.scaling.fai}</p>
        </div>
        <div className="text-green-400">
          ATK: {calculateTotalAttackRating(weapon, DEFAULT_PLAYER_STATS).total}{" "}
          = {weapon.attackRating} +{" "}
          {calculateTotalAttackRating(weapon, DEFAULT_PLAYER_STATS).bonus}
        </div>
        <div className="text-blue-400">Hit: {weapon.hitChance}%</div>
        <div className="text-purple-400">Crit: {weapon.critChance}%</div>

        <p className="text-sm text-gray-400">
          Durability: {weapon.durability?.current}/{weapon.durability?.max}
        </p>
      </div>
    );
};
