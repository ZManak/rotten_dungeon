// src/constants/game/weapons.ts
import React from "react";
import { TrendingUp } from "lucide-react";
import {  Weapon } from "../../constants/game/weapons_db";
import { calculateTotalAttackRating, getRarityStyle} from "../../utils/game/utils_weapons";

function WeaponCard({ weapon, playerStats, onClick, isCompact }: {
    weapon: Weapon;
    playerStats: {
        str?: number;
        dex?: number;
        int?: number;
        fai?: number;
    };
    onClick: any;
    isCompact?: boolean;
}) {
    <style>
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
    </style>
    const attackRating = calculateTotalAttackRating(weapon, playerStats);

    if (isCompact) {
        return (
            <div
                className={`${getRarityStyle(weapon.rarity).bg} border border-gray-700 rounded-lg p-3 cursor-pointer hover:border-gray-500 transition-all`}
                onClick={() => onClick(weapon)}
            >
                <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-semibold text-sm ${getRarityStyle(weapon.rarity).color}`}>
                        {weapon.name}
                    </h3>
                    <div className="flex items-center gap-1">
                        {weapon.enhancementLevel > 0 && (
                            <span className="text-yellow-400 text-xs">
                                +{weapon.enhancementLevel}
                            </span>
                        )}
                        <TrendingUp className="w-3 h-3 text-gray-400" />
                    </div>
                </div>
                <div className="text-xl font-bold text-white mb-1">
                    {attackRating.base} + {attackRating.bonus}
                </div>
                <div className="text-sm text-gray-400">
                    Total AR: {attackRating.total}
                </div>
            </div>
        );
    }

    return (
        <div
            className={`${getRarityStyle(weapon.rarity).bg} border border-gray-700 rounded-lg p-6 cursor-pointer hover:border-gray-500 transition-all hover:scale-105`}
            onClick={() => onClick(weapon)}
        >
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className={`font-bold text-lg ${getRarityStyle(weapon.rarity).color} mb-1`}>
                        {weapon.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">{weapon.description}</p>
                </div>
                {weapon.enhancementLevel > 0 && (
                    <span className="text-yellow-400 font-semibold">
                        +{weapon.enhancementLevel}
                    </span>
                )}
            </div>

            {/* Attack Rating */}
            <div className="mb-4">
                <div className="text-white text-sm mb-1">ATK RATING</div>
                <div className="text-red-400 text-xl font-bold">
                    {weapon.category.includes("slash") ? "slash: " : ""}
                    {attackRating.base}
                </div>
                <div className="text-green-400 text-sm">
                    [{attackRating.base} + {attackRating.bonus}]
                </div>
                <div className="text-teal-400 text-lg font-semibold">
                    Total AR: {attackRating.total}
                </div>
            </div>

            {/* Combat Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                    <span className="text-cyan-400">Hit Chance:</span> {weapon.hitChance}%
                </div>
                <div>
                    <span className="text-orange-400">Hits:</span>{" "}
                    {weapon.attackPattern.hits}
                </div>
                <div>
                    <span className="text-purple-400">Crit Chance:</span>{" "}
                    {weapon.critChance}%
                </div>
                <div>
                    <span className="text-pink-400">Targets:</span>{" "}
                    {weapon.attackPattern.targets.min}-{weapon.attackPattern.targets.max}
                </div>
                <div>
                    <span className="text-yellow-400">Crit Mult:</span>{" "}
                    {weapon.critMultiplier}
                </div>
                <div>
                    <span className="text-blue-400">Hits/Target:</span>{" "}
                    {weapon.attackPattern.hitsPerTarget.min}-
                    {weapon.attackPattern.hitsPerTarget.max}
                </div>
            </div>

            {/* Requirements and Scaling */}
            <div className="flex gap-8 mb-4">
                <div>
                    <div className="text-yellow-400 text-sm font-semibold mb-1">REQS</div>
                    <div className="text-green-400 text-sm">
                        str {weapon.requirements.str}
                    </div>
                    <div className="text-yellow-400 text-sm">
                        dex {weapon.requirements.dex}
                    </div>
                    <div className="text-blue-400 text-sm">
                        int {weapon.requirements.int || 0}
                    </div>
                    <div className="text-purple-400 text-sm">
                        fai {weapon.requirements.fai || 0}
                    </div>
                </div>
                <div>
                    <div className="text-yellow-400 text-sm font-semibold mb-1">
                        SCALING
                    </div>
                    <div className="text-white text-sm">
                        {Math.round((weapon.scaling.str || 0) * 100)}%
                    </div>
                    <div className="text-white text-sm">
                        {Math.round((weapon.scaling.dex || 0) * 100)}%
                    </div>
                    <div className="text-white text-sm">
                        {Math.round((weapon.scaling.int || 0) * 100)}%
                    </div>
                    <div className="text-white text-sm">
                        {Math.round((weapon.scaling.fai || 0) * 100)}%
                    </div>
                </div>
            </div>

            {/* Effects */}
            {weapon.effects && weapon.effects.length > 0 && (
                <div className="mb-4">
                    <div className="text-yellow-400 text-sm font-semibold mb-2">
                        EFFECTS
                    </div>
                    {weapon.effects.map((effect, idx) => (
                        <div key={idx} className="mb-2">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span className="text-green-400 text-sm font-semibold">
                                    {effect.name}
                                </span>
                            </div>
                            <div className="text-gray-300 text-sm ml-4">
                                {effect.description}
                            </div>
                            {effect.damagePerAction && (
                                <div className="text-gray-400 text-xs ml-4">
                                    ├ Take {effect.damagePerAction} damage every action.
                                    {effect.duration && (
                                        <span>
                                            <br />└ Lasts {effect.duration} actions
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Value */}
            <div className="text-gray-400 text-sm">Value: {weapon.value}💰</div>
        </div>
    );
}
 export default WeaponCard


