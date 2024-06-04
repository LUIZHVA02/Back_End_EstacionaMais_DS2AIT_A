/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para reserva_vaga_administrador
 * Data: 31/05/2024
 * Autores: Julia Aparecida da Silva Fonseca, 
 *          Luiz Henrique Vidal Araujo, 
 *          Raica Rodrigues Martinez Castro,
 *          Vitor Hugo Nascimento da Silva;
 * Versão: 1.0 
 ********************************************************/

const Reserva_vagas_AdministradorsDao = require('../model/DAO/Reserva_vagas_Administradors.js')
const message = require('../modulo/config.js')

const antigoDigito = `'`
const novoDigito = `|`

const antigoCarater = `"`
const novoCarater = ` || `

const getListarReserva_vagas_Administrador = async function () {
    let jsonReserva_vagas_Administradors = {}

    try {
        const dadosReserva_vagas_Administradors = await Reserva_vagas_AdministradorsDao.selectAllReserva_vagas_Administradors()

        if (dadosReserva_vagas_Administradors) {
            if (dadosReserva_vagas_Administradors.length > 0) {
                jsonReserva_vagas_Administradors.reserva_vagas_Administradors = dadosReserva_vagas_Administradors
                jsonReserva_vagas_Administradors.quantidade = dadosReserva_vagas_Administradors.length
                jsonReserva_vagas_Administradors.status_code = 200

                return jsonReserva_vagas_Administradors
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

const getBuscarReserva_vagas_AdministradorById = async function (id) {
    let jsonReserva_vagas_Administrador = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const dadosReserva_vagas_Administrador = await Reserva_vagas_AdministradorsDao.selectByIdReserva_vagas_Administrador(id)

            if (dadosReserva_vagas_Administrador) {
                if (dadosReserva_vagas_Administrador.length > 0) {
                    jsonReserva_vagas_Administrador.reserva_vagas_Administrador = dadosReserva_vagas_Administrador
                    jsonReserva_vagas_Administrador.status_code = 200

                    return jsonReserva_vagas_Administrador
                } else {
                    return message.ERROR_NOT_FOUND
                }
            } else {
                console.log(dadosReserva_vagas_Administrador);
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarUltimoReserva_vagas_AdministradorInserido = async function () {
    let jsonReserva_vagas_Administrador = {}

    try {
        const idUltimoReserva_vagas_Administrador = await Reserva_vagas_AdministradorsDao.selectLastIdReserva_vagas_Administrador()

        if (idUltimoReserva_vagas_Administrador) {
            if (idUltimoReserva_vagas_Administrador.length > 0) {
                jsonReserva_vagas_Administrador.idReserva_vagas_Administrador = idUltimoReserva_vagas_Administrador
                jsonReserva_vagas_Administrador.status_code = 200

                return jsonReserva_vagas_Administrador
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

const setInserirReserva_vagas_Administradors = async function (contentType, dadosReserva_vagas_Administrador) {
    try {
        if (String(contentType).toLocaleLowerCase() === "application/json") {

            let novoReserva_vagas_AdministradorJson = {}
            if (dadosReserva_vagas_Administrador.id_pagamento == "" || dadosReserva_vagas_Administrador.id_pagamento == undefined ||
                dadosReserva_vagas_Administrador.id_pagamento == null || isNaN(dadosReserva_vagas_Administrador.id_pagamento) ||
                dadosReserva_vagas_Administrador.id_reserva == "" || dadosReserva_vagas_Administrador.id_reserva == undefined ||
                dadosReserva_vagas_Administrador.id_reserva == null || isNaN(dadosReserva_vagas_Administrador.id_reserva) ||
                dadosReserva_vagas_Administrador.id_usuario == "" || dadosReserva_vagas_Administrador.id_usuario == undefined ||
                dadosReserva_vagas_Administrador.id_usuario == null || isNaN(dadosReserva_vagas_Administrador.id_usuario)
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let novoReserva_vagas_Administrador = await Reserva_vagas_AdministradorsDao.insertReserva_vagas_Administrador(dadosReserva_vagas_Administrador)

                if (novoReserva_vagas_Administrador) {
                    let idNovoReserva_vagas_Administrador = await Reserva_vagas_AdministradorsDao.selectLastIdReserva_vagas_Administrador()

                    if (idNovoReserva_vagas_Administrador) {
                        novoReserva_vagas_AdministradorJson.status = message.SUCCES_CREATED_ITEM.status
                        novoReserva_vagas_AdministradorJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                        novoReserva_vagas_AdministradorJson.message = message.SUCCES_CREATED_ITEM.message
                        novoReserva_vagas_AdministradorJson.id = idNovoReserva_vagas_Administrador[0].id
                        novoReserva_vagas_AdministradorJson.novoReserva_vagas_Administrador = dadosReserva_vagas_Administrador

                        console.log(novoReserva_vagas_Administrador);
                        return novoReserva_vagas_AdministradorJson
                    } else {
                        console.log("Novo ID:" + idNovoReserva_vagas_Administrador);
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                } else {
                    console.log("Novo Reserva_vagas_Administrador:" + dadosReserva_vagas_Administrador);
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

const setAtualizarReserva_vagas_Administrador = async function (id, dadosReserva_vagas_AdministradorUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {

        let updateReserva_vagas_AdministradorJson = {}
        let resultUpdateReserva_vagas_AdministradorJson = {}
        try {
            const validaId = await getBuscarReserva_vagas_AdministradorById(id)

            if (validaId) {

                let id = validaId.reserva_vagas_Administrador[0].id
                let id_pagamento = dadosReserva_vagas_AdministradorUpdate.id_pagamento
                let id_reserva = dadosReserva_vagas_AdministradorUpdate.id_reserva
                let id_usuario = dadosReserva_vagas_AdministradorUpdate.id_usuario

                if (
                    id_pagamento != '' &&
                    id_pagamento != undefined &&
                    id_pagamento != null &&
                    id_pagamento.length < 100
                ) {
                    updateReserva_vagas_AdministradorJson.id_pagamento = id_pagamento
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
                    updateReserva_vagas_AdministradorJson.id_reserva = id_reserva
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
                    updateReserva_vagas_AdministradorJson.id_usuario = id_usuario
                } else if (
                    id_usuario == '' &&
                    id_usuario == undefined &&
                    id_usuario == null
                ) { }

                const Reserva_vagas_AdministradorAtualizado = await Reserva_vagas_AdministradorsDao.updateReserva_vagas_Administrador(id, updateReserva_vagas_AdministradorJson)

                if (Reserva_vagas_AdministradorAtualizado) {
                    resultUpdateReserva_vagas_AdministradorJson.id = id
                    resultUpdateReserva_vagas_AdministradorJson.status = message.SUCCES_UPDATED_ITEM.status
                    resultUpdateReserva_vagas_AdministradorJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    resultUpdateReserva_vagas_AdministradorJson.message = message.SUCCES_UPDATED_ITEM.message
                    resultUpdateReserva_vagas_AdministradorJson.reserva_vagas_Administrador = dadosReserva_vagas_AdministradorUpdate

                    return resultUpdateReserva_vagas_AdministradorJson
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

const setDeletarReserva_vagas_AdministradorById = async function (id) {
    let jsonDeleteReserva_vagas_Administrador = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const validaId = await getBuscarReserva_vagas_AdministradorById(id)

            if (validaId) {
                const id = validaId.reserva_vagas_Administrador[0].id

                const apagarReserva_vagas_Administrador = await Reserva_vagas_AdministradorsDao.deleteReserva_vagas_Administrador(id)

                if (apagarReserva_vagas_Administrador) {
                    jsonDeleteReserva_vagas_Administrador.status = message.SUCCES_DELETED_ITEM.status
                    jsonDeleteReserva_vagas_Administrador.status_code = message.SUCCES_DELETED_ITEM.status_code
                    jsonDeleteReserva_vagas_Administrador.message = message.SUCCES_DELETED_ITEM.message
                    jsonDeleteReserva_vagas_Administrador.id = validaId.reserva_vagas_Administrador[0].id

                    return jsonDeleteReserva_vagas_Administrador
                } else {
                    console.log(dadosReserva_vagas_Administrador);
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
    getListarReserva_vagas_Administrador,
    getBuscarReserva_vagas_AdministradorById,
    getBuscarUltimoReserva_vagas_AdministradorInserido,
    setInserirReserva_vagas_Administradors,
    setAtualizarReserva_vagas_Administrador,
    setDeletarReserva_vagas_AdministradorById
}