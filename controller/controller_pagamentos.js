/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para os Pagamentos
 * Data: 31/05/2024
 * Autores: Julia Aparecida da Silva Fonseca, 
 *          Luiz Henrique Vidal Araujo, 
 *          Raica Rodrigues Martinez Castro,
 *          Vitor Hugo Nascimento da Silva;
 * Versão: 1.0 
 ********************************************************/

const controller_pagamento_reservas = require('./controller_pagamento_reservas.js')
const pagamentosDao = require('../model/DAO/pagamentos.js')
const message = require('../modulo/config.js')


const antigoDigito = `'`
const novoDigito = `|`

const antigoCarater = `"`
const novoCarater = ` || `

const getListarPagamento = async function () {
    let jsonPagamentos = {}

    try {
        const dadosPagamentos = await pagamentosDao.selectAllPagamentos()

        if (dadosPagamentos) {
            if (dadosPagamentos.length > 0) {
                jsonPagamentos.pagamentos = dadosPagamentos
                jsonPagamentos.quantidade = dadosPagamentos.length
                jsonPagamentos.status_code = 200

                return jsonPagamentos
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarPagamentoById = async function (id) {
    let jsonPagamento = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const dadosPagamento = await pagamentosDao.selectByIdPagamento(id)

            if (dadosPagamento) {
                if (dadosPagamento.length > 0) {
                    jsonPagamento.pagamento = dadosPagamento
                    jsonPagamento.status_code = 200

                    return jsonPagamento
                } else {
                    return message.ERROR_NOT_FOUND
                }
            } else {
                console.log(dadosPagamento);
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarUltimoPagamentoInserido = async function () {
    let jsonPagamento = {}

    try {
        const idUltimoPagamento = await pagamentosDao.selectLastIdPagamento()

        if (idUltimoPagamento) {
            if (idUltimoPagamento.length > 0) {
                jsonPagamento.idPagamento = idUltimoPagamento
                jsonPagamento.status_code = 200

                return jsonPagamento
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const setInserirPagamentos = async function (contentType, dadosPagamento) {
    try {
        if (String(contentType).toLocaleLowerCase() === "application/json") {

            let novoPagamentoJson = {}
            if (dadosPagamento.forma_pagamento == "" || dadosPagamento.forma_pagamento == undefined ||
                dadosPagamento.forma_pagamento == null || dadosPagamento.forma_pagamento.length > 30
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let novoPagamento = await pagamentosDao.insertPagamento(dadosPagamento)

                if (novoPagamento) {
                    let idNovoPagamento = await pagamentosDao.selectLastIdPagamento()

                    if (idNovoPagamento) {
                        novoPagamentoJson.status = message.SUCCES_CREATED_ITEM.status
                        novoPagamentoJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                        novoPagamentoJson.message = message.SUCCES_CREATED_ITEM.message
                        novoPagamentoJson.id = idNovoPagamento[0].id
                        novoPagamentoJson.novoPagamento = dadosPagamento

                        console.log(novoPagamento);
                        return novoPagamentoJson
                    } else {
                        console.log("Novo ID:" + idNovoPagamento);
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                } else {
                    console.log("Novo Pagamento:" + dadosPagamento);
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarPagamento = async function (id, dadosPagamentoUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {

        let updatePagamentoJson = {}
        let resultUpdatePagamentoJson = {}
        try {
            const validaId = await getBuscarPagamentoById(id)

            if (validaId) {

                let id = validaId.pagamento[0].id
                let forma_pagamento = dadosPagamentoUpdate.forma_pagamento

                if (
                    forma_pagamento != '' &&
                    forma_pagamento != undefined &&
                    forma_pagamento != null &&
                    forma_pagamento.length < 100
                ) {
                    updatePagamentoJson.forma_pagamento = forma_pagamento
                } else if (
                    forma_pagamento == '' &&
                    forma_pagamento == undefined &&
                    forma_pagamento == null
                ) { }

                const PagamentoAtualizado = await pagamentosDao.updatePagamento(id, updatePagamentoJson)

                if (PagamentoAtualizado) {
                    resultUpdatePagamentoJson.id = id
                    resultUpdatePagamentoJson.status = message.SUCCES_UPDATED_ITEM.status
                    resultUpdatePagamentoJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    resultUpdatePagamentoJson.message = message.SUCCES_UPDATED_ITEM.message
                    resultUpdatePagamentoJson.pagamento = dadosPagamentoUpdate

                    return resultUpdatePagamentoJson
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            } else {
                return message.ERROR_NOT_FOUND
            }

        } catch (error) {
            console.log(error);
            return message.ERROR_UPDATED_ITEM
        }
    } else {
        return message.ERROR_CONTENT_TYPE
    }
}

const setDeletarPagamentoById = async function (id) {
    let jsonDeletePagamento = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const validaId = await getBuscarPagamentoById(id)

            if (validaId) {
                const id = validaId.pagamento[0].id

                const apagarPagamentoReserva = await controller_pagamento_reservas.setDeletarPagamento_reservaById_pagamento(id)

                if (apagarPagamentoReserva) {
                    const apagarPagamento = await pagamentosDao.deletePagamento(id)

                    if (apagarPagamento) {
                        jsonDeletePagamento.status = message.SUCCES_DELETED_ITEM.status
                        jsonDeletePagamento.status_code = message.SUCCES_DELETED_ITEM.status_code
                        jsonDeletePagamento.message = message.SUCCES_DELETED_ITEM.message
                        jsonDeletePagamento.id = validaId.pagamento[0].id

                        return jsonDeletePagamento
                    } else {
                        console.log(dadosPagamento);
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER
                }

            } else {
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    getListarPagamento,
    getBuscarPagamentoById,
    getBuscarUltimoPagamentoInserido,
    setInserirPagamentos,
    setAtualizarPagamento,
    setDeletarPagamentoById
}