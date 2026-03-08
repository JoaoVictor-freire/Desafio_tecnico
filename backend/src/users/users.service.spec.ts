import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { User } from './entities/user';

const mockUser: User = {
  IdUser: 1,
  Name: 'Ash Ketchum',
  Email: 'ash@pallet.com',
  Password: 'hashed_password',
  Avatar: '1',
  Pokemons: [],
};

const mockRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  // --- create ---

  describe('create', () => {
    it('deve criar e retornar o usuário quando email é novo', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue(mockUser);
      mockRepository.save.mockResolvedValue(mockUser);

      const result = await service.create({ Name: 'Ash', Email: 'ash@pallet.com', Password: 'hash' });

      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUser);
    });

    it('deve lançar ConflictException quando email já está cadastrado', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);

      await expect(
        service.create({ Name: 'Ash', Email: 'ash@pallet.com', Password: 'hash' }),
      ).rejects.toThrow(ConflictException);
    });
  });

  // --- findByEmail ---

  describe('findByEmail', () => {
    it('deve retornar o usuário quando email existe', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);
      const result = await service.findByEmail('ash@pallet.com');
      expect(result).toEqual(mockUser);
    });

    it('deve retornar null quando email não existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      const result = await service.findByEmail('naoexiste@test.com');
      expect(result).toBeNull();
    });
  });

  // --- findById ---

  describe('findById', () => {
    it('deve retornar o usuário quando ID existe', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);
      const result = await service.findById(1);
      expect(result).toEqual(mockUser);
    });

    it('deve lançar NotFoundException quando ID não existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.findById(999)).rejects.toThrow(NotFoundException);
    });
  });

  // --- update ---

  describe('update', () => {
    it('deve atualizar o nome do usuário', async () => {
      mockRepository.findOne.mockResolvedValue({ ...mockUser });
      mockRepository.save.mockResolvedValue({ ...mockUser, Name: 'Gary' });

      const result = await service.update(1, { Name: 'Gary' });
      expect(result.Name).toBe('Gary');
    });

    it('deve re-hashear a senha quando ela é atualizada', async () => {
      mockRepository.findOne.mockResolvedValue({ ...mockUser });
      mockRepository.save.mockImplementation(async (user) => user);

      const result = await service.update(1, { Password: 'NovaSenha1@' });
      const isHashed = await bcrypt.compare('NovaSenha1@', result.Password);
      expect(isHashed).toBe(true);
    });

    it('deve lançar NotFoundException quando ID não existe', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.update(999, { Name: 'Gary' })).rejects.toThrow(NotFoundException);
    });
  });

  // --- remove ---

  describe('remove', () => {
    it('deve remover o usuário existente', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);
      mockRepository.remove.mockResolvedValue(undefined);

      await expect(service.remove(1)).resolves.toBeUndefined();
      expect(mockRepository.remove).toHaveBeenCalledWith(mockUser);
    });

    it('deve lançar NotFoundException ao tentar remover ID inexistente', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
