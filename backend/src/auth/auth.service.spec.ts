import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

const mockUsersService = {
  create: jest.fn(),
  findByEmail: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('test-jwt-token'),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  // --- register ---

  describe('register', () => {
    it('deve registrar um treinador e retornar dados sem senha', async () => {
      const dto = { Name: 'Ash', Email: 'ash@pallet.com', Password: 'Pika1@chu' };
      const savedUser = { IdUser: 1, Name: 'Ash', Email: 'ash@pallet.com', Password: 'hashed', Avatar: '1' };
      mockUsersService.create.mockResolvedValue(savedUser);

      const result = await service.register(dto);

      expect(mockUsersService.create).toHaveBeenCalledTimes(1);
      expect(result).not.toHaveProperty('Password');
      expect(result.Name).toBe('Ash');
    });

    it('deve repassar exceção lançada pelo UsersService (ex: email duplicado)', async () => {
      mockUsersService.create.mockRejectedValue(new Error('Email já cadastrado'));
      await expect(
        service.register({ Name: 'Ash', Email: 'ash@pallet.com', Password: 'Pika1@chu' }),
      ).rejects.toThrow('Email já cadastrado');
    });
  });

  // --- login ---

  describe('login', () => {
    it('deve retornar access_token, name e avatar com credenciais corretas', async () => {
      const plainPassword = 'Pika1@chu';
      const hashed = await bcrypt.hash(plainPassword, 10);
      mockUsersService.findByEmail.mockResolvedValue({
        IdUser: 1, Email: 'ash@pallet.com', Name: 'Ash', Avatar: '3', Password: hashed,
      });

      const result = await service.login('ash@pallet.com', plainPassword);

      expect(result.access_token).toBe('test-jwt-token');
      expect(result.name).toBe('Ash');
      expect(result.avatar).toBe('3');
    });

    it('deve retornar avatar padrão "1" quando Avatar não está definido', async () => {
      const hashed = await bcrypt.hash('Pika1@chu', 10);
      mockUsersService.findByEmail.mockResolvedValue({
        IdUser: 1, Email: 'ash@pallet.com', Name: 'Ash', Avatar: null, Password: hashed,
      });

      const result = await service.login('ash@pallet.com', 'Pika1@chu');
      expect(result.avatar).toBe('1');
    });

    it('deve lançar UnauthorizedException quando usuário não existe', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);
      await expect(service.login('naoexiste@test.com', 'Pika1@chu'))
        .rejects.toThrow(UnauthorizedException);
    });

    it('deve lançar UnauthorizedException com senha errada', async () => {
      const hashed = await bcrypt.hash('SenhaCorreta1@', 10);
      mockUsersService.findByEmail.mockResolvedValue({
        IdUser: 1, Email: 'ash@pallet.com', Password: hashed,
      });

      await expect(service.login('ash@pallet.com', 'SenhaErrada1@'))
        .rejects.toThrow(UnauthorizedException);
    });
  });

  // --- hashPassword ---

  describe('hashPassword', () => {
    it('deve retornar hash diferente da senha original', async () => {
      const hash = await service.hashPassword('Minha1@Senha');
      expect(hash).not.toBe('Minha1@Senha');
    });

    it('hash gerado deve ser verificável com bcrypt', async () => {
      const plain = 'Minha1@Senha';
      const hash = await service.hashPassword(plain);
      const isMatch = await bcrypt.compare(plain, hash);
      expect(isMatch).toBe(true);
    });
  });
});
