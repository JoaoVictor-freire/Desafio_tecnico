# Pallet Portal — Sistema de Controle de Pokémons

Sistema fullstack para gerenciamento de Pokémons de um Centro Pokémon, onde treinadores podem cadastrar, visualizar, editar e excluir seus Pokémons. A lista de Pokémons é global e compartilhada entre todos os treinadores, mas apenas o criador pode editar ou remover seus próprios Pokémons.

**Monorepo** com npm workspaces: `backend/` (NestJS) + `frontend/` (Next.js).

---

## Pré-requisitos

- **Node.js** 18+
- **npm** 9+
- **PostgreSQL** (local ou remoto — ex.: Supabase)

---

## Variáveis de ambiente

Crie o arquivo `backend/.env`:

```env
DB_HOST=seu_host
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=seu_banco
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=7d
```

---

## Instalação

```bash
# Na raiz do monorepo
npm install
```

---

## Banco de dados

Na raiz do projeto existe o arquivo `init.sql` com o script de criação das tabelas. Execute-o no seu PostgreSQL antes de iniciar o backend:

```bash
psql -h seu_host -U seu_usuario -d seu_banco -f init.sql
```

> **Nota:** o backend usa `synchronize: true` no TypeORM, então as tabelas também são criadas automaticamente ao iniciar a aplicação. O script serve como referência ou para ambientes onde se prefira criar o schema manualmente.

---

## Executando

```bash
# Backend (porta 3002)
npm run dev:backend

# Frontend (porta 3001)
npm run dev:frontend
```

---

## Build

```bash
npm run build:backend
npm run build:frontend
```

---

## Testes

```bash
npm run test:backend
```

---

# Backend

**Stack:** NestJS 11 · TypeORM 0.3 · PostgreSQL · Passport-JWT · bcrypt · class-validator

## Estrutura

```
backend/src/
├── main.ts                    # Bootstrap, CORS, ValidationPipe
├── app.module.ts              # Módulo raiz (TypeORM, Config, módulos)
├── auth/
│   ├── auth.module.ts         # JWT config, Passport
│   ├── auth.controller.ts     # Register, Login, Logout
│   ├── auth.service.ts        # Hash de senha, geração de JWT
│   ├── jwt.strategy.ts        # Estratégia Passport-JWT
│   ├── jwt-auth.guard.ts      # Guard para rotas protegidas
│   └── dto/
│       ├── register.dto.ts    # Validação de cadastro
│       └── sign-in.dto.ts     # Validação de login
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts    # CRUD de usuário (perfil, exclusão)
│   ├── users.service.ts
│   ├── entities/
│   │   └── user.ts            # Entidade User
│   └── dto/
│       ├── create-user.dto.ts
│       └── update-user.dto.ts
└── pokemon/
    ├── pokemon.module.ts
    ├── pokemon.controller.ts  # CRUD de Pokémon (global + por usuário)
    ├── pokemon.service.ts
    ├── entities/
    │   └── pokemon.ts         # Entidade Pokemon
    └── dto/
        ├── create-pokemon.dto.ts
        └── update-pokemon.dto.ts
```

## Entidades

### User

| Campo    | Tipo         | Descrição                          |
|----------|--------------|------------------------------------|
| IdUser   | int (PK)     | ID auto-gerado                     |
| Name     | varchar(100) | Nome do treinador                  |
| Email    | varchar(100) | Email único                        |
| Password | varchar(100) | Hash bcrypt                        |
| Avatar   | varchar(10)  | ID do ícone de treinador (1–8)     |

### Pokemon

| Campo     | Tipo         | Descrição                           |
|-----------|--------------|-------------------------------------|
| IdPokemon | int (PK)     | ID auto-gerado                      |
| IdUser    | int (FK)     | Referência ao treinador (CASCADE)   |
| Name      | varchar(100) | Nome do Pokémon                     |
| Type      | varchar(100) | Tipo (Fire, Water, Grass...)        |
| Level     | smallint     | Nível (1–100)                       |
| Health    | smallint     | Pontos de vida (HP)                 |
| PokedexId | smallint     | Número da Pokédex (ID oficial, 1–151) |

## Endpoints da API

### Autenticação (`/auth`)

| Método | Rota             | Auth | Descrição                              |
|--------|------------------|------|----------------------------------------|
| POST   | `/auth/register` | Não  | Cadastro (Name, Email, Password)       |
| POST   | `/auth/login`    | Não  | Login — retorna JWT, name, avatar      |
| POST   | `/auth/logout`   | JWT  | Logout                                 |

### Usuários (`/users`)

| Método | Rota         | Auth | Descrição                                  |
|--------|--------------|------|--------------------------------------------|
| GET    | `/users/:id` | JWT  | Retorna perfil (somente o próprio usuário) |
| PATCH  | `/users/:id` | JWT  | Atualiza nome, senha ou avatar             |
| DELETE | `/users/:id` | JWT  | Exclui conta e todos os Pokémons           |

### Pokémons (`/pokemon`)

| Método | Rota                  | Auth | Descrição                                       |
|--------|-----------------------|------|-------------------------------------------------|
| POST   | `/pokemon`            | JWT  | Cria Pokémon (IdUser injetado do JWT)            |
| GET    | `/pokemon`            | JWT  | Lista todos os Pokémons (global, com treinador)  |
| GET    | `/pokemon/user/:uid`  | JWT  | Lista Pokémons do próprio usuário                |
| GET    | `/pokemon/:id`        | JWT  | Detalhes de um Pokémon                           |
| PATCH  | `/pokemon/:id`        | JWT  | Edita Pokémon (somente o dono)                   |
| DELETE | `/pokemon/:id`        | JWT  | Remove Pokémon (somente o dono)                  |

## Validação de senha

- Mínimo 8 caracteres
- Pelo menos 1 letra maiúscula
- Pelo menos 1 número
- Pelo menos 1 caractere especial

---

# Frontend

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4

**Estética:** Pixel-art com fonte Press Start 2P, sprites FireRed/LeafGreen da PokéAPI, paleta de cores inspirada em Kanto.

## Estrutura

```
frontend/
├── app/
│   ├── layout.tsx          # Layout raiz (fonte pixel, meta tags)
│   ├── page.tsx            # Landing page (bento-grid de Pokémons)
│   ├── globals.css         # Estilos globais (pixelated rendering)
│   ├── login/page.tsx      # Página de login
│   ├── register/page.tsx   # Página de cadastro
│   ├── dashboard/page.tsx  # Dashboard principal (auth guard)
│   ├── capture/page.tsx    # Captura de Pokémon (auth guard)
│   └── profile/page.tsx    # Edição de perfil (auth guard)
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx       # Formulário de login
│   │   ├── RegisterForm.tsx    # Formulário de cadastro
│   │   └── ProfileForm.tsx     # Edição de perfil + exclusão de conta
│   ├── layout/
│   │   └── Header.tsx          # Navbar com avatar, navegação, logout
│   └── pokemon/
│       ├── PokemonDashboard.tsx # Dashboard com filtro (todos/meus)
│       ├── PokemonList.tsx      # Grid de cards
│       ├── PokemonCard.tsx      # Card individual com sprite e tipo
│       ├── PokemonForm.tsx      # Formulário de edição com preview
│       └── PokemonCapture.tsx   # Captura via PokéAPI (Gen I)
├── hooks/
│   ├── useAuth.ts          # Autenticação (JWT, localStorage, logout)
│   └── usePokemon.ts       # CRUD de Pokémon + filtro (all/mine)
├── services/
│   └── api.ts              # Cliente HTTP (fetch + Bearer token)
├── lib/
│   ├── pixelStyle.ts       # Design tokens (cores, typeColors, estilos)
│   └── trainers.tsx        # 8 avatares SVG de treinadores
└── types/
    ├── auth.ts             # Interfaces de autenticação
    └── pokemon.ts          # Interfaces de Pokémon
```

## Páginas

| Rota         | Pública | Descrição                                                        |
|--------------|---------|------------------------------------------------------------------|
| `/`          | Sim     | Landing page com grid de Pokémons e links de login/cadastro      |
| `/login`     | Sim     | Formulário de login                                              |
| `/register`  | Sim     | Formulário de cadastro com validação de senha                    |
| `/dashboard` | Não     | Lista global de Pokémons com filtro todos/meus e busca por treinador |
| `/capture`   | Não     | 12 Pokémons aleatórios Gen I da PokéAPI para capturar            |
| `/profile`   | Não     | Edição de nome, avatar, senha e exclusão de conta                |

## Funcionalidades

- **Autenticação JWT** com persistência via localStorage
- **Lista global** de Pokémons com nome do treinador em cada card
- **Filtro dropdown** "Todos os Pokémons" / "Meus Pokémons" com estado persistente
- **Busca por treinador** (lupa) ao visualizar todos os Pokémons
- **CRUD completo** — criar (via captura), editar, excluir (somente os próprios)
- **Captura** de Pokémons Gen I da PokéAPI com sprites FireRed/LeafGreen
- **Número da Pokédex** (#ID) exibido no canto superior esquerdo de cada card
- **8 avatares de treinador** selecionáveis no perfil
- **Edição de perfil** com nome, avatar e troca de senha
- **Exclusão de conta** com confirmação
- **Sprite preview** em tempo real ao editar nome do Pokémon
- **Cores por tipo** — fundo e acentos dinâmicos (Fire, Water, Grass...)
