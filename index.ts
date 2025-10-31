const { Pool } = require('pg');
const readlineSync = require('readline-sync');


// Nunca use senha e usuario nos codigos - este é apenas um exemplo de aulas
// No mundo real isso é uma baita vulnerabilidade
const dbConfig = {
    user: 'aluno',
    host: 'localhost',
    database: 'db_profedu',
    password: '102030',
    port: 5432,
};

const pool = new Pool(dbConfig);

async function main() {
    let opcao = "";
    try {
        console.log("\nConectando ao banco de dados...");
        const client = await pool.connect();
        console.log("Conexão bem-sucedida!");
        console.log('\n');


    while(opcao !== "0"){
        console.log("--- Menu Quiz ---");
        console.log("1. Cadastrar Pergunta");
        console.log("2. Excluir Pergunta");
        console.log("3. Iniciar Quiz");
        console.log("4. Ver Perguntas e Respostas");
        console.log("5. Ver Ranking");
        console.log("0. Sair");

    opcao = readlineSync.question("Escolha: ");

    switch (opcao) {
        case "1":
        const pergunta = readlineSync.question("Pergunta: ");
        const respostaV = readlineSync.question("Resposta Verdadeira: ");
        const resposta1 = readlineSync.question("Resposta Falsa 1: ");
        const resposta2 = readlineSync.question("Resposta Falsa 2: ");
        const resposta3 = readlineSync.question("Resposta Falsa 3: ");
        const resposta4 = readlineSync.question("Resposta Falsa 4: ");

        const insertQuery = `
            INSERT INTO public.perguntas (pergunta, respostav, resposta1, resposta2, resposta3, resposta4)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const values = [pergunta, respostaV, resposta1, resposta2, resposta3, resposta4];
        await pool.query(insertQuery, values);

        console.log("-----------------------------------------");
        console.log("------ Dados inseridos com sucesso!------");
        console.log("-----------------------------------------");
        console.log('\n');

        break;


        case "2":   
        const idpergunta = readlineSync.question("ID da pergunta que deseja excluir: ");

        const resultid = await pool.query('DELETE FROM perguntas WHERE id = $1', [idpergunta]);

        if (resultid.rowCount > 0) {
            console.log();
            console.log(`Pergunta ${idpergunta} deletada com sucesso!`);
            console.log('\n');
        } else {
            console.log();
            console.log(`Pergunta ${idpergunta} não encontrada.`);
            console.log('\n');
        }

        break;


        case "3":
         console.log("\n-=-=-=- Iniciando o Quiz -=-=-=-\n");

        const nomeJogador = readlineSync.question("Qual é o seu nome? ");
        const perguntas = await pool.query("SELECT * FROM perguntas ORDER BY id ASC");

        let acertos = 0;

        for (const p of perguntas.rows) {
            console.log(`\nPergunta ${p.id}: ${p.pergunta}`);

            const alternativas = [
                p.respostav,
                p.resposta1,
                p.resposta2,
                p.resposta3,
                p.resposta4,
            ];
            for (let i = alternativas.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [alternativas[i], alternativas[j]] = [alternativas[j], alternativas[i]];
            }

            alternativas.forEach((alt, i) => {
                console.log(`${i + 1}. ${alt}`);
            });

            const respostaUsuario = readlineSync.questionInt("\nEscolha a resposta (1-5): ");
            const respostaEscolhida = alternativas[respostaUsuario - 1];
            const acertou = respostaEscolhida === p.respostav;

            if (acertou) {
                console.log("Correto!\n");
                acertos++;
            } else {
                console.log(`Errado! A resposta certa era: ${p.respostav}\n`);
            }
        }

        const total = perguntas.rows.length;
        await pool.query(
            "INSERT INTO resultados (nome_jogador, pontuacao, total_perguntas) VALUES ($1, $2, $3)",
            [nomeJogador, acertos, total]
        );

        console.log(`\n Fim do quiz, ${nomeJogador}!`);
        console.log(`Você acertou ${acertos} de ${total} perguntas.`);
        console.log('\n');


        break;


        case "4":

        const  result = await pool.query('SELECT * FROM perguntas ORDER BY id DESC');
        console.table(result.rows);
        console.log();
        break;
        case "5":
        console.log("\n-=-=-=- Ranking dos Jogadores-=-=-=-\n");

        const ranking = await pool.query(`
            SELECT nome_jogador, pontuacao, total_perguntas, data
            FROM resultados
            ORDER BY pontuacao DESC, data DESC
        `);

        console.table(ranking.rows);
        console.log();


        break;


        case "0":
        console.log("\nSaindo...");
        break;

        default:
            console.log("Opcao invalida!\n");
        }
    }
    } catch (error) {
        console.error("Ocorreu um erro ao interagir com o banco de dados:", error);
    }  finally {
        await pool.end();
        console.log("Conexão com o banco de dados encerrada.");
    }
}

main();
