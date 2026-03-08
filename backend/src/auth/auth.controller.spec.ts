import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const mockAuthService = {
  register: jest.fn(),
  login: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('deve retornar mensagem de sucesso com dados do usuário', async () => {
      const user = { IdUser: 1, Name: 'Ash', Email: 'ash@pallet.com', Avatar: '1' };
      mockAuthService.register.mockResolvedValue(user);

      const dto = { Name: 'Ash', Email: 'ash@pallet.com', Password: 'Pika1@chu' };
      const result = await controller.register(dto);

      expect(result.message).toBe('Treinador registrado com sucesso!');
      expect(result.user).toEqual(user);
    });
  });

  describe('login', () => {
    it('deve retornar o resultado do AuthService', async () => {
      const loginResult = { access_token: 'tok', name: 'Ash', avatar: '1' };
      mockAuthService.login.mockResolvedValue(loginResult);

      const dto = { Email: 'ash@pallet.com', Password: 'Pika1@chu' };
      const result = await controller.login(dto);

      expect(result).toEqual(loginResult);
    });
  });

  describe('logout', () => {
    it('deve retornar mensagem de logout', () => {
      const result = controller.logout();
      expect(result.message).toBe('Logout realizado com sucesso!');
    });
  });
});
