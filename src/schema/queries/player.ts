// import { GraphQLString } from 'graphql';
import { GraphQLNonNull, GraphQLID } from 'graphql';
import Context from 'src/context/context';
import Player from 'src/entities/player';
import { default as playerType } from '../types/player';

interface PlayerQueryArguments {
  id: number;
}

const player = {
  type: playerType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    }
  },
  resolve: (_: any, args: PlayerQueryArguments, context: Context): Promise<Player | undefined> => {
    return context.repositories.player.findOne(args.id);
  },
};

export default player;