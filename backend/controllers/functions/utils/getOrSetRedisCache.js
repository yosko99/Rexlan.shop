const redis = require('redis');

const getOrSetRedisCache = async (key, callback) => {
  return new Promise(async (resolve, reject) => {
    const redisClient = redis.createClient();

    redisClient.on('error', (err) => reject(err));

    await redisClient.connect();

    const redisData = await redisClient.get(key);

    if (redisData === null) {
      const data = await callback();
      await redisClient.set(key, JSON.stringify(data));
      resolve(data);
    }

    resolve(JSON.parse(redisData));
  });
};

module.exports = getOrSetRedisCache;
