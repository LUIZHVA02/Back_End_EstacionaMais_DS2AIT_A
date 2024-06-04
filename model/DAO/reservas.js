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
        
        let sql = `select * from tbl_reservas`

        const rsReservas = await prisma.$queryRawUnsafe(sql)
        return rsReservas

    } catch (error) {
        return false
    }
}

const selectByIdReservas = async function () {
    try {

        let sql = `select * from tbl_reservas where id = ${id}`
        const rsReservas = await prisma.$queryRawUnsafe(sql)
        return rsReservas

    } catch (error) {
        return false
    }
}

const selectLastIdReservas = async function () {
    try {
        let sql = `select cast(last_insert_id() as decimal) as id from tbl_reservas limit 1;`

        const rsReservas = await prisma.$queryRawUnsafe(sql)

        return rsReservas
    } catch (error) {
        console.log(error);
        return false
    }
}

const updateReservas = async function (id, dadosReservas) {
    try {
        
        let sql = `UPDATE tbl_reservas SET`
        const keys = Object.keys(dadosReservas)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosReservas[key]}'`
            if(index !== keys.length - 1) {
                sql += `,`
            }
        })

        sql += `WHERE id = ${id}`

        const rsReservas = await prisma.$executeRawUnsafe(sql)

        return rsReservas

    } catch (error) {
        return false
    }
}

const insertReservas = async function (dadosReservas) {
    try {
        
        let sql = `insert into tbl_reservas (
                                                dataEntrada,
                                                dataSaida,
                                                horarioEntrada,
                                                horarioSaida
                                            )
                                                values
                                            (
                                                '${dadosReservas.dataEntrada}',
                                                '${dadosReservas.dataSaida}',
                                                '${dadosReservas.horarioEntrada}',
                                                '${dadosReservas.horarioSaida}'
                                            );`
        
        const rsReservas = await prisma.$executeRawUnsafe(sql)

        console.log(rsReservas)
        return rsReservas
    } catch (error) {
        return false
    }
}

const deleteReservas = async function () {
    try {
        let sql = `delete from tbl_reservas where id = ${id}`

        const rsReservas = await prisma.$executeRawUnsafe(sql)

        return rsReservas
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllReservas,
    selectByIdReservas,
    selectLastIdReservas,
    updateReservas,
    insertReservas,
    deleteReservas
}