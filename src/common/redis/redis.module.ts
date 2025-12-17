import { Module } from '@nestjs/common';
import { RedisModule as IORedisModule } from '@nestjs-modules/ioredis';
import { RedisService } from './redis.service';

@Module({
  imports: [
    IORedisModule.forRoot({
      type: "single", 
      url: "redis://127.0.0.1:6379"
    })
  ],
  exports: [IORedisModule, RedisService],
  providers: [RedisService]
})
export class RedisModule {}
