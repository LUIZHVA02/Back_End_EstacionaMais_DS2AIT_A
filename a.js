app.get('/v1/estacionaMais/Pagamento_Reserva', cors(), async function (request, response, next) {

    let dadosPagamento_Reserva = await controllerPagamento_Reserva.getListarPagamento_Reserva()

    response.status(dadosPagamento_Reserva.status_code)
    response.json(dadosPagamento_Reserva)
})

app.get('/v1/estacionaMais/administrador/:id', cors(), async function (request, response, next) {

    let idAdministrador = request.params.id

    let dadosPagamento_Reserva = await controllerPagamento_Reserva.getBuscarAdministradorById(idAdministrador)

    response.status(dadosPagamento_Reserva.status_code)
    response.json(dadosPagamento_Reserva)
})

app.post('/v1/estacionaMais/inserirAdministrador/', cors(), bodyParserJson, async function (request, response, next) {
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controllerPagamento_Reserva.setInserirPagamento_Reserva(contentType, dadosBody)

    console.log(resultDados);
    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.put('/v1/estacionaMais/updateAdministrador/:id', cors(), bodyParserJson, async function (request, response, next) {
    let idUpdate = request.params.id
    
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controllerPagamento_Reserva.setAtualizarAdministrador(idUpdate, dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v1/estacionaMais/deleteAdministrador/:id', cors(), async function (request, response, next) {

    let idAdministrador = request.params.id

    let resultDados = await controllerPagamento_Reserva.setDeletarAdministradorById(idAdministrador)

    response.status(resultDados.status_code)
    response.json(resultDados)
})