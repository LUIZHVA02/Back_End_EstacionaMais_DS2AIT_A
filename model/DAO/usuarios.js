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

const selectAllUsuarios = async function () {
    try {
        let sql = `select * from tbl_usuarios`

        const rsUsuarios = await prisma.$queryRawUnsafe(sql)

        return rsUsuarios
    } catch (error) {
        return false
    }
}

const selectByIdUsuario = async function (id) {
    try {
        let sql = `select * from tbl_usuarios where id = ${id}`

        const rsUsuarios = await prisma.$queryRawUnsafe(sql)

        return rsUsuarios
    } catch (error) {
        console.log(error);
        return false
    }
}

const selectLastIdUsuario = async function () {
    try {
        let sql = `select cast(last_insert_id() as decimal) as id from tbl_usuarios limit 1;`

        const rsUsuarios = await prisma.$queryRawUnsafe(sql)

        return rsUsuarios
    } catch (error) {
        console.log(error);
        return false
    }
}

const updateUsuario = async function (id, dadosUsuarioUpdate) {
    try {
        let sql = `UPDATE tbl_usuarios SET `
        const keys = Object.keys(dadosUsuarioUpdate)

        keys.forEach((key, index) => {
            if(key != 'senha'){
                sql += `${key} = '${dadosUsuarioUpdate[key]}'`
            }

            if(key == 'senha'){
                sql += `${key} = aes_encrypt('${dadosUsuarioUpdate[key]}','chave')`
            }

            if (index !== keys.length - 1) {
                sql += `, `
            }
        })

        sql += ` WHERE id = ${id}`

        const rsUsuarios = await prisma.$executeRawUnsafe(sql)

        return rsUsuarios
    } catch (error) {
        console.log(error);
        return false
    }
}

const insertUsuario = async function (dadosUsuario) {
    try {
        let sql = `insert into tbl_usuarios  (
                                                        nome,
                                                        email,
                                                        telefone,
                                                        endereco,
                                                        cpf,
                                                        senha
                                                    )
                                                        values
                                                    (
                                                        '${dadosUsuario.nome}',
                                                        '${dadosUsuario.email}',
                                                        '${dadosUsuario.telefone}',
                                                        '${dadosUsuario.endereco}',
                                                        '${dadosUsuario.cpf}',
                                                        AES_ENCRYPT('${dadosUsuario.senha}', 'chave')
                                                    )`

        const rsUsuarios = await prisma.$executeRawUnsafe(sql)

        console.log(rsUsuarios);

        return rsUsuarios
    } catch (error) {
        console.log(error);
        return false
    }
}

// const insertUsuarioLoop = async function (dadosUsuario) {
//     try {
//         let sql = `insert into tbl_usuarios  (
//                                                         nome,
//                                                         email,
//                                                         telefone,
//                                                         endereco,
//                                                         cpf
//                                                     )
//                                                         values
//                                                     (`
//                                                     const keys = Object.keys(dadosUsuario)
                                            
//                                                     keys.forEach((key, index) => {
//                                                         sql += `${key} = '${dadosUsuario[key]}'`
//                                                         if (index !== keys.length - 1) {
//                                                             sql += `, `
//                                                         }
//                                                     })

//                                                     sql +=`)`

//         const rsUsuarios = await prisma.$queryRawUnsafe(sql)

//         console.log(rsUsuarios, sql)
//         return rsUsuarios
//     } catch (error) {
//         return false
//     }
// }

const deleteUsuario = async function (id) {
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
    selectLastIdUsuario,
    updateUsuario,
    insertUsuario,
    insertUsuarioLoop,
    deleteUsuario
}