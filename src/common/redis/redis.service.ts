import Redis from 'ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
  private redis = new Redis({
    host: 'localhost',
    port: 6379,
  });

  set(key: string, value: string, ttl: number) {
    return this.redis.set(key, value, 'EX', ttl);
  }

  get(key: string) {
    return this.redis.get(key);
  }

  del(key: string) {
    return this.redis.del(key);
  }
}
