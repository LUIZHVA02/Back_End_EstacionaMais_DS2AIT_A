/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para os veículos
 * Data: 31/05/2024
 * Autores: Julia Aparecida da Silva Fonseca, 
 *          Luiz Henrique Vidal Araujo, 
 *          Raica Rodrigues Martinez Castro,
 *          Vitor Hugo Nascimento da Silva;
 * Versão: 1.0 
 ********************************************************/

const veiculosDao = require('../model/DAO/veiculos.js')
const message = require('../modulo/config.js')

const antigoDigito = `'`
const novoDigito = `|`

const antigoCarater = `"`
const novoCarater = ` || `

const getListarVeiculos = async function () {
    let jsonVeiculos = {}

    try {
        const dadosVeiculos = await veiculosDao.selectAllVeiculos()

        if (dadosVeiculos) {
            if (dadosVeiculos.length > 0) {
                jsonVeiculos.veiculos = dadosVeiculos
                jsonVeiculos.quantidade = dadosVeiculos.length
                jsonVeiculos.status_code = 200

                return jsonVeiculos
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarVeiculoById = async function (id) {
    let jsonVeiculo = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const dadosVeiculo = await veiculosDao.selectByIdVeiculo(id)

            if (dadosVeiculo) {
                if (dadosVeiculo.length > 0) {
                    jsonVeiculo.veiculo = dadosVeiculo
                    jsonVeiculo.status_code = 200

                    return jsonVeiculo
                } else {
                    return message.ERROR_NOT_FOUND
                }
            } else {
                console.log(dadosVeiculo);
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarUltimoVeiculoInserido = async function () {
    let jsonVeiculo = {}

    try {
        const idUltimoVeiculo = await veiculosDao.selectLastIdVeiculo()

        if (idUltimoVeiculo) {
            if (idUltimoVeiculo.length > 0) {
                jsonVeiculo.idVeiculo = idUltimoVeiculo
                jsonVeiculo.status_code = 200

                return jsonVeiculo
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const setInserirVeiculos = async function (contentType, dadosVeiculo) {
    try {
        if (String(contentType).toLocaleLowerCase() === "application/json") {

            let novaVeiculoJson = {}
            if (dadosUsuario_veiculo.modelo == "" || dadosUsuario_veiculo.modelo == undefined ||
                dadosUsuario_veiculo.modelo == null || dadosUsuario_veiculo.modelo.length > 50 ||
                dadosUsuario_veiculo.ano == "" || dadosUsuario_veiculo.ano == undefined ||
                dadosUsuario_veiculo.ano == null || dadosUsuario_veiculo.ano.length > 5 ||
                dadosUsuario_veiculo.placa == "" || dadosUsuario_veiculo.placa == undefined ||
                dadosUsuario_veiculo.placa == null || dadosUsuario_veiculo.placa.length > 8 ||
                dadosUsuario_veiculo.marca == "" || dadosUsuario_veiculo.marca == undefined ||
                dadosUsuario_veiculo.marca == null || dadosUsuario_veiculo.marca.length > 50 ||
                dadosUsuario_veiculo.cor == "" || dadosUsuario_veiculo.cor == undefined ||
                dadosUsuario_veiculo.cor == null || dadosUsuario_veiculo.cor.length > 50 ||
                dadosUsuario_veiculo.informacao == "" || dadosUsuario_veiculo.informacao == undefined ||
                dadosUsuario_veiculo.informacao == null || dadosUsuario_veiculo.informacao.length > 300
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let novaVeiculo = await veiculosDao.insertVeiculo(dadosVeiculo)

                if (novaVeiculo) {
                    let idNovaVeiculo = await veiculosDao.selectLastIdVeiculo()

                    if (idNovaVeiculo) {
                        novaVeiculoJson.status = message.SUCCES_CREATED_ITEM.status
                        novaVeiculoJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                        novaVeiculoJson.message = message.SUCCES_CREATED_ITEM.message
                        novaVeiculoJson.id = idNovaVeiculo[0].id
                        novaVeiculoJson.novaVeiculo = dadosVeiculo

                        console.log(novaVeiculo);
                        return novaVeiculoJson
                    } else {
                        console.log("Novo ID:" + idNovaVeiculo);
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                } else {
                    console.log("Nova Veiculo:" + dadosVeiculo);
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarVeiculo = async function (id, dadosVeiculoUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {

        let updateVeiculoJson = {}
        let resultUpdateVeiculoJson = {}
        try {
            const validaId = await getBuscarVeiculoById(id)

            if (validaId) {

                let id = validaId.usuario_veiculo[0].id
                let modelo = dadosUsuario_veiculoUpdate.modelo
                let ano = dadosUsuario_veiculoUpdate.ano
                let placa = dadosUsuario_veiculoUpdate.placa
                let marca = dadosUsuario_veiculoUpdate.marca
                let cor = dadosUsuario_veiculoUpdate.cor
                let informacaoOriginal = dadosUsuario_veiculoUpdate.informacao

                if (
                    modelo != '' &&
                    modelo != undefined &&
                    modelo != null &&
                    modelo.length < 100
                ) {
                    updateVeiculoJson.modelo = modelo.replace(/'/g, novoDigito)
                } else if (
                    modelo == '' &&
                    modelo == undefined &&
                    modelo == null
                ) { }

                if (
                    ano != '' &&
                    ano != undefined &&
                    ano != null &&
                    ano.length < 100
                ) {

                    updateVeiculoJson.ano = ano
                } else if (
                    ano == '' &&
                    ano == undefined &&
                    ano == null
                ) { }

                if (
                    placa != '' &&
                    placa != undefined &&
                    placa != null &&
                    placa.length == 20
                ) {
                    updateVeiculoJson.placa = placa
                } else if (
                    placa == '' &&
                    placa == undefined &&
                    placa == null
                ) { }

                if (
                    marca != '' &&
                    marca != undefined &&
                    marca != null &&
                    marca.length == 300
                ) {
                    updateVeiculoJson.marca = marca.replace(/'/g, novoDigito)
                } else if (
                    marca == '' &&
                    marca == undefined &&
                    marca == null
                ) { }

                if (
                    cor != '' &&
                    cor != undefined &&
                    cor != null &&
                    cor.length == 15
                ) {
                    updateVeiculoJson.cor = cor.replace(/'/g, novoDigito)
                } else if (
                    cor == '' &&
                    cor == undefined &&
                    cor == null
                ) { }

                if (
                    informacaoOriginal != '' &&
                    informacaoOriginal != undefined &&
                    informacaoOriginal != null &&
                    informacaoOriginal.length == 100
                ) {
                    let informacao = informacaoOriginal.replace(/'/g, novoDigito)
                    updateVeiculoJson.informacao = informacao.replace(/"/g, novoCarater)

                } else if (
                    informacaoOriginal == '' &&
                    informacaoOriginal == undefined &&
                    informacaoOriginal == null
                ) { }

                const veiculoAtualizado = await veiculosDao.updateVeiculo(id, updateVeiculoJson)

                if (veiculoAtualizado) {
                    resultUpdateVeiculoJson.id = id
                    resultUpdateVeiculoJson.status = message.SUCCES_UPDATED_ITEM.status
                    resultUpdateVeiculoJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    resultUpdateVeiculoJson.message = message.SUCCES_UPDATED_ITEM.message
                    resultUpdateVeiculoJson.veiculo = dadosVeiculoUpdate

                    return resultUpdateVeiculoJson
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            } else {
                return message.ERROR_NOT_FOUND
            }

        } catch (error) {
            console.log(error);
            return message.ERROR_UPDATED_ITEM
        }
    } else {
        return message.ERROR_CONTENT_TYPE
    }
}

const setDeletarVeiculoById = async function (id) {
    let jsonDeleteVeiculo = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const validaId = await getBuscarVeiculoById(id)

            if (validaId) {
                const id = validaId.veiculo[0].id

                const apagarVeiculo = await veiculosDao.deleteVeiculo(id)

                if (apagarVeiculo) {
                    jsonDeleteVeiculo.status = message.SUCCES_DELETED_ITEM.status
                    jsonDeleteVeiculo.status_code = message.SUCCES_DELETED_ITEM.status_code
                    jsonDeleteVeiculo.message = message.SUCCES_DELETED_ITEM.message
                    jsonDeleteVeiculo.id = validaId.veiculo[0].id

                    return jsonDeleteVeiculo
                } else {
                    console.log(dadosVeiculo);
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            } else {

            }
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    getListarVeiculos,
    getBuscarVeiculoById,
    getBuscarUltimoVeiculoInserido,
    setInserirVeiculos,
    setAtualizarVeiculo,
    setDeletarVeiculoById
}