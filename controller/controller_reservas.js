/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para as reservas
 * Data: 31/05/2024
 * Autores: Julia Aparecida da Silva Fonseca, 
 *          Luiz Henrique Vidal Araujo, 
 *          Raica Rodrigues Martinez Castro,
 *          Vitor Hugo Nascimento da Silva;
 * Versão: 1.0 
 ********************************************************/

const reservasDao = require('../model/DAO/reservas.js')
const message = require('../modulo/config.js')

const getListarReservas = async function () {
    let jsonReservas = {}

    const dadosReservas = await reservasDao.selectAllReservas()

    if (dadosReservas) {
        if (dadosReservas.length > 0) {
            jsonReservas.reservas = dadosReservas
            jsonReservas.quantidade = dadosReservas.length
            jsonReservas.status_code = 200

            return jsonReservas
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

module.exports = {
    getListarReservas
}