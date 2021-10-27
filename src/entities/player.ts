import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    lastname: string;
    @Column()
    firstname: string;
}

export default Player;