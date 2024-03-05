import Redis from 'ioredis'
import { RedisOptions } from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';

const options: RedisOptions  = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  retryStrategy: (times: any) => Math.max(times * 100, 3000),
};


const redis = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options)
});


export default redis