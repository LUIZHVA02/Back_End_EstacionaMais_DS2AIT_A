/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para reserva_vaga_usuario
 * Data: 31/05/2024
 * Autores: Julia Aparecida da Silva Fonseca, 
 *          Luiz Henrique Vidal Araujo, 
 *          Raica Rodrigues Martinez Castro,
 *          Vitor Hugo Nascimento da Silva;
 * Versão: 1.0 
 ********************************************************/

const reserva_vagas_usuariosDao = require('../model/DAO/reserva_vagas_usuario.js')
const reservasDao = require('../model/DAO/reservas.js')
const usuariosDao = require('../model/DAO/usuarios.js')
const vagasDao = require('../model/DAO/vagas.js')
const veiculosDao = require('../model/DAO/veiculos.js')
const message = require('../modulo/config.js')

const antigoDigito = `'`
const novoDigito = `|`

const antigoCarater = `"`
const novoCarater = ` || `

const getListarReserva_vagas_usuario = async function () {
    let jsonReserva_vagas_usuarios = {}

    try {
        const dadosReserva_vagas_usuarios = await reserva_vagas_usuariosDao.selectAllReserva_vaga_usuario()

        if (dadosReserva_vagas_usuarios) {
            if (dadosReserva_vagas_usuarios.length > 0) {
                jsonReserva_vagas_usuarios.reserva_vagas_usuarios = dadosReserva_vagas_usuarios
                jsonReserva_vagas_usuarios.quantidade = dadosReserva_vagas_usuarios.length
                jsonReserva_vagas_usuarios.status_code = 200

                return jsonReserva_vagas_usuarios
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        console.log(error+"aqui");
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarReserva_vagas_usuarioById = async function (id) {
    let jsonReserva_vagas_usuario = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const dadosReserva_vagas_usuario = await reserva_vagas_usuariosDao.selectByIdReserva_vaga_usuario(id)

            if (dadosReserva_vagas_usuario) {
                if (dadosReserva_vagas_usuario.length > 0) {
                    jsonReserva_vagas_usuario.reserva_vagas_usuario = dadosReserva_vagas_usuario
                    jsonReserva_vagas_usuario.status_code = 200

                    return jsonReserva_vagas_usuario
                } else {
                    return message.ERROR_NOT_FOUND
                }
            } else {
                console.log(dadosReserva_vagas_usuario);
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarUltimoReserva_vagas_usuarioInserido = async function () {
    let jsonReserva_vagas_usuario = {}

    try {
        const idUltimoReserva_vagas_usuario = await reserva_vagas_usuariosDao.selectLastIdReserva_vaga_usuario()

        if (idUltimoReserva_vagas_usuario) {
            if (idUltimoReserva_vagas_usuario.length > 0) {
                jsonReserva_vagas_usuario.idReserva_vagas_usuario = idUltimoReserva_vagas_usuario
                jsonReserva_vagas_usuario.status_code = 200

                return jsonReserva_vagas_usuario
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

const setInserirReserva_vagas_usuarios = async function (contentType, dadosReserva_vagas_usuario) {
    try {
        if (String(contentType).toLocaleLowerCase() === "application/json") {

            let novoReserva_vagas_usuarioJson = {}
            if (dadosReserva_vagas_usuario.id_vaga == "" || dadosReserva_vagas_usuario.id_vaga == undefined ||
                dadosReserva_vagas_usuario.id_vaga == null || isNaN(dadosReserva_vagas_usuario.id_vaga) ||
                dadosReserva_vagas_usuario.id_reserva == "" || dadosReserva_vagas_usuario.id_reserva == undefined ||
                dadosReserva_vagas_usuario.id_reserva == null || isNaN(dadosReserva_vagas_usuario.id_reserva) ||
                dadosReserva_vagas_usuario.id_veiculo == "" || dadosReserva_vagas_usuario.id_veiculo == undefined ||
                dadosReserva_vagas_usuario.id_veiculo == null || isNaN(dadosReserva_vagas_usuario.id_veiculo) ||
                dadosReserva_vagas_usuario.id_usuario == "" || dadosReserva_vagas_usuario.id_usuario == undefined ||
                dadosReserva_vagas_usuario.id_usuario == null || isNaN(dadosReserva_vagas_usuario.id_usuario)
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let id_vaga_validate = await vagasDao.selectByIdVaga(dadosReserva_vagas_usuario.id_vaga)
                let id_reserva_validate = await reservasDao.selectByIdReservas(dadosReserva_vagas_usuario.id_reserva)
                let id_veiculo_validate = await veiculosDao.selectByIdVeiculo(dadosReserva_vagas_usuario.id_veiculo)
                let id_usuario_validate = await usuariosDao.selectByIdUsuario(dadosReserva_vagas_usuario.id_usuario)

                if (
                    id_vaga_validate != false && id_reserva_validate != false &&
                    id_veiculo_validate != false && id_usuario_validate != false
                ) {

                } else {
                    return message.ERROR_INVALID_ID
                }

                let novoReserva_vagas_usuario = await reserva_vagas_usuariosDao.insertReserva_vaga_usuario(dadosReserva_vagas_usuario)

                if (novoReserva_vagas_usuario) {
                    let idNovoReserva_vagas_usuario = await reserva_vagas_usuariosDao.selectLastIdReserva_vaga_usuario()

                    if (idNovoReserva_vagas_usuario) {
                        novoReserva_vagas_usuarioJson.status = message.SUCCES_CREATED_ITEM.status
                        novoReserva_vagas_usuarioJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                        novoReserva_vagas_usuarioJson.message = message.SUCCES_CREATED_ITEM.message
                        novoReserva_vagas_usuarioJson.id = idNovoReserva_vagas_usuario[0].id
                        novoReserva_vagas_usuarioJson.novoReserva_vagas_usuario = dadosReserva_vagas_usuario

                        console.log(novoReserva_vagas_usuario);
                        return novoReserva_vagas_usuarioJson
                    } else {
                        console.log("Novo ID:" + idNovoReserva_vagas_usuario);
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                } else {
                    console.log("Novo Reserva_vagas_usuario:" + dadosReserva_vagas_usuario);
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

const setAtualizarReserva_vagas_usuario = async function (id, dadosReserva_vagas_usuarioUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {

        let updateReserva_vagas_usuarioJson = {}
        let resultUpdateReserva_vagas_usuarioJson = {}
        try {
            const validaId = await getBuscarReserva_vagas_usuarioById(id)

            if (validaId) {
                let id_vaga_validate = await vagasDao.selectByIdVaga(dadosReserva_vagas_usuarioUpdate.id_vaga)
                let id_reserva_validate = await reservasDao.selectByIdReservas(dadosReserva_vagas_usuarioUpdate.id_reserva)
                let id_veiculo_validate = await veiculosDao.selectByIdVeiculo(dadosReserva_vagas_usuarioUpdate.id_veiculo)
                let id_usuario_validate = await usuariosDao.selectByIdUsuario(dadosReserva_vagas_usuarioUpdate.id_usuario)

                if (
                    id_vaga_validate != false && id_reserva_validate != false &&
                    id_veiculo_validate != false && id_usuario_validate != false
                ) {
                    let id = validaId.reserva_vagas_usuario[0].id
                    let id_vaga = dadosReserva_vagas_usuarioUpdate.id_vaga
                    let id_reserva = dadosReserva_vagas_usuarioUpdate.id_reserva
                    let id_veiculo = dadosReserva_vagas_usuarioUpdate.id_veiculo
                    let id_usuario = dadosReserva_vagas_usuarioUpdate.id_usuario

                    if (
                        id_vaga != '' &&
                        id_vaga != undefined &&
                        id_vaga != null
                    ) {
                        updateReserva_vagas_usuarioJson.id_vaga = id_vaga
                    } else if (
                        id_vaga == '' &&
                        id_vaga == undefined &&
                        id_vaga == null
                    ) { }

                    if (
                        id_reserva != '' &&
                        id_reserva != undefined &&
                        id_reserva != null
                    ) {
                        updateReserva_vagas_usuarioJson.id_reserva = id_reserva
                    } else if (
                        id_reserva == '' &&
                        id_reserva == undefined &&
                        id_reserva == null
                    ) { }

                    if (
                        id_veiculo != '' &&
                        id_veiculo != undefined &&
                        id_veiculo != null
                    ) {
                        updateReserva_vagas_usuarioJson.id_veiculo = id_veiculo
                    } else if (
                        id_veiculo == '' &&
                        id_veiculo == undefined &&
                        id_veiculo == null
                    ) { }

                    if (
                        id_usuario != '' &&
                        id_usuario != undefined &&
                        id_usuario != null
                    ) {
                        updateReserva_vagas_usuarioJson.id_usuario = id_usuario
                    } else if (
                        id_usuario == '' &&
                        id_usuario == undefined &&
                        id_usuario == null
                    ) { }
                    
                    const reserva_vagas_usuarioAtualizado = await reserva_vagas_usuariosDao.updateReserva_vaga_usuario(id, updateReserva_vagas_usuarioJson)
                    
                    

                    if (reserva_vagas_usuarioAtualizado) {
                        resultUpdateReserva_vagas_usuarioJson.id = id
                        resultUpdateReserva_vagas_usuarioJson.status = message.SUCCES_UPDATED_ITEM.status
                        resultUpdateReserva_vagas_usuarioJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                        resultUpdateReserva_vagas_usuarioJson.message = message.SUCCES_UPDATED_ITEM.message
                        resultUpdateReserva_vagas_usuarioJson.reserva_vagas_usuario = dadosReserva_vagas_usuarioUpdate

                        return resultUpdateReserva_vagas_usuarioJson
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

const setDeletarReserva_vagas_usuarioById = async function (id) {
    let jsonDeleteReserva_vagas_usuario = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const validaId = await getBuscarReserva_vagas_usuarioById(id)

            if (validaId) {
                const id = validaId.reserva_vagas_usuario[0].id

                const apagarReserva_vagas_usuario = await reserva_vagas_usuariosDao.deleteReserva_vaga_usuario(id)

                if (apagarReserva_vagas_usuario) {
                    jsonDeleteReserva_vagas_usuario.status = message.SUCCES_DELETED_ITEM.status
                    jsonDeleteReserva_vagas_usuario.status_code = message.SUCCES_DELETED_ITEM.status_code
                    jsonDeleteReserva_vagas_usuario.message = message.SUCCES_DELETED_ITEM.message
                    jsonDeleteReserva_vagas_usuario.id = validaId.reserva_vagas_usuario[0].id

                    return jsonDeleteReserva_vagas_usuario
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
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



const setDeletarReserva_vagas_usuarioById_vaga = async function (id) {
    let jsonDeleteReserva_vagas_usuario = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const validaId = await getBuscarReserva_vagas_usuarioById(id)

            if (validaId) {
                const id = validaId.reserva_vagas_usuario[0].id

                const apagarReserva_vagas_usuario = await reserva_vagas_usuariosDao.deleteReserva_vaga_usuarioId_vaga(id)

                if (apagarReserva_vagas_usuario) {
                    jsonDeleteReserva_vagas_usuario.status = message.SUCCES_DELETED_ITEM.status
                    jsonDeleteReserva_vagas_usuario.status_code = message.SUCCES_DELETED_ITEM.status_code
                    jsonDeleteReserva_vagas_usuario.message = message.SUCCES_DELETED_ITEM.message
                    jsonDeleteReserva_vagas_usuario.id = validaId.reserva_vagas_usuario[0].id

                    return jsonDeleteReserva_vagas_usuario
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
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

const setDeletarReserva_vagas_usuarioById_reserva = async function (id) {
    let jsonDeleteReserva_vagas_usuario = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const validaId = await getBuscarReserva_vagas_usuarioById(id)

            if (validaId) {
                const id = validaId.reserva_vagas_usuario[0].id

                const apagarReserva_vagas_usuario = await reserva_vagas_usuariosDao.deleteReserva_vaga_usuarioId_reserva(id)

                if (apagarReserva_vagas_usuario) {
                    jsonDeleteReserva_vagas_usuario.status = message.SUCCES_DELETED_ITEM.status
                    jsonDeleteReserva_vagas_usuario.status_code = message.SUCCES_DELETED_ITEM.status_code
                    jsonDeleteReserva_vagas_usuario.message = message.SUCCES_DELETED_ITEM.message
                    jsonDeleteReserva_vagas_usuario.id = validaId.reserva_vagas_usuario[0].id

                    return jsonDeleteReserva_vagas_usuario
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
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

const setDeletarReserva_vagas_usuarioById_usuario = async function (id) {
    let jsonDeleteReserva_vagas_usuario = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const validaId = await getBuscarReserva_vagas_usuarioById(id)

            if (validaId) {
                const id = validaId.reserva_vagas_usuario[0].id

                const apagarReserva_vagas_usuario = await reserva_vagas_usuariosDao.deleteReserva_vaga_usuarioId_usuario(id)

                if (apagarReserva_vagas_usuario) {
                    jsonDeleteReserva_vagas_usuario.status = message.SUCCES_DELETED_ITEM.status
                    jsonDeleteReserva_vagas_usuario.status_code = message.SUCCES_DELETED_ITEM.status_code
                    jsonDeleteReserva_vagas_usuario.message = message.SUCCES_DELETED_ITEM.message
                    jsonDeleteReserva_vagas_usuario.id = validaId.reserva_vagas_usuario[0].id

                    return jsonDeleteReserva_vagas_usuario
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
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

const setDeletarReserva_vagas_usuarioById_veiculo = async function (id) {
    let jsonDeleteReserva_vagas_usuario = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const validaId = await getBuscarReserva_vagas_usuarioById(id)

            if (validaId) {
                const id = validaId.reserva_vagas_usuario[0].id

                const apagarReserva_vagas_usuario = await reserva_vagas_usuariosDao.deleteReserva_vaga_usuarioId_veiculo(id)

                if (apagarReserva_vagas_usuario) {
                    jsonDeleteReserva_vagas_usuario.status = message.SUCCES_DELETED_ITEM.status
                    jsonDeleteReserva_vagas_usuario.status_code = message.SUCCES_DELETED_ITEM.status_code
                    jsonDeleteReserva_vagas_usuario.message = message.SUCCES_DELETED_ITEM.message
                    jsonDeleteReserva_vagas_usuario.id = validaId.reserva_vagas_usuario[0].id

                    return jsonDeleteReserva_vagas_usuario
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
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
    getListarReserva_vagas_usuario,
    getBuscarReserva_vagas_usuarioById,
    getBuscarUltimoReserva_vagas_usuarioInserido,
    setInserirReserva_vagas_usuarios,
    setAtualizarReserva_vagas_usuario,
    setDeletarReserva_vagas_usuarioById,
    setDeletarReserva_vagas_usuarioById_vaga,
    setDeletarReserva_vagas_usuarioById_reserva,
    setDeletarReserva_vagas_usuarioById_usuario,
    setDeletarReserva_vagas_usuarioById_veiculo
}