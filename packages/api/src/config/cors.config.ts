import { CorsOptions } from 'cors';

const allowlist = ['http://localhost:3000', 'http://localhost:4000'];

/**
 * CORS config.
 */
const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowlist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS authorization failed.'));
    }
  },
};

export default corsConfig;
