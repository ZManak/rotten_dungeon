import  React  from "react";
import { X, Star, TrendingUp, Eye, Zap, Shield, Sword } from "lucide-react";
import { calculateTotalAttackRating, getRarityStyle } from "../../utils/game/utils_weapons";
import { Weapon } from "../../constants/game/weapons_db";
import { Player } from "../game/Player";


export const WeaponModal = ({ weapon, playerStats, onClose }: {
  weapon: Weapon;
  playerStats: Player["stats"];
  onClose: () => void;
}) => {
  if (!weapon) return null;

  const attackRating = calculateTotalAttackRating(weapon, playerStats);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex justify-between items-start">
          <div>
            <h2 className={`text-2xl font-bold ${getRarityStyle(weapon.rarity).color} mb-2`}>{weapon.name}</h2>
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
            <div className={`${getRarityStyle(weapon.rarity).bg} p-4 rounded-lg`}>
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

export default WeaponModal;