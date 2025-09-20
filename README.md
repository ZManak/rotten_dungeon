# Rotten Dungeon

A web-based MMO-RPG inspired by the Discord bot Totem, featuring turn-based combat, exploration, and party mechanics.

## Project Structure

This project follows a monorepo structure with three main packages:

```
rotten_dungeon/
├── client/          # React frontend application
├── server/          # Express.js + GraphQL API server
├── shared/          # Shared types, constants, and utilities
└── package.json     # Root package for workspace management
```

## Features

- 🗡️ Turn-based combat system
- 🌍 Open world exploration
- 👥 Party system with synergized abilities
- 🎒 Inventory and character management
- 🔄 Real-time multiplayer
- 🏗️ GraphQL API for efficient data fetching
- 📱 Responsive React frontend
- 🎮 Game data management via external server

## Technology Stack

### Frontend (Client)
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Apollo Client** - GraphQL client
- **Redux Toolkit** - State management
- **Vite** - Build tool

### Backend (Server)
- **Node.js** - Runtime
- **Express.js** - Web server
- **Apollo Server** - GraphQL server
- **TypeScript** - Type safety
- **MongoDB** (planned) - Database

### Shared
- **TypeScript** - Shared types and interfaces
- Game constants and utilities

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ZManak/rotten_dungeon.git
cd rotten_dungeon
```

2. Install dependencies for all packages:
```bash
npm run install:all
```

### Development

Start both client and server in development mode:
```bash
npm run dev
```

Or run them separately:
```bash
# Terminal 1 - Start the server
npm run dev:server

# Terminal 2 - Start the client  
npm run dev:client
```

- **Client**: http://localhost:5173
- **Server**: http://localhost:4000
- **GraphQL Playground**: http://localhost:4000/graphql

### Building for Production

```bash
npm run build
```

### Running in Production

```bash
npm start
```

## Development Workflow

1. **Shared Code**: Common game logic, types, and constants are in `/shared`
2. **API Development**: GraphQL schema and resolvers in `/server`
3. **UI Development**: React components and game interface in `/client`
4. **Type Safety**: Full TypeScript coverage across all packages

## API Documentation

The GraphQL API provides the following main queries and mutations:

### Queries
- `weapons` - Get all available weapons
- `weapon(id)` - Get specific weapon details
- `players` - Get all players
- `player(id)` - Get specific player
- `enemies` - Get all enemies
- `locations` - Get all game locations

### Mutations
- `createPlayer(name)` - Create a new player
- `updatePlayerStats(id, stats)` - Update player statistics

Visit the GraphQL Playground at http://localhost:4000/graphql for interactive documentation.

## Contributing

1. Make changes in the appropriate package (`client`, `server`, or `shared`)
2. Ensure type safety across all packages
3. Test both client and server functionality
4. Update documentation as needed

## License

ISC License - see LICENSE file for details.
