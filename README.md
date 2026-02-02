# Gerenciador de Partituras (Clave)

O Gerenciador de Partituras é uma aplicação web full stack criada para organizar, armazenar e gerenciar partituras musicais.

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias e Ferramentas](#tecnologias-e-ferramentas)
- [Modelos do Banco de Dados](#modelos-do-banco-de-dados)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
  - [Pré-requisitos](#pré-requisitos)
  - [Configurando o Banco de Dados](#configurando-o-banco-de-dados)
  - [Configurando o Backend](#configurando-o-backend)
  - [Configurando o Frontend](#configurando-o-frontend)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Rotas da API](#rotas-da-api)
- [Tela Principal](#tela-principal)
- [Autora](#autora)

---

## Funcionalidades

### Autenticação
- Cadastro de usuário
- Login com email e senha
- Autenticação via JWT
- Proteção de rotas privadas

### Gerenciamento de Partituras
- Criar partitura com informações detalhadas (nome, compositor, instrumento, tom, descrição)
- Editar partituras existentes
- Excluir partituras
- Listar todas as partituras cadastradas
- Visualizar detalhes completos de cada partitura
- Upload de arquivo da partitura (PDF, PNG, JPG)
- Download do arquivo associado à partitura
- Visualização de arquivo anexado

## Tecnologias e Ferramentas

| Categoria | Tecnologias |
|-----------|-------------|
| **Backend** | Node.js, TypeScript, Express, Prisma ORM, JWT (jsonwebtoken), bcrypt, Multer, ts-node-dev, ESLint |
| **Frontend** | React, TypeScript, React Router DOM, Axios, CSS3 |
| **Banco de Dados** | PostgreSQL |

## Modelos do Banco de Dados

### User (Usuário)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | Identificador único do usuário |
| `name` | String | Nome completo do usuário |
| `email` | String | Email do usuário (único) |
| `password` | String | Senha criptografada com bcrypt |
| `createdAt` | DateTime | Data de criação do registro |
| `updatedAt` | DateTime | Data da última atualização |

### Score (Partitura)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | Identificador único da partitura |
| `name` | String | Nome da partitura |
| `composer` | String | Nome do compositor |
| `instrument` | String | Instrumento principal |
| `tone` | String | Tom da música |
| `description` | String | Descrição ou observações |
| `filePath` | String | Nome do arquivo no servidor |
| `fileName` | String | Nome original do arquivo |
| `createdAt` | DateTime | Data de criação |
| `updatedAt` | DateTime | Data da última atualização |

## Como Rodar o Projeto

### Pré-requisitos

Certifique-se de ter instalado:
- Node.js (versão 18 ou superior)
- PostgreSQL (versão 12 ou superior)
- npm ou yarn

### Configurando o Banco de Dados

1. Abra o PostgreSQL e crie o banco de dados:
```sql
CREATE DATABASE gerenciador_partituras;
```

2. Anote as credenciais de acesso (usuário, senha, host, porta).

### Configurando o Backend

1. Navegue até a pasta do backend:
```bash
cd back
```

2. Instale as dependências:
```bash
npm install
```

3. Crie o arquivo `.env` na raiz da pasta `back`:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/partituras"
JWT_SECRET="sua-chave-secreta-aqui"
API_URL="http://localhost:3333"
PORT=3333
```

4. Execute as migrations do Prisma:
```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O backend estará rodando em `http://localhost:3333`

### Configurando o Frontend

1. Em outro terminal, navegue até a pasta do frontend:
```bash
cd front/my-app
```

2. Instale as dependências:
```bash
npm install
```

3. Crie o arquivo `.env` na raiz da pasta `my-app`:
```env
REACT_APP_API_URL=http://localhost:3333
```

4. Inicie o servidor de desenvolvimento:
```bash
npm start
```

O frontend estará rodando em `http://localhost:3000`


## Variáveis de Ambiente

### Backend

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | String de conexão com o PostgreSQL |
| `JWT_SECRET` | Chave secreta para assinatura do token JWT |
| `API_URL` | URL base da API (ex: http://localhost:3333) |
| `PORT` | Porta onde o servidor irá rodar (padrão: 3333) |

### Frontend

| Variável | Descrição |
|----------|-----------|
| `REACT_APP_API_URL` | URL base da API para requisições do frontend |

## Rotas da API

### Autenticação

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/register` | Cadastro de novo usuário |
| POST | `/auth/login` | Login e geração de token JWT |

**Exemplo de resposta do login:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "Nome do Usuário",
    "email": "email@exemplo.com"
  }
}
```

**Autenticação:** Para acessar as rotas protegidas, inclua o token no header:
```
Authorization: Bearer <seu_token_jwt>
```

### Partituras

Todas as rotas abaixo requerem autenticação JWT.

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/scores` | Criar uma nova partitura (com upload de arquivo) |
| GET | `/scores` | Listar todas as partituras do sistema |
| GET | `/scores/:id` | Buscar partitura específica por ID |
| PUT | `/scores/:id` | Atualizar informações da partitura |
| DELETE | `/scores/:id` | Excluir partitura e arquivo associado |

### Arquivos

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/files/:filename` | Acessar/baixar arquivo da partitura |

**Formatos de arquivo aceitos:** PDF, PNG, JPG (até 10MB)



## Tela Principal


<p align="center">
  <img src="img/main.png" alt="Tela de Login" width="500" />
</p>


## Autora

Entre em contato: [nalauramoura@gmail.com](mailto:nalauramoura@gmail.com)
