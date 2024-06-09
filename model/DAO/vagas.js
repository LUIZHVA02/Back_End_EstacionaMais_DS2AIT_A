/*********************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD das
 * vagas no banco de dados MySQL
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

const selectAllVagas = async function () {
    try {
        
        let sql = `select * from tbl_vagas`

        const rsVagas = await prisma.$queryRawUnsafe(sql)
        return rsVagas

    } catch (error) {
        return false
    }
}

const selectByIdVaga = async function (id) {
    try {
        
        let sql = `select * from tbl_vagas where id = ${id}`
        const rsVagas = await prisma.$queryRawUnsafe(sql)
        return rsVagas
    } catch (error) {
        return false
    }
}

const selectLastIdVaga = async function () {
    try {
        let sql = `select cast(last_insert_id() as decimal) as id from tbl_vagas limit 1;`

        const rsVaga = await prisma.$queryRawUnsafe(sql)

        return rsVaga
    } catch (error) {
        console.log(error);
        return false
    }
}

const updateVaga = async function (id, dadosVagas) {
    try {
        let sql = `UPDATE tbl_vagas SET `
        const keys = Object.keys(dadosVagas)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosVagas[key]}'`
            if(index !== keys.length -1) {
                sql += `,`
            }
        })

        sql += ` WHERE id = ${id}`

        const rsVagas = await prisma.$executeRawUnsafe(sql)
        return rsVagas
    } catch (error) {
        return false
    }
}

const insertVaga = async function (dadosVagas) {
    try {
        let sql = `insert into tbl_vagas(
                                                sigla_vaga,
                                                tipo_vaga,
                                                status_vaga
                                            ) 
                                            values
                                                (
                                                '${dadosVagas.sigla_vaga}',
                                                '${dadosVagas.tipo_vaga}',
                                                '${dadosVagas.status_vaga}'
                                                ) `

    const rsVagas = await prisma.$executeRawUnsafe(sql)
    console.log(rsVagas)
    return rsVagas
    } catch (error) {
        return false
    }
}

const deleteVaga = async function (id) {
    try {
        
        let sql = `delete from tbl_vagas where id = ${id}`

        const rsVagas = await prisma.$executeRawUnsafe(sql)

        return rsVagas
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllVagas,
    selectByIdVaga,
    selectLastIdVaga,
    updateVaga,
    insertVaga,
    deleteVaga
}