import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user';

@Entity()
export class Pokemon {
    @PrimaryGeneratedColumn()
    IdPokemon: number;

    @Column()
    IdUser: number;

    @Column({length: 100})
    Name: string;

    @Column({length: 100})
    Type: string;

    @Column({type: 'smallint'})
    Level: number;

    @Column({type: 'smallint'})
    HP: number;

    @ManyToOne(() => User, user => user.Pokemons, {onDelete: 'CASCADE'})
    @JoinColumn ({ name: 'IdUser' })
    user: User;
}