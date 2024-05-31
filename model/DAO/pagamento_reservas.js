/*********************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD de
 * pagamento_reserva no banco de dados MySQL
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

const selectAllPagamento_reservas = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const selectByIdPagamento_reserva = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const updatePagamento_reserva = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const insertPagamento_reserva = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const deletePagamento_reserva = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllPagamento_reservas,
    selectByIdPagamento_reserva,
    updatePagamento_reserva,
    insertPagamento_reserva,
    deletePagamento_reserva
}