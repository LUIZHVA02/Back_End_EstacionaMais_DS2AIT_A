/*********************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD dos
 * usuarios no banco de dados MySQL
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

const selectAllUsuarios= async function () {
    try {
        let sql = `select * from tbl_usuarios`

        const rsUsuarios = await prisma.$executeRawUnsafe(sql)
        return rsUsuarios
    } catch (error) {
        return false
    }
}

const selectByIdUsuario = async function () {
    try {
        let sql = `select * from tbl_usuarios where id = ${id}`
        const rsPagamentos = await prisma.$queryRawUnsafe(sql)
        return rsPagamentos
    } catch (error) {
        return false
    }
}

const updateUsuario = async function (id, dadosUsuarios) {
    try {
        let sql = `UPDATE tbl_usuarios SET`
        const keys = Object.keys(dadosUsuarios)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosUsuarios[key]}'`
            if(index !== keys.length - 1) {
                sql += `,`
            }
        })

        sql += `WHERE id = ${id}`

        const rsUsuarios = await prisma.$executeRawUnsafe(sql)
        return rsUsuarios
    } catch (error) {
        return false
    }
}

const insertUsuario = async function (dadosUsuarios) {
    try {
        let sql = `insert into tbl_usuarios (
                                            nome,
                                            email,
                                            telefone,
                                            endereco,
                                            cpf
                                            )
                                            values
                                            (
                                            ${dadosUsuarios.nome}
                                            ${dadosUsuarios.email}
                                            ${dadosUsuarios.telefone}
                                            ${dadosUsuarios.endereco}
                                            ${dadosUsuarios.cpf}
                                            )`

    const rsUsuarios = await prisma.$executeRawUnsafe(sql)

    console.log(rsUsuarios)
    return rsUsuarios
    } catch (error) {
        return false
    }
}

const deleteUsuario = async function () {
    try {
        let sql = `delete from tbl_usuarios where id = ${id}`

        const rsUsuarios = await prisma.$executeRawUnsafe(sql)

        return rsUsuarios
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllUsuarios,
    selectByIdUsuario,
    updateUsuario,
    insertUsuario,
    deleteUsuario
}