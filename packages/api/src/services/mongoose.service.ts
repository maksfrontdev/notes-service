import mongoose from 'mongoose';

import { mongoConfig } from '@config';

import { logger } from './logger.service';

const sleep = async (timeInMs = 5000) =>
  new Promise((resolve) => setTimeout(resolve, timeInMs));

export default class MongooseService {
  public static connectWithRetry = async () => {
    try {
      await mongoose.connect(mongoConfig.uri);
    } catch (err: any) {
      logger.error(
        err,
        'Failed to connect to mongo on startup - retrying in 5 sec\n',
      );
      await sleep(5000);
      await MongooseService.connectWithRetry();
    }
  };
}
