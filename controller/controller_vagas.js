/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para as vagas
 * Data: 31/05/2024
 * Autores: Julia Aparecida da Silva Fonseca, 
 *          Luiz Henrique Vidal Araujo, 
 *          Raica Rodrigues Martinez Castro,
 *          Vitor Hugo Nascimento da Silva;
 * Versão: 1.0 
 ********************************************************/


const controllerReserva_vagas_administrador = require('./controller_reserva_vagas_administrador.js')
const controllerReserva_vagas_usuario = require('./controller_reserva_vagas_usuario.js')
const vagasDao = require('../model/DAO/vagas.js')
const message = require('../modulo/config.js')

const antigoDigito = `'`
const novoDigito = `|`

const antigoCarater = `"`
const novoCarater = ` || `

const getListarVagas = async function () {
    let jsonVagas = {}

    try {
        const dadosVagas = await vagasDao.selectAllVagas()

        if (dadosVagas) {
            if (dadosVagas.length > 0) {
                jsonVagas.vagas = dadosVagas
                jsonVagas.quantidade = dadosVagas.length
                jsonVagas.status_code = 200

                return jsonVagas
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

const getBuscarVagaById = async function (id) {
    let jsonVaga = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const dadosVaga = await vagasDao.selectByIdVaga(id)

            if (dadosVaga) {
                if (dadosVaga.length > 0) {
                    jsonVaga.vaga = dadosVaga
                    jsonVaga.status_code = 200

                    return jsonVaga
                } else {
                    return message.ERROR_NOT_FOUND
                }
            } else {
                console.log(dadosVaga);
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarUltimoVagaInserido = async function () {
    let jsonVaga = {}

    try {
        const idUltimoVaga = await vagasDao.selectLastIdVaga()

        if (idUltimoVaga) {
            if (idUltimoVaga.length > 0) {
                jsonVaga.idVaga = idUltimoVaga
                jsonVaga.status_code = 200

                return jsonVaga
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

const setInserirVagas = async function (contentType, dadosVaga) {
    try {
        if (String(contentType).toLocaleLowerCase() === "application/json") {

            let novaVagaJson = {}
            if (dadosVaga.sigla_vaga == "" || dadosVaga.sigla_vaga == undefined ||
                dadosVaga.sigla_vaga == null || dadosVaga.sigla_vaga.length > 10 ||
                dadosVaga.tipo_vaga == "" || dadosVaga.tipo_vaga == undefined ||
                dadosVaga.tipo_vaga == null || dadosVaga.tipo_vaga.length > 100 ||
                dadosVaga.status_vaga == "" || dadosVaga.status_vaga == undefined ||
                dadosVaga.status_vaga == null || dadosVaga.status_vaga.length > 100
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let novaVaga = await vagasDao.insertVaga(dadosVaga)

                if (novaVaga) {
                    let idNovaVaga = await vagasDao.selectLastIdVaga()

                    if (idNovaVaga) {
                        novaVagaJson.status = message.SUCCES_CREATED_ITEM.status
                        novaVagaJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                        novaVagaJson.message = message.SUCCES_CREATED_ITEM.message
                        novaVagaJson.id = idNovaVaga[0].id
                        novaVagaJson.novaVaga = dadosVaga

                        console.log(novaVaga);
                        return novaVagaJson
                    } else {
                        console.log("Novo ID:" + idNovaVaga);
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                } else {
                    console.log("Nova Vaga:" + dadosVaga);
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

const setAtualizarVaga = async function (id, dadosVagaUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {

        let updateVagaJson = {}
        let resultUpdateVagaJson = {}
        try {
            const validaId = await getBuscarVagaById(id)

            if (validaId) {

                let id = validaId.vaga[0].id
                let sigla_vaga = dadosVagaUpdate.sigla_vaga
                let tipo_vaga = dadosVagaUpdate.tipo_vaga
                let status_vaga = dadosVagaUpdate.status_vaga

                if (
                    sigla_vaga != '' &&
                    sigla_vaga != undefined &&
                    sigla_vaga != null &&
                    sigla_vaga.length < 100
                ) {
                    updateVagaJson.sigla_vaga = sigla_vaga.replace(/'/g, novoDigito)
                } else if (
                    sigla_vaga == '' &&
                    sigla_vaga == undefined &&
                    sigla_vaga == null
                ) { }

                if (
                    tipo_vaga != '' &&
                    tipo_vaga != undefined &&
                    tipo_vaga != null &&
                    tipo_vaga.length < 100
                ) {

                    updateVagaJson.tipo_vaga = tipo_vaga.replace(/'/g, novoDigito)
                } else if (
                    tipo_vaga == '' &&
                    tipo_vaga == undefined &&
                    tipo_vaga == null
                ) { }

                if (
                    status_vaga != '' &&
                    status_vaga != undefined &&
                    status_vaga != null &&
                    status_vaga.length == 20
                ) {
                    updateVagaJson.status_vaga = status_vaga
                } else if (
                    status_vaga == '' &&
                    status_vaga == undefined &&
                    status_vaga == null
                ) { }

                const VagaAtualizado = await vagasDao.updateVaga(id, updateVagaJson)

                if (VagaAtualizado) {
                    resultUpdateVagaJson.id = id
                    resultUpdateVagaJson.status = message.SUCCES_UPDATED_ITEM.status
                    resultUpdateVagaJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    resultUpdateVagaJson.message = message.SUCCES_UPDATED_ITEM.message
                    resultUpdateVagaJson.vaga = dadosVagaUpdate

                    return resultUpdateVagaJson
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

const setDeletarVagaById = async function (id) {
    let jsonDeleteVaga = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const validaId = await getBuscarVagaById(id)

            if (validaId) {
                const id = validaId.vaga[0].id

                const apagarReservaVagaAdministrador = await controllerReserva_vagas_administrador.setDeletarReserva_vagas_AdministradorById_vaga(id)

                if (apagarReservaVagaAdministrador) {
                    const apagarReservaVagaUsuario = await controllerReserva_vagas_usuario.setDeletarReserva_vagas_usuarioById_usuario(id)

                    if (apagarReservaVagaUsuario) {
                        const apagarVaga = await vagasDao.deleteVaga(id)

                        if (apagarVaga) {
                            jsonDeleteVaga.status = message.SUCCES_DELETED_ITEM.status
                            jsonDeleteVaga.status_code = message.SUCCES_DELETED_ITEM.status_code
                            jsonDeleteVaga.message = message.SUCCES_DELETED_ITEM.message
                            jsonDeleteVaga.id = validaId.vaga[0].id

                            return jsonDeleteVaga
                        } else {
                            console.log(dadosVaga);
                            return message.ERROR_INTERNAL_SERVER_DB
                        }
                    } else {
                        return message.ERROR_INTERNAL_SERVER
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER
                }
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    getListarVagas,
    getBuscarVagaById,
    getBuscarUltimoVagaInserido,
    setInserirVagas,
    setAtualizarVaga,
    setDeletarVagaById
}