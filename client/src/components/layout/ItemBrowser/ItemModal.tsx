import React from "react";
import { Weapon, WeaponEffect } from "../../../constants/game/weapons_db";
import { Player } from "../../game/Player";
import { calculateTotalAttackRating } from "../../../utils/game/utils_weapons";
import "../../../styles/ItemBrowser.scss"; 
interface ItemModalProps {
  weapon: Weapon;
  playerStats: Player["stats"];
  onClose: () => void;
}

export const ItemModal = ({ weapon, playerStats, onClose }: ItemModalProps) => {
  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center p-4 z-50 font-mono text-xs width-80">
      <div className="bg-[#000] border-4 border-yellow-400 p-6 max-w-xl w-full shadow-2xl">
        <h2 className="text-red-400 text-lg mb-2">{weapon.name}</h2>
        <p className="text-gray-300 mb-2">{weapon.description}</p>
        <p className="italic text-gray-500 mb-4">"{weapon.flavorText}"</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-green-400">ATK</label>
            <div className="text-white">
                {weapon.attackRating} + {calculateTotalAttackRating(weapon, playerStats).bonus} = {calculateTotalAttackRating(weapon, playerStats).total}
            </div>
          </div>
          <div>
            <label className="text-purple-400">Crit</label>
            <div className="text-white">{weapon.critChance}%</div>
          </div>
        </div>

        <div className="text-yellow-400 mb-2">Effects:</div>
        {weapon.effects?.map((effect: WeaponEffect, idx: number) => (
          <div key={idx} className="mb-2">
            <span className="text-green-400 font-bold">{effect.name}</span>
            <p className="text-gray-300 ml-2">{effect.description}</p>
          </div>
        ))}

        {weapon.loreText && (
          <p className="text-gray-500 italic mt-2">"{weapon.loreText}"</p>
        )}
        {weapon.previousOwners && weapon.previousOwners?.length > 0 && (
          <div className="mt-2 text-xs text-gray-400">
            Previous Owners: {weapon.previousOwners.join(", ")}
          </div>
        )}

        <button onClick={onClose} className="rpg-button mt-4">
          Close
        </button>
      </div>
    </div>
  );
};
