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

const vagasDao = require('../model/DAO/vagas.js')
const message = require('../modulo/config.js')

const getListarVagas = async function () {
    let jsonVagas = {}

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
}

module.exports = {
    getListarVagas
}