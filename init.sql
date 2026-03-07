-- Pallet Portal — Script de criação do banco de dados PostgreSQL
-- Execute este script para criar as tabelas necessárias para o backend.

CREATE TABLE IF NOT EXISTS "user" (
    "IdUser"   SERIAL       PRIMARY KEY,
    "Name"     VARCHAR(100) NOT NULL,
    "Email"    VARCHAR(100) NOT NULL UNIQUE,
    "Password" VARCHAR(100) NOT NULL,
    "Avatar"   VARCHAR(10)  DEFAULT '1'
);

CREATE TABLE IF NOT EXISTS "pokemon" (
    "IdPokemon" SERIAL       PRIMARY KEY,
    "IdUser"    INTEGER      NOT NULL REFERENCES "user"("IdUser") ON DELETE CASCADE,
    "Name"      VARCHAR(100) NOT NULL,
    "Type"      VARCHAR(100) NOT NULL,
    "Level"     SMALLINT     NOT NULL,
    "Health"    SMALLINT     NOT NULL,
    "PokedexId" SMALLINT
);

CREATE INDEX IF NOT EXISTS "idx_pokemon_user" ON "pokemon"("IdUser");
