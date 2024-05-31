/*********************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD das 
 * reservas no banco de dados MySQL
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

const selectAllReservas = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const selectByIdReserva = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const updateReserva = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const insertReserva = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const deleteReserva = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllReservas,
    selectByIdReserva,
    updateReserva,
    insertReserva,
    deleteReserva
}