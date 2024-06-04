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
        let sql = `select * from tbl_pagamento_reserva`

        const rsPagamento_reserva = await prisma.$queryRawUnsafe(sql)

        return rsPagamento_reserva
    } catch (error) {
        return false
    }
}

const selectByIdPagamento_reserva = async function () {
    try {
        let slq = `select * from tbl_pagamento_reserva where id = ${id}`

        const rsPagamento_reserva = await prisma.$queryRawUnsafe(sql)

        return rsPagamento_reserva
    } catch (error) {
        return false
    }
}

const updatePagamento_reserva = async function (id, dadosPagamentoReserva) {
    try {
        let sql = `UPDATE tbl_pagamento_reserva SET`
        const keys = Object.keys(dadosPagamentoReserva)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosPagamentoReserva[key]}'`
            if(index !== keys.length - 1) {
                sql += `,`
            }
        })

        sql += `WHERE id = ${id}`

        const rsPagamento_reserva = await prisma.$executeRawUnsafe(sql)
        return rsPagamento_reserva
    } catch (error) {
        return false
    }
}

const insertPagamento_reserva = async function (dadosPagamentoReserva) {
    try {
        let sql = `insert into tbl_pagamento reserva (
                                                        id_pagamento,
                                                        id_reserva,
                                                        id_usuario
                                                     ) 
                                                     values
                                                     (
                                                        '${dadosPagamentoReserva.pagamento}',
                                                        '${dadosPagamentoReserva.reserva}'
                                                        '${dadosPagamentoReserva.usuario}'
                                                     )`

        const rsPagamento_reserva = await prisma.$executeRawUnsafe(sql)

        console.log(rsPagamento_reserva)
        return rsPagamento_reserva
    } catch (error) {
        return false
    }
}

const deletePagamento_reserva = async function () {
    try {
        
        let sql = `delete from tbl_pagamento_reserva where id = ${id}`

        const rsPagamento_reserva = await prisma.$executeRawUnsafe(sql)
        return rsPagamento_reserva
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