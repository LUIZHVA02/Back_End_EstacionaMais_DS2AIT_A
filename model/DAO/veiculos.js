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
        
        let sql = `select * from tbl_veiculos`

        const rsVeiculos = await prisma.$queryRawUnsafe(sql)
        return rsVeiculos

    } catch (error) {
        return false
    }
}

const selectByIdVeiculo = async function (id) {
    try {
        
        let sql = `select * from tbl_veiculos where id = ${id}`
        const rsVeiculos = await prisma.$queryRawUnsafe(sql)
        return rsVeiculos

    } catch (error) {
        console.log(error);
        return false
    }
}

const selectLastIdVeiculo = async function () {
    try {
        let sql = `select cast(last_insert_id() as decimal) as id from tbl_veiculos limit 1;`

        const rsVeiculo = await prisma.$queryRawUnsafe(sql)

        return rsVeiculo
    } catch (error) {
        console.log(error);
        return false
    }
}

const updateVeiculo = async function (id, dadosVeiculo) {
    try {
        let sql = `UPDATE tbl_veiculos SET `
        const keys = Object.keys(dadosVeiculo)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosVeiculo[key]}'`
            if(index !== keys.length - 1) {
                sql += `,`
            }
        })

        sql += ` WHERE id = ${id}`

        console.log(sql);
        const rsVeiculos = await prisma.$executeRawUnsafe(sql)

        return rsVeiculos
    } catch (error) {
        console.log(error, dadosVeiculo);
        return false
    }
}

const insertVeiculo = async function (dadosVeiculo) {
    try {
        
        let sql = `insert into tbl_veiculos (
                                                modelo,
                                                ano,
                                                placa,
                                                marca,
                                                cor,
                                                informacao
                                            )
                                            values
                                            (
                                                '${dadosVeiculo.modelo}',
                                                '${dadosVeiculo.ano}',
                                                '${dadosVeiculo.placa}',
                                                '${dadosVeiculo.marca}',
                                                '${dadosVeiculo.cor}',
                                                '${dadosVeiculo.informacao}'
                                            )`
    const rsVeiculos = await prisma.$executeRawUnsafe(sql)

    console.log(rsVeiculos)
    return rsVeiculos

    } catch (error) {
        return false
    }
}

const deleteVeiculo = async function (id) {
    try {
        let sql = `delete from tbl_veiculos where id = ${id}`

        const rsVeiculos = await prisma.$executeRawUnsafe(sql)
        return rsVeiculos
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = {
    selectAllVeiculos,
    selectByIdVeiculo,
    selectLastIdVeiculo,
    updateVeiculo,
    insertVeiculo,
    deleteVeiculo
}