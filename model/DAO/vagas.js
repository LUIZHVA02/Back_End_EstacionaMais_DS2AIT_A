/*********************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD das
 * vagas no banco de dados MySQL
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

const selectAllVagas = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const selectByIdVaga = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const updateVaga = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const insertVaga = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const deleteVaga = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllVagas,
    selectByIdVaga,
    updateVaga,
    insertVaga,
    deleteVaga
}