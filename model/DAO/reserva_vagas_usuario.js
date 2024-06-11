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

const selectAllReserva_vaga_usuario = async function () {
    try {
        
        let sql = `select * from tbl_reserva_vagas_usuario`

        const rsReserva_vaga_usuario = await prisma.$queryRawUnsafe(sql)
        return rsReserva_vaga_usuario

    } catch (error) {
        console.log(error);
        return false
    }
}

const selectByIdReserva_vaga_usuario = async function (id) {
    try {

        let sql = `select * from tbl_reserva_vagas_usuario where id = ${id}`
        const rsReserva_vaga_usuario = await prisma.$queryRawUnsafe(sql)
        return rsReserva_vaga_usuario

    } catch (error) {
        console.log(error);
        return false
    }
}

const selectLastIdReserva_vaga_usuario = async function () {
    try {
        let sql = `select cast(last_insert_id() as decimal) as id from tbl_reserva_vagas_usuario limit 1;`

        const rsReserva_vaga_usuario = await prisma.$queryRawUnsafe(sql)

        return rsReserva_vaga_usuario
    } catch (error) {
        console.log(error);
        return false
    }
}

const updateReserva_vaga_usuario = async function (id, dadosReserva_vaga_usuario) {
    try {
        
        let sql = `UPDATE tbl_reserva_vagas_usuario SET `
        const keys = Object.keys(dadosReserva_vaga_usuario)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosReserva_vaga_usuario[key]}'`
            if(index !== keys.length - 1) {
                sql += `,`
            }
        })

        sql += ` WHERE id = ${id}`

        const rsReserva_vaga_usuario = await prisma.$executeRawUnsafe(sql)

        return rsReserva_vaga_usuario

    } catch (error) {
        console.log(error);
        return false
    }
}

const insertReserva_vaga_usuario = async function (dadosReserva_vaga_usuario) {
    try {
        
        let sql = `insert into tbl_reserva_vagas_usuario (
                                                    id_vaga,
                                                    id_reserva,
                                                    id_veiculo,
                                                    id_usuario
                                                )
                                                values
                                                (
                                                    '${dadosReserva_vaga_usuario.id_vaga}',
                                                    '${dadosReserva_vaga_usuario.id_reserva}',
                                                    '${dadosReserva_vaga_usuario.id_veiculo}',
                                                    '${dadosReserva_vaga_usuario.id_usuario}'
                                                )`
        
        const rsReserva_vaga_usuario = await prisma.$executeRawUnsafe(sql)

        console.log(rsReserva_vaga_usuario)
        return rsReserva_vaga_usuario
    } catch (error) {
        console.log(error);
        return false
    }
}

const deleteReserva_vaga_usuario = async function (id) {
    try {
        let sql = `delete from tbl_reserva_vagas_usuario where id = ${id}`

        const rsReserva_vaga_usuario = await prisma.$executeRawUnsafe(sql)

        return rsReserva_vaga_usuario
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = {
    selectAllReserva_vaga_usuario,
    selectByIdReserva_vaga_usuario,
    selectLastIdReserva_vaga_usuario,
    updateReserva_vaga_usuario,
    insertReserva_vaga_usuario,
    deleteReserva_vaga_usuario
}