/**
 * Weapon Utility Functions
 */

import { GAME_WEAPONS, Weapon, WeaponRarity, WeaponCategory } from '../../constants/game/weapons_db';

interface RarityStyle {
  name: string;
  color: string;
  bg: string;
}

export const getRarityStyle = (rarity: WeaponRarity): RarityStyle => {
  switch (rarity) {
    case WeaponRarity.COMMON:
      return {
        name: "Common",
        color: "text-gray-400",
        bg: "bg-gray-900/50",
      };
    case WeaponRarity.UNCOMMON:
      return {
        name: "Uncommon",
        color: "text-green-400",
        bg: "bg-green-900/20",
      };
    case WeaponRarity.RARE:
      return {
        name: "Rare",
        color: "text-blue-400",
        bg: "bg-blue-900/20",
      };
    case WeaponRarity.EPIC:
      return {
        name: "Epic",
        color: "text-purple-400",
        bg: "bg-purple-900/20",
      };
    case WeaponRarity.LEGENDARY:
      return {
        name: "Legendary",
        color: "text-yellow-400",
        bg: "bg-yellow-900/20",
      };
    case WeaponRarity.ARTIFACT:
      return {
        name: "Artifact",
        color: "text-red-400",
        bg: "bg-red-900/20",
      };
    default:
      return {
        name: "Common",
        color: "text-gray-400",
        bg: "bg-gray-900/50",
      };
  }
}
  // Calculate total attack rating based on player stats
  export function calculateTotalAttackRating(
    weapon: Weapon,
    playerStats: {
      str?: number;
      dex?: number;
      int?: number;
      fai?: number;
    }
  ): { base: number; bonus: number; total: number } {
    const base = weapon.attackRating.base;
    let bonus = 0;

    // Apply scaling bonuses
    if (weapon.scaling.str && playerStats.str) {
      bonus += Math.floor(playerStats.str * weapon.scaling.str);
    }
    if (weapon.scaling.dex && playerStats.dex) {
      bonus += Math.floor(playerStats.dex * weapon.scaling.dex);
    }
    if (weapon.scaling.int && playerStats.int) {
      bonus += Math.floor(playerStats.int * weapon.scaling.int);
    }
    if (weapon.scaling.fai && playerStats.fai) {
      bonus += Math.floor(playerStats.fai * weapon.scaling.fai);
    }

    const total = base + bonus;

    return { base, bonus, total };
  }

  export function calculateWeaponScaledDamage(
    weapon: Weapon,
    playerStats: {
      str?: number;
      dex?: number;
      int?: number;
      fai?: number;
    }
  ): number {
    let totalDamage = weapon.attackRating.total;

    // Apply scaling bonuses
    if (weapon.scaling.str && playerStats.str) {
      totalDamage += Math.floor(playerStats.str * weapon.scaling.str);
    }
    if (weapon.scaling.dex && playerStats.dex) {
      totalDamage += Math.floor(playerStats.dex * weapon.scaling.dex);
    }
    if (weapon.scaling.int && playerStats.int) {
      totalDamage += Math.floor(playerStats.int * weapon.scaling.int);
    }
    if (weapon.scaling.fai && playerStats.fai) {
      totalDamage += Math.floor(playerStats.fai * weapon.scaling.fai);
    }

    return totalDamage;
  }

  // Check if player meets weapon requirements
  export function canEquipWeapon(
    weapon: Weapon,
    playerStats: {
      str?: number;
      dex?: number;
      int?: number;
      fai?: number;
      level?: number;
      completedQuests?: string[];
    }
  ): { canEquip: boolean; missingRequirements: string[] } {
    const missing: string[] = [];

    if (
      weapon.requirements.str &&
      (!playerStats.str || playerStats.str < weapon.requirements.str)
    ) {
      missing.push(`Strength ${weapon.requirements.str}`);
    }
    if (
      weapon.requirements.dex &&
      (!playerStats.dex || playerStats.dex < weapon.requirements.dex)
    ) {
      missing.push(`Dexterity ${weapon.requirements.dex}`);
    }
    if (
      weapon.requirements.int &&
      (!playerStats.int || playerStats.int < weapon.requirements.int)
    ) {
      missing.push(`Intelligence ${weapon.requirements.int}`);
    }
    if (
      weapon.requirements.fai &&
      (!playerStats.fai || playerStats.fai < weapon.requirements.fai)
    ) {
      missing.push(`Faith ${weapon.requirements.fai}`);
    }
    if (
      weapon.requirements.level &&
      (!playerStats.level || playerStats.level < weapon.requirements.level)
    ) {
      missing.push(`Level ${weapon.requirements.level}`);
    }
    if (weapon.requirements.questCompleted) {
      const completedQuests = playerStats.completedQuests || [];
      const missingQuests = weapon.requirements.questCompleted.filter(
        (q) => !completedQuests.includes(q)
      );
      if (missingQuests.length > 0) {
        missing.push(`Quest: ${missingQuests.join(", ")}`);
      }
    }

    return {
      canEquip: missing.length === 0,
      missingRequirements: missing,
    };
  }

  // Get weapons by category
  export function getWeaponsByCategory(category: WeaponCategory): Weapon[] {
    return Object.values(GAME_WEAPONS).filter(
      (weapon) => weapon.category === category
    );
  }

  // Get weapons by rarity
  export function getWeaponsByRarity(rarity: WeaponRarity): Weapon[] {
    return Object.values(GAME_WEAPONS).filter(
      (weapon) => weapon.rarity === rarity
    );
  }

  // Example usage demonstrating scaling calculation:
  export function demonstrateScaling() {
    const poisonSwords = GAME_WEAPONS.poison_heavy_paired_swords;

    // Example player with 26 STR, 20 DEX to match the image (79 + 34 = 113)
    const playerStats = { str: 26, dex: 20 };

    // Calculate the bonus damage from scaling

    const totalRating = calculateTotalAttackRating(poisonSwords, playerStats);
    // Result: { base: 79, bonus: 34, total: 113 }

    console.log(`Poison Heavy Paired Swords:`);
    console.log(`Base Attack: ${totalRating.base}`);
    console.log(`Scaling Bonus: ${totalRating.bonus}`);
    console.log(`Total Attack Rating: ${totalRating.total}`);
    console.log(
      `Scaling: ${Math.round(poisonSwords.scaling.str! * 100)}% STR, ${Math.round(poisonSwords.scaling.dex! * 100)}% DEX`
    );

    return totalRating;
  }

  // Call the demonstration function
  demonstrateScaling();




