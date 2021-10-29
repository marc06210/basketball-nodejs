import { GraphQLList } from 'graphql';
import Context from '../../context/context';
import Player from '../../entities/player';
import { default as playerType } from '../types/player';

export default {
  type: new GraphQLList(playerType),
  resolve: (_: any, { }, context: Context): Promise<Player[]> => {
    return context.repositories.player.find();
  },
};
