import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async setData(key: string, data: string) {
    await this.cacheManager.set(key, data);
  }

  async getData(key: string) {
    await this.cacheManager.get(key);
  }

  async setAndGetData(key: string, callback: () => void) {
    return new Promise(async (resolve, _reject) => {
      const isDataCached = await this.cacheManager.get(key);

      if (isDataCached === null) {
        const data = await callback();
        await this.cacheManager.set(key, JSON.stringify(data));
        resolve(data);
      }

      resolve(JSON.parse(isDataCached));
    });
  }

  async flushCache() {
    await this.cacheManager.reset();
  }
}
