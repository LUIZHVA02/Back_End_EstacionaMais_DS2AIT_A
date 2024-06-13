/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para os administradores
 * Data: 31/05/2024
 * Autores: Julia Aparecida da Silva Fonseca, 
 *          Luiz Henrique Vidal Araujo, 
 *          Raica Rodrigues Martinez Castro,
 *          Vitor Hugo Nascimento da Silva;
 * Versão: 1.0 
 ********************************************************/

const controller_reserva_vagas_administrador = require('./controller_reserva_vagas_administrador')
const administradoresDao = require('../model/DAO/administradores.js')
const message = require('../modulo/config.js')

const antigoDigito = `'`
const novoDigito = `|`

const antigoCarater = `"`
const novoCarater = ` || `

const getListarAdministradores = async function () {
    let jsonAdministradores = {}

    try {
        const dadosAdministradores = await administradoresDao.selectAllAdministradores()

        if (dadosAdministradores) {
            if (dadosAdministradores.length > 0) {
                jsonAdministradores.administradores = dadosAdministradores
                jsonAdministradores.quantidade = dadosAdministradores.length
                jsonAdministradores.status_code = 200

                return jsonAdministradores
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

const getBuscarAdministradorById = async function (id) {
    let jsonAdministrador = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const dadosAdministrador = await administradoresDao.selectByIdAdministrador(id)

            if (dadosAdministrador) {
                if (dadosAdministrador.length > 0) {
                    jsonAdministrador.administrador = dadosAdministrador
                    jsonAdministrador.status_code = 200

                    return jsonAdministrador
                } else {
                    return message.ERROR_NOT_FOUND
                }
            } else {
                console.log(dadosAdministrador);
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarUltimoAdministradorInserido = async function () {
    let jsonAdministrador = {}

    try {
        const idUltimoAdministrador = await administradoresDao.selectLastIdAdministrador()

        if (idUltimoAdministrador) {
            if (idUltimoAdministrador.length > 0) {
                jsonAdministrador.idAdministrador = idUltimoAdministrador
                jsonAdministrador.status_code = 200

                return jsonAdministrador
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

const setInserirAdministradores = async function (contentType, dadosAdministrador) {
    try {
        if (String(contentType).toLocaleLowerCase() === "application/json") {

            let novoAdministradorJson = {}
            if (dadosAdministrador.nome == "" || dadosAdministrador.nome == undefined ||
                dadosAdministrador.nome == null || dadosAdministrador.nome.length > 100 ||
                dadosAdministrador.email == "" || dadosAdministrador.email == undefined ||
                dadosAdministrador.email == null || dadosAdministrador.email.length > 100 ||
                dadosAdministrador.telefone == "" || dadosAdministrador.telefone == undefined ||
                dadosAdministrador.telefone == null || dadosAdministrador.telefone.length > 20 ||
                dadosAdministrador.endereco == "" || dadosAdministrador.endereco == undefined ||
                dadosAdministrador.endereco == null || dadosAdministrador.endereco.length > 300 ||
                dadosAdministrador.cpf == "" || dadosAdministrador.cpf == undefined ||
                dadosAdministrador.cpf == null || dadosAdministrador.cpf.length > 15 ||
                dadosAdministrador.senha == "" || dadosAdministrador.senha == undefined ||
                dadosAdministrador.senha == null || dadosAdministrador.senha.length > 100
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let novoAdministrador = await administradoresDao.insertAdministrador(dadosAdministrador)

                if (novoAdministrador) {
                    let idNovoAdministrador = await administradoresDao.selectLastIdAdministrador()

                    if (idNovoAdministrador) {
                        novoAdministradorJson.status = message.SUCCES_CREATED_ITEM.status
                        novoAdministradorJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                        novoAdministradorJson.message = message.SUCCES_CREATED_ITEM.message
                        novoAdministradorJson.id = idNovoAdministrador[0].id
                        novoAdministradorJson.novoAdministrador = dadosAdministrador

                        console.log(novoAdministrador);
                        return novoAdministradorJson
                    } else {
                        console.log("Novo ID:" + idNovoAdministrador);
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                } else {
                    console.log("Novo administrador:" + dadosAdministrador);
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

const setAtualizarAdministrador = async function (id, dadosAdministradorUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {

        let updateAdministradorJson = {}
        let resultUpdateAdministradorJson = {}
        try {
            const validaId = await getBuscarAdministradorById(id)

            if (validaId) {

                let id = validaId.administrador[0].id
                let nome = dadosAdministradorUpdate.nome
                let email = dadosAdministradorUpdate.email
                let telefone = dadosAdministradorUpdate.telefone
                let endereco = dadosAdministradorUpdate.endereco
                let cpf = dadosAdministradorUpdate.cpf
                let senhaOriginal = dadosAdministradorUpdate.senha

                if (
                    nome != '' &&
                    nome != undefined &&
                    nome != null &&
                    nome.length < 100
                ) {
                    updateAdministradorJson.nome = nome.replace(/'/g, novoDigito)
                } else if (
                    nome == '' &&
                    nome == undefined &&
                    nome == null
                ) { }

                if (
                    email != '' &&
                    email != undefined &&
                    email != null &&
                    email.length < 100
                ) {

                    updateAdministradorJson.email = email.replace(/'/g, novoDigito)
                } else if (
                    email == '' &&
                    email == undefined &&
                    email == null
                ) { }

                if (
                    telefone != '' &&
                    telefone != undefined &&
                    telefone != null &&
                    telefone.length == 20
                ) {
                    updateAdministradorJson.telefone = telefone
                } else if (
                    telefone == '' &&
                    telefone == undefined &&
                    telefone == null
                ) { }

                if (
                    endereco != '' &&
                    endereco != undefined &&
                    endereco != null &&
                    endereco.length == 300
                ) {
                    updateAdministradorJson.endereco = endereco
                } else if (
                    endereco == '' &&
                    endereco == undefined &&
                    endereco == null
                ) { }

                if (
                    cpf != '' &&
                    cpf != undefined &&
                    cpf != null &&
                    cpf.length == 15
                ) {
                    updateAdministradorJson.cpf = cpf
                } else if (
                    cpf == '' &&
                    cpf == undefined &&
                    cpf == null
                ) { }

                if (
                    senhaOriginal != '' &&
                    senhaOriginal != undefined &&
                    senhaOriginal != null &&
                    senhaOriginal.length == 100
                ) {
                    updateAdministradorJson.senha = senha.replace(/'/g, novoDigito)

                } else if (
                    senhaOriginal == '' &&
                    senhaOriginal == undefined &&
                    senhaOriginal == null
                ) { }

                const administradorAtualizado = await administradoresDao.updateAdministrador(id, updateAdministradorJson)

                if (administradorAtualizado) {
                    resultUpdateAdministradorJson.id = id
                    resultUpdateAdministradorJson.status = message.SUCCES_UPDATED_ITEM.status
                    resultUpdateAdministradorJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    resultUpdateAdministradorJson.message = message.SUCCES_UPDATED_ITEM.message
                    resultUpdateAdministradorJson.Administrador = dadosAdministradorUpdate

                    return resultUpdateAdministradorJson
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

const setDeletarAdministradorById = async function (id) {
    let jsonDeleteAdministrador = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const validaId = await getBuscarAdministradorById(id)

            if (validaId) {
                const id = validaId.administrador[0].id

                const apagarReservaAdministrador = await controller_reserva_vagas_administrador.setDeletarReserva_vagas_AdministradorById_Administrador(id)

                if (apagarReservaAdministrador) {
                    const apagarAdministrador = await administradoresDao.deleteAdministrador(id)

                    if (apagarAdministrador) {
                        jsonDeleteAdministrador.status = message.SUCCES_DELETED_ITEM.status
                        jsonDeleteAdministrador.status_code = message.SUCCES_DELETED_ITEM.status_code
                        jsonDeleteAdministrador.message = message.SUCCES_DELETED_ITEM.message
                        jsonDeleteAdministrador.id = validaId.administrador[0].id

                        return jsonDeleteAdministrador
                    } else {
                        console.log(dadosAdministrador);
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
    getListarAdministradores,
    getBuscarAdministradorById,
    getBuscarUltimoAdministradorInserido,
    setInserirAdministradores,
    setAtualizarAdministrador,
    setDeletarAdministradorById
}