/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para os usuários
 * Data: 31/05/2024
 * Autores: Julia Aparecida da Silva Fonseca, 
 *          Luiz Henrique Vidal Araujo, 
 *          Raica Rodrigues Martinez Castro,
 *          Vitor Hugo Nascimento da Silva;
 * Versão: 1.0 
 ********************************************************/


const controllerPagamento_Reserva = require('./controller_pagamento_reservas.js')
const controllerUsuario_veiculos = require('./controller_usuario_veiculos.js')
const controllerReserva_vagas_usuario = require('./controller_reserva_vagas_usuario.js')
const usuariosDao = require('../model/DAO/usuarios.js')
const message = require('../modulo/config.js')


const antigoDigito = `'`
const novoDigito = `|`

const antigoCarater = `"`
const novoCarater = ` || `

const getListarUsuarios = async function () {
    let jsonUsuarios = {}

    try {
        const dadosUsuarios = await usuariosDao.selectAllUsuarios()

        if (dadosUsuarios) {
            if (dadosUsuarios.length > 0) {
                jsonUsuarios.usuarios = dadosUsuarios
                jsonUsuarios.quantidade = dadosUsuarios.length
                jsonUsuarios.status_code = 200

                return jsonUsuarios
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

const getBuscarUsuarioById = async function (id) {
    let jsonUsuario = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const dadosUsuario = await usuariosDao.selectByIdUsuario(id)

            if (dadosUsuario) {
                if (dadosUsuario.length > 0) {
                    jsonUsuario.usuario = dadosUsuario
                    jsonUsuario.status_code = 200

                    return jsonUsuario
                } else {
                    return message.ERROR_NOT_FOUND
                }
            } else {
                console.log(dadosUsuario);
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarUltimoUsuarioInserido = async function () {
    let jsonUsuario = {}

    try {
        const idUltimoUsuario = await usuariosDao.selectLastIdUsuario()

        if (idUltimoUsuario) {
            if (idUltimoUsuario.length > 0) {
                jsonUsuario.idUsuario = idUltimoUsuario
                jsonUsuario.status_code = 200

                return jsonUsuario
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

const setInserirUsuarios = async function (contentType, dadosUsuario) {
    try {
        if (String(contentType).toLocaleLowerCase() === "application/json") {

            let novoUsuarioJson = {}
            if (dadosUsuario.nome == "" || dadosUsuario.nome == undefined ||
                dadosUsuario.nome == null || dadosUsuario.nome.length > 100 ||
                dadosUsuario.email == "" || dadosUsuario.email == undefined ||
                dadosUsuario.email == null || dadosUsuario.email.length > 100 ||
                dadosUsuario.telefone == "" || dadosUsuario.telefone == undefined ||
                dadosUsuario.telefone == null || dadosUsuario.telefone.length > 20 ||
                dadosUsuario.endereco == "" || dadosUsuario.endereco == undefined ||
                dadosUsuario.endereco == null || dadosUsuario.endereco.length > 300 ||
                dadosUsuario.cpf == "" || dadosUsuario.cpf == undefined ||
                dadosUsuario.cpf == null || dadosUsuario.cpf.length > 15 ||
                dadosUsuario.senha == "" || dadosUsuario.senha == undefined ||
                dadosUsuario.senha == null || dadosUsuario.senha.length > 100
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let novoUsuario = await usuariosDao.insertUsuario(dadosUsuario)

                if (novoUsuario) {
                    let idNovoUsuario = await usuariosDao.selectLastIdUsuario()

                    if (idNovoUsuario) {
                        novoUsuarioJson.status = message.SUCCES_CREATED_ITEM.status
                        novoUsuarioJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                        novoUsuarioJson.message = message.SUCCES_CREATED_ITEM.message
                        novoUsuarioJson.id = idNovoUsuario[0].id
                        novoUsuarioJson.novoUsuario = dadosUsuario

                        console.log(novoUsuario);
                        return novoUsuarioJson
                    } else {
                        console.log("Novo ID:" + idNovoUsuario);
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                } else {
                    console.log("Novo Usuario:" + dadosUsuario);
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

const setAtualizarUsuario = async function (id, dadosUsuarioUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {

        let updateUsuarioJson = {}
        let resultUpdateUsuarioJson = {}
        try {
            const validaId = await getBuscarUsuarioById(id)

            if (validaId) {
                let id = validaId.usuario[0].id
                let nome = dadosUsuarioUpdate.nome
                let email = dadosUsuarioUpdate.email
                let telefone = dadosUsuarioUpdate.telefone
                let endereco = dadosUsuarioUpdate.endereco
                let cpf = dadosUsuarioUpdate.cpf
                let senhaOriginal = dadosUsuarioUpdate.senha

                if (
                    nome != '' &&
                    nome != undefined &&
                    nome != null &&
                    nome.length < 100
                ) {
                    updateUsuarioJson.nome = nome.replace(/'/g, novoDigito)
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

                    updateUsuarioJson.email = email.replace(/'/g, novoDigito)
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
                    updateUsuarioJson.telefone = telefone
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
                    updateUsuarioJson.endereco = endereco
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
                    updateUsuarioJson.cpf = cpf
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
                    let senha = senhaOriginal.replace(/'/g, novoDigito)
                    updateUsuarioJson.senha = senha.replace(/"/g, novoCarater)

                } else if (
                    senhaOriginal == '' &&
                    senhaOriginal == undefined &&
                    senhaOriginal == null
                ) { }

                const usuarioAtualizado = await usuariosDao.updateUsuario(id, updateUsuarioJson)

                if (usuarioAtualizado) {
                    resultUpdateUsuarioJson.id = id
                    resultUpdateUsuarioJson.status = message.SUCCES_UPDATED_ITEM.status
                    resultUpdateUsuarioJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    resultUpdateUsuarioJson.message = message.SUCCES_UPDATED_ITEM.message
                    resultUpdateUsuarioJson.usuario = dadosUsuarioUpdate

                    return resultUpdateUsuarioJson
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

const setDeletarUsuarioById = async function (id) {
    let jsonDeleteUsuario = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const validaId = await getBuscarUsuarioById(id)

            if (validaId) {
                const id = validaId.usuario[0].id

                const apagarReservaUsuario = await controllerReserva_vagas_usuario.setDeletarReserva_vagas_usuarioById_usuario(id)

                if (apagarReservaUsuario) {
                    const apagarVeiculoUsuario = await controllerUsuario_veiculos.setDeletarUsuario_veiculoById_usuario(id)

                    if (apagarVeiculoUsuario) {
                        const apagarPagamentoUsuario = await controllerPagamento_Reserva.setDeletarPagamento_reservaById_usuario(id)

                        if (apagarPagamentoUsuario) {
                            const apagarUsuario = await usuariosDao.deleteUsuario(id)

                            if (apagarUsuario) {
                                jsonDeleteUsuario.status = message.SUCCES_DELETED_ITEM.status
                                jsonDeleteUsuario.status_code = message.SUCCES_DELETED_ITEM.status_code
                                jsonDeleteUsuario.message = message.SUCCES_DELETED_ITEM.message
                                jsonDeleteUsuario.id = validaId.usuario[0].id

                                return jsonDeleteUsuario
                            } else {
                                console.log(dadosUsuario);
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
    getListarUsuarios,
    getBuscarUsuarioById,
    getBuscarUltimoUsuarioInserido,
    setInserirUsuarios,
    setAtualizarUsuario,
    setDeletarUsuarioById
}