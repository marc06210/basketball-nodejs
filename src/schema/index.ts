import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import player from './queries/players';
import hello from './queries/hello';

// see https://github.com/juffalow/express-graphql-example/blob/master/src/schema/index.ts

const query = new GraphQLObjectType({
    name: 'Query',
    fields: (): any => ({
      hello,
      player,
    }),
  });

export default new GraphQLSchema({
  query,
});