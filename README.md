# Lena's Bakery 🍰

## Sobre o projeto

Lena's Bakery é uma API REST desenvolvida para gerenciar encomendas de uma confeitaria que trabalha com pedidos personalizados.

O sistema permite cadastrar, consultar, atualizar e excluir encomendas, relacionando cada pedido a um cliente cadastrado.

## Tecnologias utilizadas

- Node.js
- Express
- Prisma ORM
- SQLite
- Postman

## Estrutura do projeto

- `src/controllers`: lógica das operações da API.
- `src/routes`: definição das rotas.
- `src/middlewares`: validação de dados, validação de IDs e registro de requisições.
- `prisma`: schema e banco de dados.

## Como executar o projeto

1. Clone o repositório:
   `git clone https://github.com/mvvieiraa/lenas-bakery.git`

2. Entre na pasta:
   `cd lenas-bakery`

3. Instale as dependências:
   `npm install`

4. Execute as migrações:
   `npx prisma migrate deploy`

5. Inicie o servidor:
   `node src/server.js`

A API estará disponível em `http://localhost:3000`.

## Rotas da API

| Método | Rota | Função |
|---|---|---|
| POST | `/encomendas` | Criar encomenda |
| GET | `/encomendas` | Listar encomendas |
| GET | `/encomendas/:id` | Buscar por ID |
| PUT | `/encomendas/:id` | Atualizar encomenda |
| DELETE | `/encomendas/:id` | Excluir encomenda |

## Middlewares

- `logger`: registra as requisições recebidas.
- `validarDados`: verifica e sanitiza os dados das encomendas.
- `validarId`: verifica se o ID informado é um número inteiro positivo.

## Equipe

- [Adicione aqui os nomes dos integrantes do grupo.]
