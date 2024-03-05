// import { NextRequest } from 'next/server';
// import { startServerAndCreateNextHandler } from '@as-integrations/next';
// import { ApolloServer } from '@apollo/server';
// import { gql } from 'graphql-tag';

// const resolvers = {
//   Query: {
//     hello: () => 'world',
//   },
//   Subscription: {
//     greetings: {
//       subscribe: () => {/* Add your pub/sub logic here using Redis or another method */}
//     },
//   },
// };

// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
//   type Subscription {
//     greetings: String
//   }
// `;

// const server = new ApolloServer({ resolvers, typeDefs });

// const handler = startServerAndCreateNextHandler<NextRequest>(server, {
//   context: async (req: any) => ({ req }),
// });

// export { handler as GET, handler as POST };

import { NextRequest } from 'next/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import redis from '@/lib/redis';
// import { RedisPubSub } from 'graphql-redis-subscriptions';
// import Redis from 'ioredis';

// const options = {
//   host: process.env.REDIS_HOST || '127.0.0.1',
//   port: process.env.REDIS_PORT || 6379,
//   retryStrategy: (times: any) => Math.max(times * 100, 3000),
// };

// const pubsub = new RedisPubSub({
//   publisher: Redis.createClient(options),
//   subscriber: Redis.createClient(options),
// });

const pubsub = redis;

const typeDefs = gql`
  type Query {
    hello: String
  }
  type Subscription {
    greetings: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'world',
  },
  Subscription: {
    greetings: {
      subscribe: () => pubsub.asyncIterator(['GREETINGS_CHANNEL']),
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req: NextRequest) => ({ req, pubsub }),
});

export { handler as GET, handler as POST };
