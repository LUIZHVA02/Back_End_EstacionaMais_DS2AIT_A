/*********************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD dos
 * usuarios no banco de dados MySQL
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

const selectAllUsuarios= async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const selectByIdUsuario = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const updateUsuario = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const insertUsuario = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const deleteUsuario = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllUsuarios,
    selectByIdUsuario,
    updateUsuario,
    insertUsuario,
    deleteUsuario
}