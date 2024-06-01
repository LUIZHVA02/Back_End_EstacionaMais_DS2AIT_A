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

const usuariosDao = require('../model/DAO/usuarios.js')
const message = require('../modulo/config.js')

const getListarUsuarios = async function () {
    let jsonUsuarios = {}

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
}

module.exports = {
    getListarUsuarios
}