/*********************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD de 
 * usuario_veiculos no banco de dados MySQL
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

const selectAllUsuario_veiculo = async function () {
    try {
        
        let sql = `select * from tbl_usuario_veiculos`

        const rsUsuario_veiculo = await prisma.$queryRawUnsafe(sql)
        return rsUsuario_veiculo

    } catch (error) {
        console.log(error);
        return false
    }
}

const selectByIdUsuario_veiculo = async function (id) {
    try {

        let sql = `select * from tbl_usuario_veiculos where id = ${id}`
        const rsUsuario_veiculo = await prisma.$queryRawUnsafe(sql)
        return rsUsuario_veiculo

    } catch (error) {
        console.log(error);
        return false
    }
}

const selectLastIdUsuario_veiculo = async function () {
    try {
        let sql = `select cast(last_insert_id() as decimal) as id from tbl_usuario_veiculos limit 1;`

        const rsUsuario_veiculo = await prisma.$queryRawUnsafe(sql)

        return rsUsuario_veiculo
    } catch (error) {
        console.log(error);
        return false
    }
}

const updateUsuario_veiculo = async function (id, dadosUsuario_veiculo) {
    try {
        
        let sql = `UPDATE tbl_usuario_veiculos SET `
        const keys = Object.keys(dadosUsuario_veiculo)

        keys.forEach((key, index) => {
            sql += `${key} = '${dadosUsuario_veiculo[key]}'`
            if(index !== keys.length - 1) {
                sql += `,`
            }
        })

        sql += ` WHERE id = ${id}`

        console.log(sql);

        const rsUsuario_veiculo = await prisma.$executeRawUnsafe(sql)

        return rsUsuario_veiculo

    } catch (error) {
        console.log(error);
        return false
    }
}

const insertUsuario_veiculo = async function (dadosUsuario_veiculo) {
    try {
        
        let sql = `insert into tbl_usuario_veiculos (
                                                        id_usuario,
                                                        id_veiculo
                                                    )
                                                        values
                                                    (
                                                        '${dadosUsuario_veiculo.id_usuario}',
                                                        '${dadosUsuario_veiculo.id_veiculo}'
                                                    )`
        
        const rsUsuario_veiculo = await prisma.$executeRawUnsafe(sql)

        console.log(rsUsuario_veiculo)
        return rsUsuario_veiculo
    } catch (error) {
        return false
    }
}

const deleteUsuario_veiculo = async function (id) {
    try {
        let sql = `delete from tbl_usuario_veiculos where id = ${id}`

        const rsUsuario_veiculo = await prisma.$executeRawUnsafe(sql)

        return rsUsuario_veiculo
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = {
    selectAllUsuario_veiculo,
    selectByIdUsuario_veiculo,
    selectLastIdUsuario_veiculo,
    updateUsuario_veiculo,
    insertUsuario_veiculo,
    deleteUsuario_veiculo
}