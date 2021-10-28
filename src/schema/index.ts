import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import player from './queries/player';
import hello from './queries/hello';
import players from './queries/players';
import team from './queries/team';
import createPlayer from './mutations/createPlayer';

// see https://github.com/juffalow/express-graphql-example/blob/master/src/schema/index.ts

const query = new GraphQLObjectType({
  name: 'Query',
  fields: (): any => ({
    hello,
    player,
    players,
    team,
  }),
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: (): any => ({
    createPlayer,
  }),
});

export default new GraphQLSchema({
  query,
  mutation,
});