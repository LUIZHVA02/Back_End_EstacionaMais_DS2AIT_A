/*********************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD dos 
 * administradores no banco de dados MySQL
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

const selectAllAdministradores = async function () {
    try {
        let sql = `select * from tbl_administradores`

        const rsAdministradores = await prisma.$queryRawUnsafe(sql)

        return rsAdministradores
    } catch (error) {
        return false
    }
}

const selectByIdAdministrador = async function (id) {
    try {
        let sql = `select * from tbl_administradores where id = ${id}`

        const rsAdministradores = await prisma.$queryRawUnsafe(sql)

        return rsAdministradores
    } catch (error) {
        console.log(error);
        return false
    }
}

const selectLastIdAdministrador = async function () {
    try {
        let sql = `select cast(last_insert_id() as decimal) as id from tbl_administradores limit 1;`

        const rsAdministradores = await prisma.$queryRawUnsafe(sql)

        return rsAdministradores
    } catch (error) {
        console.log(error);
        return false
    }
}

const updateAdministrador = async function (id, dadosAdministradorUpdate) {
    try {
        let sql = `UPDATE tbl_administradores SET `
        const keys = Object.keys(dadosAdministradorUpdate)

        keys.forEach((key, index) => {
            if(key != 'senha'){
                sql += `${key} = '${dadosAdministradorUpdate[key]}'`
            }

            if(key == 'senha'){
                sql += `${key} = aes_encrypt('${dadosAdministradorUpdate[key]}','chave')`
            }

            if (index !== keys.length - 1) {
                sql += `, `
            }
        })

        sql += ` WHERE id = ${id}`

        const rsAdministradores = await prisma.$executeRawUnsafe(sql)

        return rsAdministradores
    } catch (error) {
        console.log(error);
        return false
    }
}

const insertAdministrador = async function (dadosAdministrador) {
    try {
        let sql = `insert into tbl_administradores  (
                                                        nome,
                                                        email,
                                                        telefone,
                                                        endereco,
                                                        cpf,
                                                        senha
                                                    )
                                                        values
                                                    (
                                                        '${dadosAdministrador.nome}',
                                                        '${dadosAdministrador.email}',
                                                        '${dadosAdministrador.telefone}',
                                                        '${dadosAdministrador.endereco}',
                                                        '${dadosAdministrador.cpf}',
                                                        AES_ENCRYPT('${dadosAdministrador.senha}', 'chave')
                                                    )`

        const rsAdministradores = await prisma.$executeRawUnsafe(sql)

        console.log(rsAdministradores);

        return rsAdministradores
    } catch (error) {
        console.log(error);
        return false
    }
}

const insertAdministradorLoop = async function (dadosAdministrador) {
    try {
        let sql = `insert into tbl_administradores  (
                                                        nome,
                                                        email,
                                                        telefone,
                                                        endereco,
                                                        cpf
                                                    )
                                                        values
                                                    (`
                                                    const keys = Object.keys(dadosAdministrador)
                                            
                                                    keys.forEach((key, index) => {
                                                        sql += `${key} = '${dadosAdministrador[key]}'`
                                                        if (index !== keys.length - 1) {
                                                            sql += `, `
                                                        }
                                                    })

                                                    sql +=`)`

        const rsAdministradores = await prisma.$queryRawUnsafe(sql)

        console.log(rsAdministradores, sql)
        return rsAdministradores
    } catch (error) {
        return false
    }
}

const deleteAdministrador = async function (id) {
    try {
        let sql = `delete from tbl_administradores where id = ${id}`

        const rsAdministradores = await prisma.$executeRawUnsafe(sql)

        return rsAdministradores
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllAdministradores,
    selectByIdAdministrador,
    selectLastIdAdministrador,
    updateAdministrador,
    insertAdministrador,
    insertAdministradorLoop,
    deleteAdministrador
}