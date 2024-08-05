import express, { Express } from "express";
import { Server, createServer } from 'http';
import { logger } from './src/utils/logger';
import { bootstrap } from "./src/loader";
import { PrismaClient } from "@prisma/client";
import { validateEnv } from "./src/config/config";

const prisma = new PrismaClient();

const exitHandler = (server: Server | null) => {
  if (server) {
    server.close(async () => {
      logger.info('Server closed');
      await prisma.$disconnect();
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unExpectedErrorHandler = (server: Server) => {
  return function (error: Error) {
    logger.error(error);
    exitHandler(server);
  };
};

const startServer = async () => {
  const app: Express = express();
  await bootstrap(app);

  const httpServer = createServer(app);
  const port: number = validateEnv()?.port;

  const server: Server = httpServer.listen(port, () => {
    logger.info(`server listening on port ${port}`);
  });

  process.on('uncaughtException', unExpectedErrorHandler(server));
  process.on('unhandledRejection', unExpectedErrorHandler(server));
  process.on('SIGTERM', () => {
    logger.info('SIGTERM recieved');
    if (server) {
      server.close();
    }
  });
};

startServer();
