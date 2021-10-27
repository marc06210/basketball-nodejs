import Player from "src/entities/player";
import { Repository } from "typeorm";

interface RepositoriesContext {
    player: Repository<Player>;
}

export default interface Context {
    repositories: RepositoriesContext;
}