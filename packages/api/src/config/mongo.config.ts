/**
 * Mongo config.
 *
 * @property {string} uri='mongodb://mongo:27017/api' - Mongo connection uri.
 */
const mongoConfig = {
  uri: process.env.MONGO_URI || 'mongodb://mongo:27017/api',
};

export default mongoConfig;
