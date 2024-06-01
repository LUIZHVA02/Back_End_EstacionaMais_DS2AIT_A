/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para os veículos
 * Data: 31/05/2024
 * Autores: Julia Aparecida da Silva Fonseca, 
 *          Luiz Henrique Vidal Araujo, 
 *          Raica Rodrigues Martinez Castro,
 *          Vitor Hugo Nascimento da Silva;
 * Versão: 1.0 
 ********************************************************/

const veiculosDao = require('../model/DAO/veiculos.js')
const message = require('../modulo/config.js')

const getListarVeiculos = async function () {
    let jsonVeiculos = {}

    const dadosVeiculos = await veiculosDao.selectAllVeiculos()

    if (dadosVeiculos) {
        if (dadosVeiculos.length > 0) {
            jsonVeiculos.veiculos = dadosVeiculos
            jsonVeiculos.quantidade = dadosVeiculos.length
            jsonVeiculos.status_code = 200

            return jsonVeiculos
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

module.exports = {
    getListarVeiculos
}