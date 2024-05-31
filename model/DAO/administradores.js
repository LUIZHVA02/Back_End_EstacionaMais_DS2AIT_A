/*********************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD dos 
 * administradores no banco de dados MySQL
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

const selectAllAdministradores = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const selectByIdAdministrador = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const updateAdministrador = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const insertAdministrador = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const deleteAdministrador = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllAdministradores,
    selectByIdAdministrador,
    updateAdministrador,
    insertAdministrador,
    deleteAdministrador
}