# 🧠 Quiz CLI com PostgreSQL

Aplicativo **de terminal** (CLI) desenvolvido em **TypeScript/Node.js**, que permite cadastrar, excluir e responder perguntas de um **quiz interativo** integrado a um banco de dados **PostgreSQL**.  
O sistema também salva o **ranking de jogadores**, exibindo pontuações e resultados anteriores.

---

## ⚙️ Funcionalidades

- 📚 **Cadastro de perguntas** com respostas corretas e alternativas falsas  
- ❌ **Exclusão de perguntas** diretamente pelo ID  
- 🧩 **Execução do quiz** com perguntas embaralhadas e pontuação automática  
- 🧾 **Visualização completa das perguntas e respostas** armazenadas  
- 🏆 **Sistema de ranking** com histórico de resultados  

---

## 🧰 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [pg (node-postgres)](https://www.npmjs.com/package/pg)
- [readline-sync](https://www.npmjs.com/package/readline-sync)

---

## 🚀 Como Executar

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/seu-usuario/nome-do-repo.git
cd nome-do-repo
```

### 2️⃣ Instalar dependências
```bash
npm install
```

### 3️⃣ Configurar o banco de dados
Crie um banco **PostgreSQL** com as tabelas abaixo:

```sql
CREATE TABLE perguntas (
    id SERIAL PRIMARY KEY,
    pergunta TEXT NOT NULL,
    respostav TEXT NOT NULL,
    resposta1 TEXT NOT NULL,
    resposta2 TEXT NOT NULL,
    resposta3 TEXT NOT NULL,
    resposta4 TEXT NOT NULL
);

CREATE TABLE resultados (
    id SERIAL PRIMARY KEY,
    nome_jogador TEXT NOT NULL,
    pontuacao INT NOT NULL,
    total_perguntas INT NOT NULL,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

> ⚠️ **Importante:**  
> No código, há credenciais de exemplo (`user: 'aluno', password: '102030'`).  
> **Nunca use credenciais reais diretamente no código!**  
> Utilize variáveis de ambiente (.env) em projetos sérios.

---

### 4️⃣ Executar o programa
```bash
node index.ts
```

O menu principal será exibido no terminal:

```
--- Menu Quiz ---
1. Cadastrar Pergunta
2. Excluir Pergunta
3. Iniciar Quiz
4. Ver Perguntas e Respostas
5. Ver Ranking
0. Sair
```

---

## 🧮 Exemplo de Execução

```
Conectando ao banco de dados...
Conexão bem-sucedida!

--- Menu Quiz ---
1. Cadastrar Pergunta
2. Excluir Pergunta
3. Iniciar Quiz
...
Escolha: 3

-=-=-=- Iniciando o Quiz -=-=-=-

Qual é o seu nome? Chris
Pergunta 1: Qual a capital da França?
1. Paris
2. Roma
3. Madrid
4. Lisboa
5. Londres
Escolha a resposta (1-5): 1
Correto!
```

---

## 🪪 Licença

Este projeto está sob a licença **MIT** — sinta-se livre para usar, modificar e aprender com ele.

---

## ✨ Autor

Desenvolvido por **[Seu Nome]**  
💻 GitHub: [@seu-usuario](https://github.com/seu-usuario)

