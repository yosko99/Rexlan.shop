const connectedRedisClient = require('./connectedRedisClient');

const getOrSetRedisCache = async (key, callback) => {
  return new Promise(async (resolve, reject) => {
    const redisClient = await connectedRedisClient();

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
