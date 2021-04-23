# Next Level Week #05 - Rocketseat
	Todo o projeto realizado na NLW #05. Inclusive, esse README.md, foi feito por mim e inclui exatamente todas as etapas realizadas desde a "estaca zero". Entao bora logo de "Faaaaala Dev!", e #letscode.

# projeto-nlw
Configuracoes iniciais do ambiente: https://www.notion.so/Configura-es-do-ambiente-d0fcddac0de642fb99fca7d8dbd28cc3

- Criando a pasta do projeto:

```mkdir projeto_nlw```

```cd projeto_nlw```

```code .```

- Iniciando o projeto: ```yarn init -y```

Esse comando inicia o projeto com configuracoes padrao, utilizando o Yarn.
O arquivo package.json fica da seguinte forma:

```
{
  "name": "projeto_nlw",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT"
}
```

- Proximo passo e instalar as dependencias do Express: ```yarn add express```

Quando add/instalamos uma dependencia, ela add o diretorio da "node_modules" ao projeto.

- Criaremos agora um diretorio chamado "src":

```mkdir src```

```cd src```

- Na pasta src, criamos nosso server, "server.ts", e add o express por import: ```import express from "express"```

Note que, haverao 3 pontos logo abaixo de "express", isso quer dizer que apesar de termos instalado a dependencia, nao foram add as tipagens da mesma: ```yarn add @types/express -D```

O "-D", e para especificar que e uma dependencia de desenvolvimento/develop.

- Agora, instalamos o TypeScript: ```yarn add typescript -D```

So utilizamos o TypeScript em ambiente de develop.

- ```yarn tsc --init```

Esse comando criara um arquivo de configuracao do TS com algumas informacoes sobre a dependencia.

- A primeira alteracao nesse arquivo tsconfig.json, e definir o "strict" como false, ja que utilizando o TS, ja temos todas as verificacoes de tipagem e etc.

- Agora, instalamos outra dependencia para o TS entender algumas sintaxes, cmo a do import/export:
```yarn add tsc-node-dev -D```

- Agora podemos add nossos "scripts" no package.json, cmo vemos a seguir (add logo antes de "dependencies: "):

```
"scripts": {
	"dev": "ts-node-dev src/server.ts"
},
```

Obs.: Lembrando que, o ts-node-dev, assim cmo o Nodemon, possui auto-reload com o salvamento de alteracoes no codigo, entao nao e necessario executar o codigo ```yarn dev``` toda vez que alterar o codigo.

### Pronto, com isso, a configuracao inicial da nossa API esta completa!


# Config Database

### Configurando o typeorm:
- Adicionamos o "typeorm", um framework que utiliza TS para relacionamento de objetos executado em NodeJS. (ORM - _Object Relation Mapping_).

```yarn ad typeorm reflect-metadata sqlite3```

- Entao a gnt cria um arquivo de configuracao do ORM, "ormconfig.json" na raiz do projeto; e add ao arquivo:
```
{
  "type": "sqlite"
}
```

- Criamos uma pasta chamada "database" dentro de "src", e cm isso, dentro de database, criamos um arquivo index.ts com o seguinte:
```
import { createConnection } from "typeorm"; 

createConnection();
```

- Agora, precisamos importar o conteudo do database no nosso server.ts:
```import "./database";```

- O que sao migrations? Sao o que forma um historico de modificacoes realizada na configuracao do banco de dados, para manter um padrao de alteracoes e permitir que outra maquina consiga executar o seu codigo.

### Configurando as migrations:
- Add o seguinte ao arquivo ormconfig.ts:
```
,
  "database": "./src/database/database.sqlite",
  "migrations": ["./src/database/migrations/**.ts"]
```

- Agora add um script para as migrations junto ao typeorm:
```
,
    "typeorm": "ts-node-dev node_modules/typeorm/cli.js"
```

E tbm, add o seguinte ao arquivo de ormconfig.ts:
```
,
"cli": {
	"migrationsDir": "./src/database/migrations"
}
```

### Criando as migrations:
- Optamos por criar primeiramente, a migration para a tabela de Settings. Para isso, basta digitar no terminal:
```yarn typeorm migration:create -n CreateSettings```

- Feito isso, alteraremos os metodos da migration criada para criar as colunas que queremos:
```
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSettings1619208995786 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                nome: "settings",
                columns: [
                    {
                        name: "id",
                        type: "uuid", /* Unique Universal ID*/
                        isPrimary: true
                    },
                    {
                        name: "username",
                        type: "varchar"
                    },
                    {
                        name: "chat",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("settings");
    }

}

```

- Para rodar a migration, executamos:
```yarn typeorm migration:run```

Vimos que esse comando criou um arquivo database.sqlite.

- 
