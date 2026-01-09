# 🚀 Backend – NestJS + Socket.IO (Clean Architecture)

Backend de um chat em tempo real desenvolvido com **NestJS**, **Socket.IO** e **TypeScript**, aplicando princípios de **Arquitetura Limpa** para garantir escalabilidade e manutenibilidade.

## ✨ Funcionalidades

- 💬 **Comunicação em Tempo Real**: Envio e recebimento de mensagens instantâneas via WebSockets.
- 🏘️ **Gestão de Salas**: Criação e organização de salas de conversa.
- ⚡ **Performance com SWC**: Compilação e execução de testes ultra-rápidos com Rust.
- 📝 **Documentação Swagger**: API documentada e testável via `/docs`.
- 🔒 **CORS Configurado**: Pronto para integração com frontends em diferentes origens.
- 🧪 **Testes & Cobertura**: Suite de testes com Jest e SWC para feedback instantâneo.
- 🗄️ **Persistência Robusta**: Integração com PostgreSQL via TypeORM.

---

## 🏗️ Arquitetura do Projeto

O projeto segue os padrões de **Clean Architecture** e **Domain-Driven Design (DDD)**, organizando as responsabilidades de forma clara:

### `src/app` (Camada de Domínio e Aplicação)
- **Entities**: Definição dos objetos de negócio (Chat, Room, User).
- **Use Cases**: Regras de negócio e fluxos da aplicação (Ex: `CreateChat`, `CreateRoom`).
- **Repositories**: Interfaces que definem como os dados devem ser persistidos.

### `src/infra` (Camada de Infraestrutura)
- **http/**: Controllers, DTOs e gerenciamento de rotas REST.
- **ws/**: Gateways de WebSocket (`ChatGateway`) para comunicação em tempo real.
- **database/**: Implementações concretas do TypeORM, entidades de banco e migrations.

### `src/helpers`
- Utilitários compartilhados e lógicas transversais.

---

## 🛠️ Tecnologias Principais

- **NestJS** (v11)
- **Socket.IO** (v4)
- **TypeScript**
- **TypeORM** & **PostgreSQL**
- **SWC** (Compiler)
- **Docker** & **Docker Compose**

---

## � Como Iniciar

### Pré-requisitos

- **Node.js** >= 20
- **Docker** & **Docker Compose** (Opcional, para ambiente isolado)

### Instalação e Execução Local

1. **Instale as dependências:**
   ```bash
   yarn install
   # ou
   npm install
   ```

2. **Configure o ambiente:**
   Copie `.env.example` para `.env` e ajuste as credenciais do banco de dados.

3. **Inicie o servidor (Desenvolvimento):**
   ```bash
   yarn dev
   ```
   O servidor estará disponível em: `http://localhost:3333`

---

## � Rodando com Docker

### Docker Compose (Recomendado)

Para subir o banco de dados e a aplicação:

```bash
docker-compose up -d --build
```

---

## 📡 WebSocket – Eventos Principais

O gateway de chat está disponível para conexões via Socket.IO.

### Inscrição (Subscribe)
- `newMessage`: Recebe um payload contendo o tipo da entidade (Chat ou Room), o ID do usuário e o corpo da mensagem ou sala.

### Emissão (Emit)
- `onMessage`: Notifica os clientes sobre a chegada de novas mensagens ou atualizações.

---

## 🧪 Testes e Qualidade

O projeto utiliza **SWC** para garantir que os testes rodem em milissegundos.

```bash
# Rodar todos os testes
yarn test

# Ver cobertura de código
yarn test:cov
```

---

## 📖 Documentação da API

Acesse o Swagger UI para explorar os endpoints REST:
🔗 [http://localhost:3333/docs](http://localhost:3333/docs)

---

## 👤 Autor

**Robson Feitosa**

---

## 📄 Licença

Este projeto está sob a licença [MIT](https://github.com/nestjs/nest/blob/master/LICENSE).
