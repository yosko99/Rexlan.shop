const redis = require('redis');

require('dotenv').config();

const connectedRedisClient = async () => {
  const REDIS_HOSTNAME = process.env.REDIS_HOSTNAME !== undefined ? process.env.REDIS_HOSTNAME : '127.0.0.1';

  const redisClient = redis.createClient({
    socket: {
      host: REDIS_HOSTNAME,
      port: 6379
    }
  }
  );

  redisClient.on('error', (err) => console.log(err));

  await redisClient.connect();

  return redisClient;
};

module.exports = connectedRedisClient;
