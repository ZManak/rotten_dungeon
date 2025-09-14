import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type WeaponScaling {
    str: Int
    dex: Int
    int: Int
    fai: Int
  }

  type WeaponEffect {
    id: String!
    name: String!
    description: String!
    type: String!
    damagePerAction: Int
    duration: Int
    onHit: Boolean
    onCrit: Boolean
    chance: Float
  }

  type AttackPattern {
    hits: Int!
    targets: AttackTargets!
    hitsPerTarget: AttackHitsPerTarget!
  }

  type AttackTargets {
    min: Int!
    max: Int!
  }

  type AttackHitsPerTarget {
    min: Int!
    max: Int!
  }

  type Weapon {
    id: String!
    name: String!
    category: String!
    rarity: String!
    attackRating: Int!
    critChance: Int!
    durability: Int!
    weight: Float!
    damageTypes: [String!]!
    scaling: WeaponScaling
    effects: [WeaponEffect!]
    attackPattern: AttackPattern
    requirements: WeaponScaling
    description: String!
    flavorText: String
    loreText: String
    previousOwners: [String!]
  }

  type PlayerStats {
    str: Int!
    dex: Int!
    int: Int!
    fai: Int!
  }

  type Player {
    id: String!
    name: String!
    level: Int!
    health: Int!
    mana: Int!
    attack: Int!
    defense: Int!
    magicAttack: Int!
    magicDefense: Int!
    speed: Int!
    accuracy: Int!
    evasion: Int!
    stats: PlayerStats!
    inventory: [String!]!
  }

  type Enemy {
    id: String!
    name: String!
    level: Int!
    health: Int!
    attack: Int!
    defense: Int!
    experience: Int!
    loot: [String!]!
  }

  type Location {
    id: String!
    name: String!
    type: String!
    description: String!
    enemies: [Enemy!]!
    items: [String!]!
  }

  type Query {
    weapons: [Weapon!]!
    weapon(id: String!): Weapon
    players: [Player!]!
    player(id: String!): Player
    enemies: [Enemy!]!
    enemy(id: String!): Enemy
    locations: [Location!]!
    location(id: String!): Location
  }

  type Mutation {
    createPlayer(name: String!): Player!
    updatePlayerStats(id: String!, stats: PlayerStatsInput!): Player!
  }

  input PlayerStatsInput {
    str: Int!
    dex: Int!
    int: Int!
    fai: Int!
  }
`;