import cors from 'cors';
import express from 'express';

import { appConfig, corsConfig, serverConfig } from '@config';
import { logger } from '@services/logger.service';
import MongooseService from '@services/mongoose.service';

import { registerRoutes } from './routes';

process.on('unhandledRejection', (err: any) => {
  logger.error(err);
  process.exit(1);
});

process.on('uncaughtException', (err: any) => {
  logger.error(err);
  process.exit(1);
});

MongooseService.connectWithRetry();

const app = express();
app.use(cors(corsConfig));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

registerRoutes(app);

app.listen(serverConfig, () => {
  logger.info(`${appConfig.name} (GraphQL) running on ${serverConfig.port}`);
});
