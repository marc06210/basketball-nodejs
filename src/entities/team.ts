import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Team {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
};

@Entity()
@Index(["id_team", "id_player"], { unique: true })
class TeamPlayer {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    id_team: number;
    @Column()
    id_player: number;
};

export { Team, TeamPlayer };