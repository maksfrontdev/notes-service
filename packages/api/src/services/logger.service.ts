import pino from 'pino';

import { Environment, environmentConfig } from '@config';

const productionPinoConfig = {
  prettyPrint: false,
  messageKey: 'message',
};

const developmentPinoConfig = {
  enabled: process.env.NODE_ENV !== 'test',
  transport: {
    target: 'pino-pretty',
    options: {
      levelFirst: true,
      ignore: 'hostname,pid',
    },
  },
};

export const logger = pino(
  environmentConfig.environment === Environment.Development
    ? developmentPinoConfig
    : productionPinoConfig,
);
