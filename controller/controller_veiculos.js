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

const controllerUsuario_veiculos = require('./controller_usuario_veiculos.js')
const controllerReserva_vagas_usuario = require('./controller_reserva_vagas_usuario.js')
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
            if (dadosVeiculo.modelo == "" || dadosVeiculo.modelo == undefined ||
                dadosVeiculo.modelo == null || dadosVeiculo.modelo.length > 50 ||
                dadosVeiculo.ano == "" || dadosVeiculo.ano == undefined ||
                dadosVeiculo.ano == null || dadosVeiculo.ano.length > 5 ||
                dadosVeiculo.placa == "" || dadosVeiculo.placa == undefined ||
                dadosVeiculo.placa == null || dadosVeiculo.placa.length > 8 ||
                dadosVeiculo.marca == "" || dadosVeiculo.marca == undefined ||
                dadosVeiculo.marca == null || dadosVeiculo.marca.length > 50 ||
                dadosVeiculo.cor == "" || dadosVeiculo.cor == undefined ||
                dadosVeiculo.cor == null || dadosVeiculo.cor.length > 50 ||
                dadosVeiculo.informacao == "" || dadosVeiculo.informacao == undefined ||
                dadosVeiculo.informacao == null || dadosVeiculo.informacao.length > 300
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
                let id = validaId.veiculo[0].id
                let modelo = dadosVeiculoUpdate.modelo
                let ano = dadosVeiculoUpdate.ano
                let placa = dadosVeiculoUpdate.placa
                let marca = dadosVeiculoUpdate.marca
                let cor = dadosVeiculoUpdate.cor
                let informacao = dadosVeiculoUpdate.informacao

                if (
                    modelo != '' &&
                    modelo != undefined &&
                    modelo != null &&
                    modelo.length <= 50
                ) {
                    updateVeiculoJson.modelo = modelo.replace(/'/g, novoDigito)
                } else if (
                    modelo == '' ||
                    modelo == undefined ||
                    modelo == null
                ) { }

                if (
                    ano != '' &&
                    ano != undefined &&
                    ano != null &&
                    ano.length <= 6
                ) {

                    updateVeiculoJson.ano = ano
                } else if (
                    ano == '' ||
                    ano == undefined ||
                    ano == null
                ) { }

                if (
                    placa != '' &&
                    placa != undefined &&
                    placa != null &&
                    placa.length <= 8
                ) {
                    updateVeiculoJson.placa = placa
                } else if (
                    placa == '' ||
                    placa == undefined ||
                    placa == null
                ) { }

                if (
                    marca != '' &&
                    marca != undefined &&
                    marca != null &&
                    marca.length <= 50
                ) {
                    updateVeiculoJson.marca = marca.replace(/'/g, novoDigito)
                } else if (
                    marca == '' ||
                    marca == undefined ||
                    marca == null
                ) { }

                if (
                    cor != '' &&
                    cor != undefined &&
                    cor != null &&
                    cor.length <= 50
                ) {
                    updateVeiculoJson.cor = cor.replace(/'/g, novoDigito)
                } else if (
                    cor == '' ||
                    cor == undefined ||
                    cor == null
                ) { }

                if (
                    informacao != '' &&
                    informacao != undefined &&
                    informacao != null &&
                    informacao.length <= 300
                ) {
                    updateVeiculoJson.informacao = informacao.replace(/'/g, novoDigito)

                } else if (
                    informacao == '' ||
                    informacao == undefined ||
                    informacao == null
                ) { }

                console.log(dadosVeiculoUpdate, updateVeiculoJson);
                const veiculoAtualizado = await veiculosDao.updateVeiculo(id, updateVeiculoJson)

                if (veiculoAtualizado) {
                    resultUpdateVeiculoJson.id = id
                    resultUpdateVeiculoJson.status = message.SUCCES_UPDATED_ITEM.status
                    resultUpdateVeiculoJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    resultUpdateVeiculoJson.message = message.SUCCES_UPDATED_ITEM.message
                    resultUpdateVeiculoJson.veiculo = dadosVeiculoUpdate

                    return resultUpdateVeiculoJson
                } else {
                    console.log(veiculoAtualizado);
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

                const apagarVeiculoUsuario = await controllerUsuario_veiculos.setDeletarUsuario_veiculoById_veiculo(id)

                if (apagarVeiculoUsuario) {
                    const apagarReservaVeiculoUsuario = await controllerReserva_vagas_usuario.setDeletarReserva_vagas_usuarioById_veiculo(id)

                    if (apagarReservaVeiculoUsuario) {
                        const apagarVeiculo = await veiculosDao.deleteVeiculo(id)

                        if (apagarVeiculo) {
                            jsonDeleteVeiculo.status = message.SUCCES_DELETED_ITEM.status
                            jsonDeleteVeiculo.status_code = message.SUCCES_DELETED_ITEM.status_code
                            jsonDeleteVeiculo.message = message.SUCCES_DELETED_ITEM.message
                            jsonDeleteVeiculo.id = validaId.veiculo[0].id

                            return jsonDeleteVeiculo
                        } else {
                            console.log(validaId, apagarVeiculo);
                            return message.ERROR_INTERNAL_SERVER_DB
                        }
                    } else {
                        return message.ERROR_INTERNAL_SERVER
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER
                }
            } else {
                return message.ERROR_NOT_FOUND
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