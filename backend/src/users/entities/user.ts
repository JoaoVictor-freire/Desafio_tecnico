import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pokemon } from '../../pokemon/entities/pokemon';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    IdUser: number;

    @Column({length: 100})
    Name: string;

    @Column({length: 100, unique: true})
    Email: string;

    @Column({length: 100})
    Password: string;

    @OneToMany(() => Pokemon, pokemon => pokemon.user)
    Pokemons: Pokemon[];
}