const connectedRedisClient = require('./connectedRedisClient');

const flushRedis = async (key, callback) => {
  const redisClient = await connectedRedisClient();

  await redisClient.flushAll('ASYNC');
};

module.exports = flushRedis;
