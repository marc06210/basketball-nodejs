import Player from "src/entities/player";
import { Team } from "src/entities/team";
import { Connection, Repository } from "typeorm";

interface RepositoriesContext {
    player: Repository<Player>;
    team: Repository<Team>;
}

export default interface Context {
    connection: Connection;
    repositories: RepositoriesContext;
}