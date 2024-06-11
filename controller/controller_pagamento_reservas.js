/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para pagamento_reserva
 * Data: 31/05/2024
 * Autores: Julia Aparecida da Silva Fonseca, 
 *          Luiz Henrique Vidal Araujo, 
 *          Raica Rodrigues Martinez Castro,
 *          Vitor Hugo Nascimento da Silva;
 * Versão: 1.0 
 ********************************************************/

const pagamento_reservasDao = require('../model/DAO/pagamento_reservas.js')
const pagamentosDao = require('../model/DAO/pagamentos.js')
const reservasDao = require('../model/DAO/reservas.js')
const usuariosDao = require('../model/DAO/usuarios.js')
const message = require('../modulo/config.js')

const antigoDigito = `'`
const novoDigito = `|`

const antigoCarater = `"`
const novoCarater = ` || `

const getListarPagamento_reservas = async function () {
    let jsonPagamento_reservas = {}

    try {
        const dadosPagamento_reservas = await pagamento_reservasDao.selectAllPagamento_reservas()

        if (dadosPagamento_reservas) {
            if (dadosPagamento_reservas.length > 0) {
                jsonPagamento_reservas.pagamento_reservas = dadosPagamento_reservas
                jsonPagamento_reservas.quantidade = dadosPagamento_reservas.length
                jsonPagamento_reservas.status_code = 200

                return jsonPagamento_reservas
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

const getBuscarPagamento_reservaById = async function (id) {
    let jsonPagamento_reserva = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const dadosPagamento_reserva = await pagamento_reservasDao.selectByIdPagamento_reserva(id)

            if (dadosPagamento_reserva) {
                if (dadosPagamento_reserva.length > 0) {
                    jsonPagamento_reserva.pagamento_reserva = dadosPagamento_reserva
                    jsonPagamento_reserva.status_code = 200

                    return jsonPagamento_reserva
                } else {
                    return message.ERROR_NOT_FOUND
                }
            } else {
                console.log(dadosPagamento_reserva);
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarUltimoPagamento_reservaInserido = async function () {
    let jsonPagamento_reserva = {}

    try {
        const idUltimoPagamento_reserva = await pagamento_reservasDao.selectLastIdPagamento_reserva()

        if (idUltimoPagamento_reserva) {
            if (idUltimoPagamento_reserva.length > 0) {
                jsonPagamento_reserva.idPagamento_reserva = idUltimoPagamento_reserva
                jsonPagamento_reserva.status_code = 200

                return jsonPagamento_reserva
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

const setInserirPagamento_reservas = async function (contentType, dadosPagamento_reserva) {
    try {
        if (String(contentType).toLocaleLowerCase() === "application/json") {

            let novoPagamento_reservaJson = {}
            if (dadosPagamento_reserva.id_pagamento == "" || dadosPagamento_reserva.id_pagamento == undefined ||
                dadosPagamento_reserva.id_pagamento == null || isNaN(dadosPagamento_reserva.id_pagamento) ||
                dadosPagamento_reserva.id_reserva == "" || dadosPagamento_reserva.id_reserva == undefined ||
                dadosPagamento_reserva.id_reserva == null || isNaN(dadosPagamento_reserva.id_reserva) ||
                dadosPagamento_reserva.id_usuario == "" || dadosPagamento_reserva.id_usuario == undefined ||
                dadosPagamento_reserva.id_usuario == null || isNaN(dadosPagamento_reserva.id_usuario)
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let id_pagamento_validate = await pagamentosDao.selectByIdPagamento(dadosPagamento_reserva.id_pagamento)
                let id_reserva_validate = await reservasDao.selectByIdReservas(dadosPagamento_reserva.id_reserva)
                let id_usuario_validate = await usuariosDao.selectByIdUsuario(dadosPagamento_reserva.id_usuario)

                if (id_pagamento_validate != false && id_reserva_validate != false && id_usuario_validate != false) {
                    let novoPagamento_reserva = await pagamento_reservasDao.insertPagamento_reserva(dadosPagamento_reserva)

                    if (novoPagamento_reserva) {
                        let idNovoPagamento_reserva = await pagamento_reservasDao.selectLastIdPagamento_reserva()

                        if (idNovoPagamento_reserva) {
                            novoPagamento_reservaJson.status = message.SUCCES_CREATED_ITEM.status
                            novoPagamento_reservaJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                            novoPagamento_reservaJson.message = message.SUCCES_CREATED_ITEM.message
                            novoPagamento_reservaJson.id = idNovoPagamento_reserva[0].id
                            novoPagamento_reservaJson.novoPagamento_reserva = dadosPagamento_reserva

                            console.log(novoPagamento_reserva);
                            return novoPagamento_reservaJson
                        } else {
                            return message.ERROR_INTERNAL_SERVER_DB
                        }
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                } else {
                    return message.ERROR_INVALID_ID
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

const setAtualizarPagamento_reserva = async function (id, dadosPagamento_reservaUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {

        let updatePagamento_reservaJson = {}
        let resultUpdatePagamento_reservaJson = {}
        try {
            const validaId = await getBuscarPagamento_reservaById(id)
            console.log(validaId);
            if (validaId) {
                let id_pagamento_validate = await pagamentosDao.selectByIdPagamento(dadosPagamento_reservaUpdate.id_pagamento)
                let id_reserva_validate = await reservasDao.selectByIdReservas(dadosPagamento_reservaUpdate.id_reserva)
                let id_usuario_validate = await usuariosDao.selectByIdUsuario(dadosPagamento_reservaUpdate.id_usuario)

                if (id_pagamento_validate != false && id_reserva_validate != false && id_usuario_validate != false) {

                    let id = validaId.pagamento_reserva[0].id
                    let id_pagamento = dadosPagamento_reservaUpdate.id_pagamento
                    let id_reserva = dadosPagamento_reservaUpdate.id_reserva
                    let id_usuario = dadosPagamento_reservaUpdate.id_usuario

                    if (
                        id_pagamento != '' &&
                        id_pagamento != undefined &&
                        id_pagamento != null &&
                        id_pagamento.length < 100
                    ) {
                        updatePagamento_reservaJson.id_pagamento = id_pagamento
                    } else if (
                        id_pagamento == '' &&
                        id_pagamento == undefined &&
                        id_pagamento == null
                    ) { }

                    if (
                        id_reserva != '' &&
                        id_reserva != undefined &&
                        id_reserva != null &&
                        id_reserva.length < 100
                    ) {
                        updatePagamento_reservaJson.id_reserva = id_reserva
                    } else if (
                        id_reserva == '' &&
                        id_reserva == undefined &&
                        id_reserva == null
                    ) { }

                    if (
                        id_usuario != '' &&
                        id_usuario != undefined &&
                        id_usuario != null &&
                        id_usuario.length == 20
                    ) {
                        updatePagamento_reservaJson.id_usuario = id_usuario
                    } else if (
                        id_usuario == '' &&
                        id_usuario == undefined &&
                        id_usuario == null
                    ) { }

                    const pagamento_reservaAtualizado = await pagamento_reservasDao.updatePagamento_reserva(id, updatePagamento_reservaJson)

                    if (pagamento_reservaAtualizado) {
                        resultUpdatePagamento_reservaJson.id = id
                        resultUpdatePagamento_reservaJson.status = message.SUCCES_UPDATED_ITEM.status
                        resultUpdatePagamento_reservaJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                        resultUpdatePagamento_reservaJson.message = message.SUCCES_UPDATED_ITEM.message
                        resultUpdatePagamento_reservaJson.pagamento_reserva = dadosPagamento_reservaUpdate

                        return resultUpdatePagamento_reservaJson
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                } else {
                    return message.ERROR_INVALID_ID
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

const setDeletarPagamento_reservaById = async function (id) {
    let jsonDeletePagamento_reserva = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const validaId = await getBuscarPagamento_reservaById(id)

            if (validaId) {
                const id = validaId.pagamento_reserva[0].id

                const apagarPagamento_reserva = await pagamento_reservasDao.deletePagamento_reserva(id)

                if (apagarPagamento_reserva) {
                    jsonDeletePagamento_reserva.status = message.SUCCES_DELETED_ITEM.status
                    jsonDeletePagamento_reserva.status_code = message.SUCCES_DELETED_ITEM.status_code
                    jsonDeletePagamento_reserva.message = message.SUCCES_DELETED_ITEM.message
                    jsonDeletePagamento_reserva.id = validaId.pagamento_reserva[0].id

                    return jsonDeletePagamento_reserva
                } else {
                    console.log(dadosPagamento_reserva);
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            } else {

            }
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    getListarPagamento_reservas,
    getBuscarPagamento_reservaById,
    getBuscarUltimoPagamento_reservaInserido,
    setInserirPagamento_reservas,
    setAtualizarPagamento_reserva,
    setDeletarPagamento_reservaById
}