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

//Admin
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
app.post('/v1/estacionaMais/inserirAdministrador/', cors(), bodyParserJson, async function (request, response, next) {
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controllerAdministradores.setInserirAdministradores(contentType, dadosBody)

    console.log(resultDados);
    response.status(resultDados.status_code)
    response.json(resultDados)
})
app.put('/v1/estacionaMais/updateAdministrador/:id', cors(), bodyParserJson, async function (request, response, next) {
    let idUpdate = request.params.id
    
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controllerAdministradores.setAtualizarAdministrador(idUpdate, dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})
app.delete('/v1/estacionaMais/deleteAdministrador/:id', cors(), async function (request, response, next) {

    let idAdministrador = request.params.id

    let resultDados = await controllerAdministradores.setDeletarAdministradorById(idAdministrador)

    response.status(resultDados.status_code)
    response.json(resultDados)
})


app.get('/v1/estacionaMais/usuarios', cors(), async function (request, response, next ){
    let dadosUsuarios = await controllerUsuarios.getListarUsuarios()

    response.status(dadosUsuarios.status_code)
    response.json(dadosUsuarios)
})
app.get('/v1/estacionaMais/usuarios/:id', cors(), async function (request, response, next){
    let idUsuario = request.params.id
    let dadosUsuarios = await controllerUsuarios.getBuscarUsuarioById(idUsuario)

    response.status(dadosUsuarios.status_code)
    response.json(dadosUsuarios)
})
app.post('/v1/estacionaMais/inserirUsuarios', cors(), bodyParserJson, async function(request, response, next){
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await controllerUsuarios.setInserirUsuarios(contentType, dadosBody)

    console.log(resultDados)
    response.status(resultDados.status_code)
    response.json(resultDados)
})
app.put('/v1/estacionaMais/updateUsuarios/:id', cors(), bodyParserJson, async function (request, response, next){
    let idUpdate = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await controllerUsuarios.setAtualizarUsuario(idUpdate, dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})
app.delete('/v1/estacionaMais/deleteUsuarios/:id', cors(), async function (request, response, next){
    
    let idUsuario = request.params.id
    let resultDados = await controllerUsuarios.setDeletarUsuarioById(idUsuario)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

// Pagamento
app.get('/v1/estacionaMais/pagamento', cors(), async function(request, response, next){
    let dadosPagamento = await controllerPagamentos.getListarPagamento()

    response.status(dadosPagamento.status_code)
    response.json(dadosPagamento)
})
app.get('/v1/estacionaMais/pagamento/:id', cors(), async function(request, response, next){
    let idPagamento = request.params.id
    let dadosPagamento = await controllerPagamentos.getBuscarPagamentoById(idPagamento)

    response.status(dadosPagamento.status_code)
    response.json(dadosPagamento)
})
app.post('/v1/estacionaMais/inserirPagamento', cors(), bodyParserJson, async function(request, response, next){
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await controllerPagamentos.setInserirPagamentos(contentType, dadosBody)

    console.log(resultDados)
    response.status(resultDados.status_code)
    response.json(resultDados)
})


// Pagamento Reserva
app.get('/v1/estacionaMais/pagamentoReserva', cors(), bodyParserJson, async function(request, response, next){
    let dadosPagamentoReserva = await controllerPagamento_Reserva.getListarPagamento_reservas()

    response.status(dadosPagamentoReserva.status_code)
    response.json(dadosPagamentoReserva)
})
app.get('/v1/estacionaMais/pagamentoReserva/:id', cors(), bodyParserJson, async function(request, response, next){
    let idPagamentoReserva = request.params.id
    let dadosPagamentoReserva = await controllerPagamento_Reserva.getBuscarPagamento_reservaById(idPagamentoReserva)

    response.status(dadosPagamentoReserva.status_code)
    response.json(dadosPagamentoReserva)
})
app.post('/v1/estacionaMais/inserirPagamentoReserva', cors(), bodyParserJson, async function(request, response, next){
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await controllerPagamento_Reserva.setInserirPagamento_reservas(contentType, dadosBody)

    console.log(resultDados)
    response.status(resultDados.status_code)
    response.json(resultDados)
})

//Vagas
app.get('/v1/estacionaMais/vagas', cors(), bodyParserJson, async function(request, response, next){
    let dadosVagas = await controllerVagas.getListarVagas()

    response.status(dadosVagas.status_code)
    response.json(dadosVagas)
})
app.get('/v1/estacionaMais/vagas/:id', cors(), async function (request, response, next) {
    let idVaga = request.params.id
    let dadosVagas = await controllerVagas.getBuscarVagaById(idVaga)

    response.status(dadosVagas.status_code)
    response.json(dadosVagas)
})
app.post('/v1/estacionaMais/inserirVagas', cors(), bodyParserJson, async function(request, response, next) {

    let contentType = request.headers['content-type']
    dadosBody = request.body

    let resultDados = await controllerVagas.setInserirVagas(contentType,dadosBody)

    console.log(resultDados)
    response.status(resultDados.status_code)
    response.json(resultDados)

})
app.put('/v1/estacionaMais/updateVagas/:id', cors(), bodyParserJson, async function (request, response, next) {
    let idUpdate = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await controllerVagas.setAtualizarVaga(idUpdate, dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})
app.delete('/v1/estacionaMais/deleteVagas/:id', cors(), async function (request, response, next) {
    let idVaga = request.params.id
    let resultDados = await controllerVagas.setDeletarVagaById(idVaga)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

//Reservas
app.get('/v1/estacionaMais/reservas', cors(), bodyParserJson, async function(request, response, next) {
    let dadosReservas = await controllerReservas.getListarReservas()

    response.status(dadosReservas.status_code)
    response.json(dadosReservas)
})
app.get('/v1/estacionaMais/reservas/:id', cors(), async function(request, response, next) {
    let idReserva = request.params.id
    let dadosReservas = await controllerReservas.getBuscarReservasById(idReserva)

    response.status(dadosReservas.status_code)
    response.json(dadosReservas)
})
app.post('/v1/estacionaMais/inserirReservas', cors(), bodyParserJson, async function(request, response, next) {
    let contentType = request.headers['content-type']
    dadosBody = request.body

    let resultDados = await controllerReservas.setInserirReservas(contentType, dadosBody)

    console.log(resultDados)
    response.status(resultDados.status_code)
    response.json(resultDados)
})
app.put('/v1/estacionaMais/updateReservas/:id', cors(), bodyParserJson, async function (request, response, next) {
    let idUpdate = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await controllerReservas.setAtualizarReservas(idUpdate, dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})
app.delete('/v1/estacionaMais/deleteReservas/:id', cors(), bodyParserJson, async function(request, response, next) {
    let idReserva = request.params.id
    let resultDados = await controllerReservas.setDeletarReservasById(idReserva)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

//Veiculos
app.get('/v1/estacionaMais/veiculos', cors(), bodyParserJson, async function(request, response, next) {
    let dadosVeiculos = await controllerVeiculos.getListarVeiculos()

    response.status(dadosVeiculos.status_code)
    response.json(dadosVeiculos)
})
app.get('/v1/estacionaMais/veiculos/:id', cors(), async function(request, response, next) {
    let idVeiculo = request.params.id
    let dadosVeiculos = await controllerVeiculos.getListarVeiculos(idVeiculo)

    response.status(dadosVeiculos.status_code)
    response.json(dadosVeiculos)

})
app.post('/v1/estacionaMais/inserirVeiculos', cors(), bodyParserJson, async function(request, response, next) {
    let contentType = request.headers['content-type']
    dadosBody = request.body

    let resultDados = await controllerVeiculos.setInserirVeiculos(contentType, dadosBody)

    console.log(resultDados)
    response.status(resultDados.status_code)
    response.json(resultDados)
})
app.put('/v1/estacionaMais/updateVeiculos/:id', cors(), bodyParserJson, async function(request, response, next) {
    let idUpdate = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await controllerVeiculos.setAtualizarVeiculo(idUpdate, dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})
app.delete('/v1/estacionaMais/deleteVeiculos/:id', cors(), bodyParserJson, async function(request, response, next) {
    let idVeiculo = request.params.id
    let resultDados = await controllerVeiculos.setDeletarVeiculoById(idVeiculo)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

//Usuario Veiculo
app.get('/v1/estacionaMais/usuarioVeiculo', cors(), bodyParserJson, async function(request, response, next){
    let dadosUsuarioVeiculo = await controllerUsuario_veiculos.getListarUsuario_veiculos()

    response.status(dadosUsuarioVeiculo.status_code)
    response.json(dadosUsuarioVeiculo)
})
app.get('/v1/estacionaMais/usuarioVeiculo/:id', cors(), bodyParserJson, async function(request, response, next){

    let idUsuarioVeiculo = request.params.id
    let dadosUsuarioVeiculo = await controllerUsuario_veiculos.getListarUsuario_veiculos(idUsuarioVeiculo)

    response.status(dadosVeiculos.status_code)
    response.json(dadosUsuarioVeiculo)
})
app.post('/v1/estacionaMais/inserirUsuarioVeiculo', cors(), bodyParserJson, async function(request, response, next) {
    let contentType = request.headers['content-type']
    dadosBody = request.body

    let resultDados = await controllerUsuario_veiculos.setInserirUsuario_veiculos(contentType, dadosBody)

    console.log(resultDados)
    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.put('/v1/estacionaMais/updateUsuarioVeiculo/:id', cors(), bodyParserJson, async function(request, response, next) {
    let idUpdate = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await controllerUsuario_veiculos.setAtualizarUsuario_veiculo(idUpdate, dadosBody,contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})
app.delete('/v1/estacionaMais/deleteUsuarioVeiculo/:id', cors(), bodyParserJson, async function(request, response, next) {

    let idUsuarioVeiculo = request.params.id
    let resultDados = await controllerUsuario_veiculos.setDeletarUsuario_veiculoById(idUsuarioVeiculo)

    response.status(resultDados.status_code)
    response.json(resultDados)
})
app.listen(8080, function () {
    console.log('Serviço funcionando e aguardando requisições')
})