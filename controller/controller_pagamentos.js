/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para os pagamentos
 * Data: 31/05/2024
 * Autores: Julia Aparecida da Silva Fonseca, 
 *          Luiz Henrique Vidal Araujo, 
 *          Raica Rodrigues Martinez Castro,
 *          Vitor Hugo Nascimento da Silva;
 * Versão: 1.0 
 ********************************************************/

const pagamentosDao = require('../model/DAO/pagamentos.js')
const message = require('../modulo/config.js')

const getListarPagamentos = async function () {
    let jsonPagamentos = {}

    const dadosPagamentos = await pagamentosDao.selectAllPagamentos()

    if (dadosPagamentos) {
        if (dadosPagamentos.length > 0) {
            jsonPagamentos.pagamentos = dadosPagamentos
            jsonPagamentos.quantidade = dadosPagamentos.length
            jsonPagamentos.status_code = 200

            return jsonPagamentos
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

module.exports = {
    getListarPagamentos
}