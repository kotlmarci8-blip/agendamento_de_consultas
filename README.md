# Sistema de Agendamento

Sistema de agendamento de consultas médicas, com backend em Node.js/Express e persistência em MySQL via Sequelize. Permite gerenciar médicos, pacientes, disponibilidades de horário e agendamentos de consultas.

## Stack

- **Backend:** Node.js, Express 5
- **ORM:** Sequelize 6 (+ Sequelize CLI para migrations)
- **Banco de dados:** MySQL (via `mysql2`)
- **Outros:** cors, dotenv, nodemon (dev)
- **Frontend:** pasta criada, implementação ainda não iniciada

## Estrutura do projeto

```
backend/
├── server.js               # ponto de entrada, sobe o Express na porta definida em .env
├── .sequelizerc             # caminhos usados pelo Sequelize CLI
├── src/
│   ├── app.js                # instância do Express (cors + json)
│   ├── config/
│   │   ├── config.js          # config do Sequelize CLI (development/test/production)
│   │   └── database.js        # instância de conexão Sequelize usada pela app
│   ├── models/                # Medico, Paciente, Agendamento, Disponibilidade + associações
│   ├── migrations/            # migrations das 4 tabelas
│   ├── repositories/          # acesso a dados (CRUD) para cada entidade
│   ├── services/              # regras de negócio (arquivos criados, ainda vazios)
│   ├── controllers/           # camada HTTP (arquivos criados, ainda vazios)
│   ├── routes/                # definição de rotas (arquivos criados, ainda vazios)
│   └── middlewares/
│       └── errorHandler.js    # tratamento de erros (ainda vazio)
frontend/                      # ainda sem código
```

## Modelo de dados

### Medico
| Campo | Tipo | Observação |
|---|---|---|
| id | INTEGER | PK, auto increment |
| nome | STRING | obrigatório |
| crm | STRING | obrigatório, único |
| especialidade | STRING | obrigatório |
| email | STRING | obrigatório, único |
| senha | STRING | obrigatório |
| telefone | STRING | opcional |

### Paciente
| Campo | Tipo | Observação |
|---|---|---|
| id | INTEGER | PK, auto increment |
| nome | STRING | obrigatório |
| cpf | STRING | obrigatório, único |
| email | STRING | obrigatório, único |
| senha | STRING | obrigatório |
| telefone | STRING | obrigatório |
| data_nascimento | DATEONLY | opcional |

### Agendamento
| Campo | Tipo | Observação |
|---|---|---|
| id | INTEGER | PK, auto increment |
| data_hora | DATE | obrigatório |
| status | ENUM | `agendado`, `confirmado`, `cancelado`, `concluido` (default `agendado`) |
| observacoes | TEXT | opcional |
| medicoId | INTEGER | FK → Medico |
| pacienteId | INTEGER | FK → Paciente |

### Disponibilidade
| Campo | Tipo | Observação |
|---|---|---|
| id | INTEGER | PK, auto increment |
| medicoId | INTEGER | FK → Medico |
| dia_semana | INTEGER | 0 (domingo) a 6 (sábado) |
| hora_inicio | TIME | obrigatório |
| hora_fim | TIME | obrigatório |
| duracao_consulta_minutos | INTEGER | default `30` |

### Relacionamentos
- `Medico` 1:N `Agendamento`
- `Paciente` 1:N `Agendamento`
- `Medico` 1:N `Disponibilidade`

## Status atual da implementação

- ✅ Models, migrations e associações das 4 entidades
- ✅ Repositories com CRUD básico:
  - `medicoRepository`: create, findAll, findById, findByEmail, update, remove
  - `pacienteRepository`: create, findAll, findById, findByEmail, findByCpf, update, remove
  - `agendamentoRepository`: create, findAll, findById, findByMedico, findByPaciente, findByMedicoEData, update, remove
  - `disponibilidadeRepository`: create, findAll, findById, findByMedico, findByMedicoEDiaSemana, update, remove
- ⏳ **Pendente:** services, controllers, routes e middleware de erros (arquivos já criados no projeto, mas ainda sem código)
- ⏳ **Pendente:** `app.js` ainda não registra nenhuma rota
- ⏳ **Pendente:** frontend (pasta vazia)

## Como executar (backend)

1. Instalar dependências:
   ```
   cd backend
   npm install
   ```
2. Configurar variáveis de ambiente — copiar `.env.example` para `.env` e preencher:
   ```
   PORT=3000
   DB_HOST=
   DB_PORT=
   DB_NAME=
   DB_USER=
   DB_PASSWORD=
   ```
3. Rodar as migrations:
   ```
   npx sequelize-cli db:migrate
   ```
4. Subir o servidor:
   ```
   npm run dev   # com nodemon
   # ou
   npm start
   ```

> Observação: como as rotas ainda não foram implementadas, o servidor sobe mas não expõe nenhum endpoint HTTP além do middleware base (cors + json).
