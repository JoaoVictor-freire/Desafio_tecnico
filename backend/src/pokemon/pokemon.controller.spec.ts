import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

const mockPokemon = { IdPokemon: 1, IdUser: 1, Name: 'Pikachu', Type: 'Electric', Level: 25, Health: 35, PokedexId: 25 };

const mockPokemonService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findAllByUser: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('PokemonController', () => {
  let controller: PokemonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [{ provide: PokemonService, useValue: mockPokemonService }],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('deve criar pokémon com IdUser do JWT', async () => {
      mockPokemonService.create.mockResolvedValue(mockPokemon);
      const dto = { Name: 'Pikachu', Type: 'Electric', Level: 25, Health: 35, PokedexId: 25, IdUser: 0 };
      const req = { user: { IdUser: 1 } };

      const result = await controller.create(dto, req);

      expect(dto.IdUser).toBe(1);
      expect(result).toEqual(mockPokemon);
    });
  });

  describe('findAll', () => {
    it('deve retornar lista de pokémons', async () => {
      mockPokemonService.findAll.mockResolvedValue([mockPokemon]);
      const result = await controller.findAll();
      expect(result).toEqual([mockPokemon]);
    });
  });

  describe('findAllByUser', () => {
    it('deve retornar pokémons do usuário autenticado', async () => {
      mockPokemonService.findAllByUser.mockResolvedValue([mockPokemon]);
      const req = { user: { IdUser: 1 } };

      const result = await controller.findAllByUser(1, req);
      expect(result).toEqual([mockPokemon]);
    });

    it('deve lançar ForbiddenException ao acessar pokémons de outro usuário', async () => {
      const req = { user: { IdUser: 2 } };
      await expect(controller.findAllByUser(1, req)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('findOne', () => {
    it('deve retornar o pokémon pelo ID', async () => {
      mockPokemonService.findOne.mockResolvedValue(mockPokemon);
      const result = await controller.findOne(1);
      expect(result).toEqual(mockPokemon);
    });
  });

  describe('update', () => {
    it('deve atualizar o pokémon do próprio usuário', async () => {
      mockPokemonService.findOne.mockResolvedValue(mockPokemon);
      mockPokemonService.update.mockResolvedValue({ ...mockPokemon, Level: 30 });
      const req = { user: { IdUser: 1 } };

      const result = await controller.update(1, { Level: 30 }, req);
      expect(result.Level).toBe(30);
    });

    it('deve lançar ForbiddenException ao tentar editar pokémon de outro usuário', async () => {
      mockPokemonService.findOne.mockResolvedValue({ ...mockPokemon, IdUser: 2 });
      const req = { user: { IdUser: 1 } };

      await expect(controller.update(1, { Level: 30 }, req)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('remove', () => {
    it('deve remover o pokémon do próprio usuário', async () => {
      mockPokemonService.findOne.mockResolvedValue(mockPokemon);
      mockPokemonService.remove.mockResolvedValue(undefined);
      const req = { user: { IdUser: 1 } };

      await expect(controller.remove(1, req)).resolves.toBeUndefined();
    });

    it('deve lançar ForbiddenException ao tentar remover pokémon de outro usuário', async () => {
      mockPokemonService.findOne.mockResolvedValue({ ...mockPokemon, IdUser: 2 });
      const req = { user: { IdUser: 1 } };

      await expect(controller.remove(1, req)).rejects.toThrow(ForbiddenException);
    });
  });
});
