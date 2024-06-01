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

const administradoresDao = require('../model/DAO/administradores.js')
const message = require('../modulo/config.js')

const getListarAdministradores = async function () {
    let jsonAdministradores = {}

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
}

const getBuscarAdministradorById = async function (id) {
    let jsonAdministrador = {}

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
}

module.exports = {
    getListarAdministradores,
    getBuscarAdministradorById,
}