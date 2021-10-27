// import { GraphQLString } from 'graphql';
import Context from 'src/context/context';
import Player from 'src/entities/player';
import { default as playerType } from '../types/player';

// interface QuotesQueryArguments {
//   query: string;
// }

const player = {
  type: playerType,
  // args: {
  //   query: {
  //     type: GraphQLString,
  //   }
  // },
  resolve: (_: any, {}, context: Context): Promise<Player | undefined> => {
    // console.log(obj);
    // console.log(args);
    return context.repositories.player.findOne(1);
  },
};

export default player;