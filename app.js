/** Informações gerais sobre este projeto]
 * 
 * Objetivo: Arquivo para realizar as requisições do 
 * sistema de gerenciamento de um estacionamento;
 * Data: 31/05/2024;
 * Autores: Julia Aparecida da Silva Fonseca, 
 *          Luiz Henrique Vidal Araujo, 
 *          Raica Rodrigues Martinez Castro,
 *          Vitor Hugo Nascimento da Silva;
 * Versão: 1.0;
 */

/** Instalações da dependência para criação da API
 * 
 *  express     - "npm install express --save" {
 *     Dependência do node para auxiliar na criação da API}
 * 
 *  cors        - "npm install cors --save" {
 *      [Dependência para manipular recursos de acesso, permissões, etc da API]
 *      [Trabalha com as informações no Head(Front-End - html)]}
 * 
 *  body-parser - "npm install body-parser --save" {
 *      [É uma dependência para auxiliar na chegada de dados na API]
 *      [Trabalha com as informações no Body(Front-End - html)]}
 * 
 * instalação do PRISMA ORM
 *          npm install prisma --save (É quem realiza a conexão com o banco de dados)
 *          npm install @prisma/client --save (É quem executa os scripts SQL no BD)
 * 
 *      Após as intalações devemos rodar o comando:
 *          npx prisma init (Esse comando inicializa a utilização do projeto)
 *          npx prisma db pull
 *          npx prisma generate
 * 
 *      Caso ocorra algum problema, execute:
 *          npm i 
 */

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS')

    app.use(cors())

    next()
})

const bodyParserJson = bodyParser.json()



app.listen(8080, function () {
    console.log('Serviço funcionando e aguardando requisições')
})