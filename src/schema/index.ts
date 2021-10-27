import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import player from './queries/player';
import hello from './queries/hello';
import players from './queries/players';

// see https://github.com/juffalow/express-graphql-example/blob/master/src/schema/index.ts

const query = new GraphQLObjectType({
    name: 'Query',
    fields: (): any => ({
      hello,
      player,
      players,
    }),
  });

export default new GraphQLSchema({
  query,
});