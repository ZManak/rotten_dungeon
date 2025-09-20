import { gql } from '@apollo/client';

export const GET_WEAPONS = gql`
  query GetWeapons {
    weapons {
      id
      name
      category
      rarity
      attackRating
      critChance
      durability {
        current
        max
        repairCost
      }
      weight
      primaryDamageType
      secondaryDamageType
      scaling {
        str
        dex
        int
        fai
      }
      effects {
        id
        name
        description
        type
        damagePerAction
        duration
        onHit
        onCrit
        chance
      }
      attackPattern {
        hits
        targets {
          min
          max
        }
        hitsPerTarget {
          min
          max
        }
      }
      requirements {
        str
        dex
        int
        fai
      }
      description
      flavorText
      loreText
      previousOwners
    }
  }
`;

export const GET_WEAPON = gql`
  query GetWeapon($id: String!) {
    weapon(id: $id) {
      id
      name
      category
      rarity
      attackRating
      critChance
      durability {
        current
        max
        repairCost
      }
      weight
      primaryDamageType
      secondaryDamageType
      scaling {
        str
        dex
        int
        fai
      }
      effects {
        id
        name
        description
        type
        damagePerAction
        duration
        onHit
        onCrit
        chance
      }
      attackPattern {
        hits
        targets {
          min
          max
        }
        hitsPerTarget {
          min
          max
        }
      }
      requirements {
        str
        dex
        int
        fai
      }
      description
      flavorText
      loreText
      previousOwners
    }
  }
`;

export const GET_PLAYERS = gql`
  query GetPlayers {
    players {
      id
      name
      level
      health
      mana
      attack
      defense
      magicAttack
      magicDefense
      speed
      accuracy
      evasion
      stats {
        str
        dex
        int
        fai
      }
      inventory
    }
  }
`;

export const CREATE_PLAYER = gql`
  mutation CreatePlayer($name: String!) {
    createPlayer(name: $name) {
      id
      name
      level
      health
      mana
      stats {
        str
        dex
        int
        fai
      }
    }
  }
`;

export const UPDATE_PLAYER_STATS = gql`
  mutation UpdatePlayerStats($id: String!, $stats: PlayerStatsInput!) {
    updatePlayerStats(id: $id, stats: $stats) {
      id
      name
      stats {
        str
        dex
        int
        fai
      }
    }
  }
`;