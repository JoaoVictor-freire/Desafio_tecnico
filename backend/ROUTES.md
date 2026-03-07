# Rotas da API — Pokédex

Base URL: `http://localhost:3002`

---

## Autenticação

Todas as rotas marcadas com 🔒 exigem o header:
```
Authorization: Bearer <access_token>
```
O `access_token` é obtido na rota de login.

---

## Auth

### Registrar treinador
```
POST /auth/register
```
**Body:**
```json
{
    "Name": "Ash Ketchum",
    "Email": "ash@pokemon.com",
    "Password": "pikachu123"
}
```
**Resposta (201):**
```json
{
    "message": "Treinador registrado com sucesso!",
    "user": {
        "IdUser": 1,
        "Name": "Ash Ketchum",
        "Email": "ash@pokemon.com"
    }
}
```

---

### Login
```
POST /auth/login
```
**Body:**
```json
{
    "Email": "ash@pokemon.com",
    "Password": "pikachu123"
}
```
**Resposta (200):**
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Users

### 🔒 Atualizar usuário
```
PATCH /users/:id
```
**Exemplo:** `PATCH /users/1`

> Só é permitido atualizar o próprio perfil (o ID do token deve ser igual ao `:id`).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Body** (todos os campos são opcionais):
```json
{
    "Name": "Ash Ketchum Jr.",
    "Email": "ash2@pokemon.com",
    "Password": "novaSenha123"
}
```
**Resposta (200):**
```json
{
    "IdUser": 1,
    "Name": "Ash Ketchum Jr.",
    "Email": "ash2@pokemon.com"
}
```

---

### 🔒 Deletar usuário
```
DELETE /users/:id
```
**Exemplo:** `DELETE /users/1`

> Só é permitido deletar o próprio perfil.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Body:** nenhum

**Resposta:** `204 No Content`

---

## Pokémon

### 🔒 Criar pokémon
```
POST /pokemon
```
> O `IdUser` é preenchido automaticamente a partir do token. Não precisa enviar no body.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Body:**
```json
{
    "Name": "Pikachu",
    "Type": "Electric",
    "Level": 25,
    "Health": 100
}
```
**Resposta (201):**
```json
{
    "IdPokemon": 1,
    "IdUser": 1,
    "Name": "Pikachu",
    "Type": "Electric",
    "Level": 25,
    "Health": 100
}
```

---

### 🔒 Listar pokémons de um usuário
```
GET /pokemon/user/:userId
```
**Exemplo:** `GET /pokemon/user/1`

> Só é permitido listar os próprios pokémons.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Body:** nenhum

**Resposta (200):**
```json
[
    {
        "IdPokemon": 1,
        "IdUser": 1,
        "Name": "Pikachu",
        "Type": "Electric",
        "Level": 25,
        "Health": 100
    }
]
```

---

### 🔒 Buscar pokémon por ID
```
GET /pokemon/:id
```
**Exemplo:** `GET /pokemon/1`

> Só é permitido buscar pokémons que pertencem a você.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Body:** nenhum

**Resposta (200):**
```json
{
    "IdPokemon": 1,
    "IdUser": 1,
    "Name": "Pikachu",
    "Type": "Electric",
    "Level": 25,
    "Health": 100
}
```

---

### 🔒 Atualizar pokémon
```
PATCH /pokemon/:id
```
**Exemplo:** `PATCH /pokemon/1`

> Só é permitido atualizar pokémons que pertencem a você.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Body** (todos os campos são opcionais):
```json
{
    "Name": "Raichu",
    "Type": "Electric",
    "Level": 36,
    "Health": 120
}
```
**Resposta (200):**
```json
{
    "IdPokemon": 1,
    "IdUser": 1,
    "Name": "Raichu",
    "Type": "Electric",
    "Level": 36,
    "Health": 120
}
```

---

### 🔒 Deletar pokémon
```
DELETE /pokemon/:id
```
**Exemplo:** `DELETE /pokemon/1`

> Só é permitido deletar pokémons que pertencem a você.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Body:** nenhum

**Resposta:** `204 No Content`

---

## Códigos de erro comuns

| Código | Descrição |
|--------|-----------|
| `400` | Dados inválidos na requisição |
| `401` | Token ausente, expirado ou inválido |
| `403` | Acesso negado (recurso não pertence a você) |
| `404` | Recurso não encontrado |
| `409` | Email já cadastrado |
