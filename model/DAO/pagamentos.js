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
        
        let sql = `select * from tbl_pagamentos`

        const rsPagamentos = await prisma.$queryRawUnsafe(sql)
        return rsPagamentos

    } catch (error) {
        return false
    }
}

const selectByIdPagamento = async function () {
    try {

        let sql = `select * from tbl_pagamentos where id = ${id}`
        const rsPagamentos = await prisma.$queryRawUnsafe(sql)
        return rsPagamentos

    } catch (error) {
        return false
    }
}

const updatePagamento = async function (id, dadosPagamentos) {
    try {
        
        let sql = `UPDATE tbl_pagamentos SET`
        const keys = Object.keys(dadosPagamentos)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosPagamentos[key]}'`
            if(index !== keys.length - 1) {
                sql += `,`
            }
        })

        sql += `WHERE id = ${id}`

        const rsPagamentos = await prisma.$executeRawUnsafe(sql)

        return rsPagamentos

    } catch (error) {
        return false
    }
}

const insertPagamento = async function (dadosPagamentos) {
    try {
        
        let sql = `insert into tbl_pagamentos (
                                                forma_pagamento 
                                                )
                                                values
                                                (
                                                    '${dadosPagamentos.forma_pagamento}'
                                                )`
        
        const rsPagamentos = await prisma.$executeRawUnsafe(sql)

        console.log(rsPagamentos)
        return rsPagamentos
    } catch (error) {
        return false
    }
}

const deletePagamento = async function () {
    try {
        let sql = `delete from tbl_pagamentos where id = ${id}`

        const rsPagamentos = await prisma.$executeRawUnsafe(sql)

        return rsPagamentos
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