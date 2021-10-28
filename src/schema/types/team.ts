import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import Player from './player';

import { default as entityPlayer } from 'src/entities/player';
import { Team, TeamPlayer } from '../../entities/team';
import Context from 'src/context/context';

function getTeamPlayer(teamId: number, context: Context): Promise<entityPlayer[]> {
  console.log("retrieving player of team: " + teamId)
  // https://orkhan.gitbook.io/typeorm/docs/select-query-builder

  const teamplayerQb = context.connection.getRepository(TeamPlayer)
    .createQueryBuilder("teamplayer")
    .select("teamplayer.id_player")
    .where("teamplayer.id_team = :id_team", { id_team: teamId });

  return context.repositories.player
    .createQueryBuilder("player")
    .where("player.id IN (" + teamplayerQb.getQuery() + ")")
    .setParameters(teamplayerQb.getParameters())
    .getMany();
}

const team = new GraphQLObjectType({
  name: 'Team',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: 'Database id of the team',
      resolve: (t: Team): number => {
        return t.id;
      }
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Name of the team',
      resolve: (t: Team): string => {
        return t.name;
      }
    },
    players: {
      type: GraphQLList(Player),
      description: 'Players of the team',
      resolve: (parent: Team, _, context: Context): Promise<entityPlayer[]> => {
        let res = getTeamPlayer(parent.id, context);
        return res;
      }
    }
  })
});

export default team;