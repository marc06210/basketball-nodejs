import { GraphQLNonNull, GraphQLString } from 'graphql';
import Context from '../../context/Context';

import Player from '../../entities/player';
import { default as playerType } from '../types/player';

const createPlayer = {
    type: playerType,
    args: {
        lastname: {
            type: GraphQLNonNull(GraphQLString),
            description: "Lastname of the player to create",
        },
        firstname: {
            type: GraphQLNonNull(GraphQLString),
            description: "Firstname of the player to create"
        },
    },
    resolve: (_: any, input: any, context: Context): Promise<Player> => {
        var player = new Player();
        player.firstname = input.firstName;
        player.lastname = input.lastName;
        return context.repositories.player.save(input);
    },
};

export default createPlayer;