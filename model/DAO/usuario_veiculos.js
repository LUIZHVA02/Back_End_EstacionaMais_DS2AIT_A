/*********************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD de 
 * usuario_veiculos no banco de dados MySQL
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

const selectAllUsuario_veiculos= async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const selectByIdUsuario_veiculo = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const updateUsuario_veiculo = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const insertUsuario_veiculo = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const deleteUsuario_veiculo = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllUsuario_veiculos,
    selectByIdUsuario_veiculo,
    updateUsuario_veiculo,
    insertUsuario_veiculo,
    deleteUsuario_veiculo
}