/*********************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD dos 
 * pagamentos no banco de dados MySQL
 * Data: 31/05/2024
 * Autores: Julia Aparecida da Silva Fonseca, 
 *          Luiz Henrique Vidal Araujo, 
 *          Raica Rodrigues Martinez Castro,
 *          Vitor Hugo Nascimento da Silva;
 * Versão: 1.0 
 ********************************************************/

//Import da biblioteca do prisma cliente
const { PrismaClient } = require('@prisma/client')

//Instânciando a classe do PrismaCliente
const prisma = new PrismaClient()

const selectAllPagamentos = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const selectByIdPagamento = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const updatePagamento = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const insertPagamento = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const deletePagamento = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllPagamentos,
    selectByIdPagamento,
    updatePagamento,
    insertPagamento,
    deletePagamento
}