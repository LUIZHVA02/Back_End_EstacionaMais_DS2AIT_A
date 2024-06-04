/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para usuario_veiculos
 * Data: 31/05/2024
 * Autores: Julia Aparecida da Silva Fonseca, 
 *          Luiz Henrique Vidal Araujo, 
 *          Raica Rodrigues Martinez Castro,
 *          Vitor Hugo Nascimento da Silva;
 * Versão: 1.0 
 ********************************************************/

const usuario_veiculosDao = require('../model/DAO/usuario_veiculos.js')
const message = require('../modulo/config.js')

const antigoDigito = `'`
const novoDigito = `|`

const antigoCarater = `"`
const novoCarater = ` || `

const getListarUsuario_veiculos = async function () {
    let jsonUsuario_veiculos = {}

    try {
        const dadosUsuario_veiculos = await usuario_veiculosDao.selectAllUsuario_veiculo()

        if (dadosUsuario_veiculos) {
            if (dadosUsuario_veiculos.length > 0) {
                jsonUsuario_veiculos.usuario_veiculos = dadosUsuario_veiculos
                jsonUsuario_veiculos.quantidade = dadosUsuario_veiculos.length
                jsonUsuario_veiculos.status_code = 200

                return jsonUsuario_veiculos
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

const getBuscarUsuario_veiculoById = async function (id) {
    let jsonUsuario_veiculo = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const dadosUsuario_veiculo = await usuario_veiculosDao.selectByIdUsuario_veiculo(id)

            if (dadosUsuario_veiculo) {
                if (dadosUsuario_veiculo.length > 0) {
                    jsonUsuario_veiculo.usuario_veiculo = dadosUsuario_veiculo
                    jsonUsuario_veiculo.status_code = 200

                    return jsonUsuario_veiculo
                } else {
                    return message.ERROR_NOT_FOUND
                }
            } else {
                console.log(dadosUsuario_veiculo);
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarUltimoUsuario_veiculoInserido = async function () {
    let jsonUsuario_veiculo = {}

    try {
        const idUltimoUsuario_veiculo = await usuario_veiculosDao.selectLastIdUsuario_veiculo()

        if (idUltimoUsuario_veiculo) {
            if (idUltimoUsuario_veiculo.length > 0) {
                jsonUsuario_veiculo.idUsuario_veiculo = idUltimoUsuario_veiculo
                jsonUsuario_veiculo.status_code = 200

                return jsonUsuario_veiculo
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

const setInserirUsuario_veiculos = async function (contentType, dadosUsuario_veiculo) {
    try {
        if (String(contentType).toLocaleLowerCase() === "application/json") {

            let novoUsuario_veiculoJson = {}
            if (dadosUsuario_veiculo.id_usuario == "" || dadosUsuario_veiculo.id_usuario == undefined ||
                dadosUsuario_veiculo.id_usuario == null || isNaN(dadosUsuario_veiculo.id_usuario)||
                dadosUsuario_veiculo.id_veiculo == "" || dadosUsuario_veiculo.id_veiculo == undefined ||
                dadosUsuario_veiculo.id_veiculo == null || isNaN(dadosUsuario_veiculo.id_veiculo)
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let novoUsuario_veiculo = await usuario_veiculosDao.insertUsuario_veiculo(dadosUsuario_veiculo)

                if (novoUsuario_veiculo) {
                    let idNovoUsuario_veiculo = await usuario_veiculosDao.selectLastIdUsuario_veiculo()

                    if (idNovoUsuario_veiculo) {
                        novoUsuario_veiculoJson.status = message.SUCCES_CREATED_ITEM.status
                        novoUsuario_veiculoJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                        novoUsuario_veiculoJson.message = message.SUCCES_CREATED_ITEM.message
                        novoUsuario_veiculoJson.id = idNovoUsuario_veiculo[0].id
                        novoUsuario_veiculoJson.novoUsuario_veiculo = dadosUsuario_veiculo

                        console.log(novoUsuario_veiculo);
                        return novoUsuario_veiculoJson
                    } else {
                        console.log("Novo ID:" + idNovoUsuario_veiculo);
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                } else {
                    console.log("Novo Usuario_veiculo:" + dadosUsuario_veiculo);
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

const setAtualizarUsuario_veiculo = async function (id, dadosUsuario_veiculoUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {

        let updateUsuario_veiculoJson = {}
        let resultUpdateUsuario_veiculoJson = {}
        try {
            const validaId = await getBuscarUsuario_veiculoById(id)

            if (validaId) {

                let id = validaId.usuario_veiculo[0].id
                let id_usuario = dadosUsuario_veiculoUpdate.id_usuario
                let id_veiculo = dadosUsuario_veiculoUpdate.id_veiculo

                if (
                    id_usuario != '' &&
                    id_usuario != undefined &&
                    id_usuario != null &&
                    id_usuario.length < 100
                ) {
                    updateUsuario_veiculoJson.id_usuario = id_usuario
                } else if (
                    id_usuario == '' &&
                    id_usuario == undefined &&
                    id_usuario == null
                ) { }

                if (
                    id_veiculo != '' &&
                    id_veiculo != undefined &&
                    id_veiculo != null &&
                    id_veiculo.length < 100
                ) {

                    updateUsuario_veiculoJson.id_veiculo = id_veiculo
                } else if (
                    id_veiculo == '' &&
                    id_veiculo == undefined &&
                    id_veiculo == null
                ) { }

                const Usuario_veiculoAtualizado = await usuario_veiculosDao.updateUsuario_veiculo(id, updateUsuario_veiculoJson)

                if (Usuario_veiculoAtualizado) {
                    resultUpdateUsuario_veiculoJson.id = id
                    resultUpdateUsuario_veiculoJson.status = message.SUCCES_UPDATED_ITEM.status
                    resultUpdateUsuario_veiculoJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    resultUpdateUsuario_veiculoJson.message = message.SUCCES_UPDATED_ITEM.message
                    resultUpdateUsuario_veiculoJson.usuario_veiculo = dadosUsuario_veiculoUpdate

                    return resultUpdateUsuario_veiculoJson
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

const setDeletarUsuario_veiculoById = async function (id) {
    let jsonDeleteUsuario_veiculo = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const validaId = await getBuscarUsuario_veiculoById(id)

            if (validaId) {
                const id = validaId.usuario_veiculo[0].id

                const apagarUsuario_veiculo = await usuario_veiculosDao.deleteUsuario_veiculo(id)

                if (apagarUsuario_veiculo) {
                    jsonDeleteUsuario_veiculo.status = message.SUCCES_DELETED_ITEM.status
                    jsonDeleteUsuario_veiculo.status_code = message.SUCCES_DELETED_ITEM.status_code
                    jsonDeleteUsuario_veiculo.message = message.SUCCES_DELETED_ITEM.message
                    jsonDeleteUsuario_veiculo.id = validaId.usuario_veiculo[0].id

                    return jsonDeleteUsuario_veiculo
                } else {
                    console.log(dadosUsuario_veiculo);
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
    getListarUsuario_veiculos,
    getBuscarUsuario_veiculoById,
    getBuscarUltimoUsuario_veiculoInserido,
    setInserirUsuario_veiculos,
    setAtualizarUsuario_veiculo,
    setDeletarUsuario_veiculoById
}