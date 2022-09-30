const redis = require('redis');

const flushRedis = async (key, callback) => {
  const redisClient = redis.createClient();

  redisClient.on('error', (err) => console.log(err));

  await redisClient.connect();

  await redisClient.flushAll('ASYNC');
};

module.exports = flushRedis;
