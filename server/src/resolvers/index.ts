import { GAME_WEAPONS } from '../../../shared/constants/game/weapons_db.js';
import { GAME_ENEMIES } from '../../../shared/constants/game/enemies.js';
import { GAME_LOCATIONS } from '../../../shared/constants/game/locations.js';
import { DEFAULT_PLAYER } from '../../../shared/types/game/Player.js';

// In-memory data store (replace with database in production)
let players: any[] = [DEFAULT_PLAYER];
let nextPlayerId = 2;

export const resolvers = {
  Query: {
    weapons: () => Object.values(GAME_WEAPONS),
    weapon: (_: any, { id }: { id: string }) => GAME_WEAPONS[id],
    
    players: () => players,
    player: (_: any, { id }: { id: string }) => players.find(p => p.id === id),
    
    enemies: () => Object.values(GAME_ENEMIES),
    enemy: (_: any, { id }: { id: string }) => GAME_ENEMIES[id],
    
    locations: () => Object.values(GAME_LOCATIONS),
    location: (_: any, { id }: { id: string }) => GAME_LOCATIONS[id],
  },

  Mutation: {
    createPlayer: (_: any, { name }: { name: string }) => {
      const newPlayer = {
        ...DEFAULT_PLAYER,
        id: nextPlayerId.toString(),
        name,
      };
      players.push(newPlayer);
      nextPlayerId++;
      return newPlayer;
    },
    
    updatePlayerStats: (_: any, { id, stats }: { id: string; stats: any }) => {
      const playerIndex = players.findIndex(p => p.id === id);
      if (playerIndex === -1) {
        throw new Error('Player not found');
      }
      
      players[playerIndex].stats = { ...players[playerIndex].stats, ...stats };
      return players[playerIndex];
    },
  },
};