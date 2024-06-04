/*********************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD de 
 * reserva_vaga_administrador no banco de dados MySQL
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

const selectAllReserva_vaga_administrador = async function () {
    try {
        
        let sql = `select * from tbl_reserva_vagas_administrador`

        const rsReserva_vaga_administrador = await prisma.$queryRawUnsafe(sql)
        return rsReserva_vaga_administrador

    } catch (error) {
        return false
    }
}

const selectByIdReserva_vaga_administrador = async function () {
    try {

        let sql = `select * from tbl_reserva_vagas_administrador where id = ${id}`
        const rsReserva_vaga_administrador = await prisma.$queryRawUnsafe(sql)
        return rsReserva_vaga_administrador

    } catch (error) {
        return false
    }
}

const selectLastIdReserva_vaga_administrador = async function () {
    try {
        let sql = `select cast(last_insert_id() as decimal) as id from tbl_reserva_vagas_administrador limit 1;`

        const rsReserva_vaga_administrador = await prisma.$queryRawUnsafe(sql)

        return rsReserva_vaga_administrador
    } catch (error) {
        console.log(error);
        return false
    }
}

const updateReserva_vaga_administrador = async function (id, dadosReserva_vaga_administrador) {
    try {
        
        let sql = `UPDATE tbl_reserva_vagas_administrador SET`
        const keys = Object.keys(dadosReserva_vaga_administrador)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosReserva_vaga_administrador[key]}'`
            if(index !== keys.length - 1) {
                sql += `,`
            }
        })

        sql += `WHERE id = ${id}`

        const rsReserva_vaga_administrador = await prisma.$executeRawUnsafe(sql)

        return rsReserva_vaga_administrador

    } catch (error) {
        return false
    }
}

const insertReserva_vaga_administrador = async function (dadosReserva_vaga_administrador) {
    try {
        
        let sql = `insert into tbl_reserva_vagas_administrador (
                                                    id_vaga,
                                                    id_reserva,
                                                    id_veiculo,
                                                    id_administrador
                                                )
                                                values
                                                (
                                                    '${dadosReserva_vaga_administrador.id_vaga}',
                                                    '${dadosReserva_vaga_administrador.id_reserva}',
                                                    '${dadosReserva_vaga_administrador.id_veiculo}',
                                                    '${dadosReserva_vaga_administrador.id_administrador}',
                                                )`
        
        const rsReserva_vaga_administrador = await prisma.$executeRawUnsafe(sql)

        console.log(rsReserva_vaga_administrador)
        return rsReserva_vaga_administrador
    } catch (error) {
        return false
    }
}

const deleteReserva_vaga_administrador = async function () {
    try {
        let sql = `delete from tbl_reserva_vagas_administrador where id = ${id}`

        const rsReserva_vaga_administrador = await prisma.$executeRawUnsafe(sql)

        return rsReserva_vaga_administrador
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllReserva_vaga_administrador,
    selectByIdReserva_vaga_administrador,
    selectLastIdReserva_vaga_administrador,
    updateReserva_vaga_administrador,
    insertReserva_vaga_administrador,
    deleteReserva_vaga_administrador
}