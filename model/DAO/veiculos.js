/*********************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD dos 
 * veículos no banco de dados MySQL
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

const selectAllVeiculos = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const selectByIdVeiculo = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const updateVeiculo = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const insertVeiculo = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const deleteVeiculo = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllVeiculos,
    selectByIdVeiculo,
    updateVeiculo,
    insertVeiculo,
    deleteVeiculo
}