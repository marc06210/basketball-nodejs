import { GraphQLNonNull, GraphQLID } from 'graphql';
import Context from 'src/context/context';
import { Team } from 'src/entities/team';
import { default as teamType } from '../types/team';

interface TeamQueryArguments {
  id: number;
}

const team = {
  type: teamType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    }
  },
  resolve: (_: any, args: TeamQueryArguments, context: Context): Promise<Team | undefined> => {
    return context.repositories.team.findOne(args.id);
  },
};

export default team;