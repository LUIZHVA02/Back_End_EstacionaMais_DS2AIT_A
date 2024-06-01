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



/*************** Import dos arquivos internos do projeto ***************/

const controllerAdministradores = require('./controller/controller_administradores.js')
const controllerPagamento_Reserva = require('./controller/controller_pagamento_reservas.js')
const controllerPagamentos = require('./controller/controller_pagamentos.js')
const controllerReserva_vagas_administrador = require('./controller/controller_reserva_vagas_administrador.js')
const controllerReserva_vagas_usuario = require('./controller/controller_reserva_vagas_usuario.js')
const controllerReservas = require('./controller/controller_reservas.js')
const controllerUsuario_veiculos = require('./controller/controller_usuario_veiculos.js')
const controllerUsuarios = require('./controller/controller_usuarios.js')
const controllerVagas = require('./controller/controller_vagas.js')
const controllerVeiculos = require('./controller/controller_veiculos.js')

/***********************************************************************/

app.get('/v1/estacionaMais/administradores', cors(), async function (request, response, next) {

    let dadosAdministradores = await controllerAdministradores.getListarAdministradores()

    response.status(dadosAdministradores.status_code)
    response.json(dadosAdministradores)
})

app.get('/v1/estacionaMais/administrador/:id', cors(), async function (request, response, next) {

    let idAdministrador = request.params.id

    let dadosAdministradores = await controllerAdministradores.getBuscarAdministradorById(idAdministrador)

    response.status(dadosAdministradores.status_code)
    response.json(dadosAdministradores)
})

app.listen(8080, function () {
    console.log('Serviço funcionando e aguardando requisições')
})