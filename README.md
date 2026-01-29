# 🎵 Gerenciador de Partituras (Clave)

O **Gerenciador de Partituras** é uma aplicação web full stack criada para organizar, armazenar e gerenciar partituras musicais.

## ⚙️ Funcionalidades

### Autenticação
- Cadastro de usuário
- Login com email e senha
- Autenticação via JWT
- Proteção de rotas

### Partituras
- Criar partitura
- Editar partitura
- Excluir partitura
- Listar todas as partituras
- Visualizar detalhes da partitura
- Upload de arquivo
- Download do arquivo associado

### Arquivos
- Upload usando Multer
- Tipos de arquivo permitidos:
  - PDF
  - PNG / JPG
  - DOC / DOCX
  - ZIP


## 🧰 Tecnologias e Ferramentas

| Categoria     | Tecnologias / Ferramentas |
|--------------|----------------------------|
| **Backend**  | Node.js<br>TypeScript<br>Express<br>Prisma ORM<br>PostgreSQL<br>JWT (jsonwebtoken)<br>bcrypt<br>Multer<br>ESLint<br>ts-node-dev |
| **Frontend** | React<br>TypeScript<br>Axios<br>CSS |
| **Banco de Dados** | PostgreSQL |

## 🗄️ Modelos do Banco de Dados

### User

| Campo        | Tipo        | Descrição |
|-------------|------------|-----------|
| `id`        | UUID       | Identificador único do usuário |
| `name`      | String     | Nome do usuário |
| `email`     | String     | Email do usuário (único) |
| `password`  | String     | Senha criptografada |
| `createdAt` | DateTime   | Data de criação do registro |
| `updatedAt` | DateTime   | Data da última atualização |


### Score (Partitura)

| Campo        | Tipo        | Descrição |
|-------------|------------|-----------|
| `id`        | UUID       | Identificador único da partitura |
| `name`      | String     | Nome da partitura |
| `instrument`| String     | Instrumento principal |
| `tone`      | String     | Tom da música |
| `composer`  | String     | Compositor |
| `description` | String   | Descrição ou observações |
| `filePath`  | String     | Caminho do arquivo no servidor |
| `createdAt` | DateTime   | Data de criação |
| `updatedAt` | DateTime   | Data da última atualização |


# Como rodar o projeto

## 1. Pré-requisitos

- Node.js (v18 ou superior)
- PostgreSQL
- npm ou yarn

## Criando o banco de dados

No PostgreSQL, crie o banco:
```sql
CREATE DATABASE gerenciador_partituras;
```
## Configurando o Backend

### 1. Acesse a pasta do backend
```bash
cd back
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Crie o arquivo `.env`
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/gerenciador_partituras"
JWT_SECRET="chave-super-secreta"
API_URL="http://localhost:3333"
PORT=3333
```

### 4. Rodar as migrations
```bash
npx prisma migrate dev
```

### 5. Iniciar o servidor
```bash
npm run dev
```

**Backend rodando em:** `http://localhost:3333`

---

## Configurando o Frontend

### 1. Acesse a pasta do front
```bash
cd front/my-app
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Inicie o projeto
```bash
npm start
```

**Frontend rodando em:** `http://localhost:3000`

##  Rotas da API

### Autenticação

| Método | Rota            | Descrição |
|------|------------------|-----------|
| POST | `/auth/register` | Cadastro de usuário |
| POST | `/auth/login`    | Login e geração de token JWT |

Após login, a API retorna:
```json
{
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "name": "Nome do Usuário",
    "email": "email@email.com"
  }
}
```

O token deve ser enviado no header:
```
Authorization: Bearer <token>
```

### Partituras

> Todas as rotas abaixo exigem autenticação JWT

| Método | Rota               | Descrição |
|------|---------------------|-----------|
| POST | `/scores`           | Criar uma nova partitura |
| GET  | `/scores`           | Listar todas as partituras |
| GET  | `/scores/:id`       | Buscar partitura por ID |
| PUT  | `/scores/:id`       | Atualizar partitura |
| DELETE | `/scores/:id`     | Excluir partitura |
| POST | `/scores/upload`    | Upload do arquivo da partitura |
| GET  | `/scores/download/:id` | Download do arquivo |


