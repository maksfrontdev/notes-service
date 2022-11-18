export enum Environment {
  Development = 'development',
  Integration = 'integration',
  Production = 'production',
  Test = 'test',
}

/**
 * Environment config.
 *
 * @property {string} environment='development' - API environment name.
 */
const environmentConfig = {
  environment: process.env.API_ENV || Environment.Development,
};

export default environmentConfig;
