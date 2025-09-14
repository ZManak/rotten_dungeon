import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import dotenv from 'dotenv';
import { typeDefs } from './schemas/index.js';
import { resolvers } from './resolvers/index.js';

dotenv.config();

async function startServer() {
  const app = express();
  const port = process.env.PORT || 4000;

  // Apollo GraphQL Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    formatError: (error) => {
      console.error('GraphQL Error:', error);
      return {
        message: error.message,
        locations: error.locations,
        path: error.path,
      };
    },
  });

  await server.start();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Apply Apollo GraphQL middleware
  app.use('/graphql', 
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server)
  );

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API info endpoint
  app.get('/', (req, res) => {
    res.json({
      message: 'Rotten Dungeon Game Server',
      version: '1.0.0',
      graphql: `http://localhost:${port}/graphql`,
      playground: `http://localhost:${port}/graphql`,
    });
  });

  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}`);
    console.log(`🎮 GraphQL endpoint at http://localhost:${port}/graphql`);
  });
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});