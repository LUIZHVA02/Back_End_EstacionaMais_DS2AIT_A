/*********************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD de 
 * reserva_vaga_usuario no banco de dados MySQL
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

const selectAllReserva_vaga_usuarios= async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const selectByIdReserva_vaga_usuario = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const updateReserva_vaga_usuario = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const insertReserva_vaga_usuario = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

const deleteReserva_vaga_usuario = async function () {
    try {
        
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllReserva_vaga_usuarios,
    selectByIdReserva_vaga_usuario,
    updateReserva_vaga_usuario,
    insertReserva_vaga_usuario,
    deleteReserva_vaga_usuario
}