import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './entities/pokemon';

const mockPokemon: Pokemon = {
  IdPokemon: 1,
  IdUser: 1,
  Name: 'Pikachu',
  Type: 'Electric',
  Level: 25,
  Health: 35,
  PokedexId: 25,
  user: null,
};

const mockQueryBuilder = {
  leftJoin: jest.fn().mockReturnThis(),
  addSelect: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  getMany: jest.fn(),
};

const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
};

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        { provide: getRepositoryToken(Pokemon), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    jest.clearAllMocks();
    mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  // --- create ---

  describe('create', () => {
    it('deve criar e salvar um pokémon', async () => {
      mockRepository.create.mockReturnValue(mockPokemon);
      mockRepository.save.mockResolvedValue(mockPokemon);

      const dto = { IdUser: 1, Name: 'Pikachu', Type: 'Electric', Level: 25, Health: 35, PokedexId: 25 };
      const result = await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockPokemon);
    });
  });

  // --- findAll ---

  describe('findAll', () => {
    it('deve retornar lista de pokémons com query builder', async () => {
      mockQueryBuilder.getMany.mockResolvedValue([mockPokemon]);

      const result = await service.findAll();

      expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('p');
      expect(result).toEqual([mockPokemon]);
    });
  });

  // --- findAllByUser ---

  describe('findAllByUser', () => {
    it('deve retornar pokémons do usuário informado', async () => {
      mockRepository.find.mockResolvedValue([mockPokemon]);

      const result = await service.findAllByUser(1);

      expect(mockRepository.find).toHaveBeenCalledWith({ where: { IdUser: 1 } });
      expect(result).toEqual([mockPokemon]);
    });

    it('deve retornar array vazio para usuário sem pokémons', async () => {
      mockRepository.find.mockResolvedValue([]);
      const result = await service.findAllByUser(99);
      expect(result).toEqual([]);
    });
  });

  // --- findOne ---

  describe('findOne', () => {
    it('deve retornar o pokémon quando ID existe', async () => {
      mockRepository.findOne.mockResolvedValue(mockPokemon);
      const result = await service.findOne(1);
      expect(result).toEqual(mockPokemon);
    });

    it('deve lançar NotFoundException quando ID não existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  // --- update ---

  describe('update', () => {
    it('deve atualizar os campos fornecidos do pokémon', async () => {
      mockRepository.findOne.mockResolvedValue({ ...mockPokemon });
      mockRepository.save.mockResolvedValue({ ...mockPokemon, Level: 36 });

      const result = await service.update(1, { Level: 36 });
      expect(result.Level).toBe(36);
    });

    it('deve lançar NotFoundException ao atualizar ID inexistente', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.update(999, { Level: 10 })).rejects.toThrow(NotFoundException);
    });
  });

  // --- remove ---

  describe('remove', () => {
    it('deve remover o pokémon existente', async () => {
      mockRepository.findOne.mockResolvedValue(mockPokemon);
      mockRepository.remove.mockResolvedValue(undefined);

      await expect(service.remove(1)).resolves.toBeUndefined();
      expect(mockRepository.remove).toHaveBeenCalledWith(mockPokemon);
    });

    it('deve lançar NotFoundException ao remover ID inexistente', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
