/**
 * Cache interface. Phase-1 uses in-memory. Redis is a stub until REDIS_URL exists.
 */
export interface CacheStore {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
}

export class MemoryCache implements CacheStore {
  private store = new Map<string, { value: unknown; expiresAt: number }>();

  async get<T>(key: string): Promise<T | null> {
    const row = this.store.get(key);
    if (!row) return null;
    if (row.expiresAt < Date.now()) {
      this.store.delete(key);
      return null;
    }
    return row.value as T;
  }

  async set<T>(key: string, value: T, ttlSeconds = 60): Promise<void> {
    this.store.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
  }
}

export class RedisCacheStub implements CacheStore {
  async get<T>(key: string): Promise<T | null> {
    void key;
    return null;
  }

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    void key;
    void value;
    void ttlSeconds;
    if (!process.env.REDIS_URL) return;
  }
}

export const cache: CacheStore = process.env.REDIS_URL
  ? new RedisCacheStub()
  : new MemoryCache();
