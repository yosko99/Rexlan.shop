import * as redisStore from 'cache-manager-redis-store';
import * as dotenv from 'dotenv';

dotenv.config();

export const REDIS_CACHE_TTL = 60 * 60 * 24;

export const REDIS_CONFIG = {
  host: process.env.REDIS_HOSTNAME,
};

export const REDIS_CACHE_OPTIONS = {
  ...REDIS_CONFIG,
  store: redisStore,
  ttl: REDIS_CACHE_TTL,
  max: 100,
  isGlobal: true,
};
