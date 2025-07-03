import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { Server } from 'socket.io';

const PORT = 4000;

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // ✅ Setup Socket.IO
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  // Attach io to app locals so resolvers can use it
  app.locals.io = io;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(cors());
  app.use(json());

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        const userId = req.headers['userid'] as string | undefined;

        return {
          io: app.locals.io,
          userId, // make it available to resolvers
        };
      },
    })
  );

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });

  // Optional: Listen for connections
  io.on('connection', (socket) => {
    console.log('🟢 A client connected:', socket.id);
  });
}

startServer();
