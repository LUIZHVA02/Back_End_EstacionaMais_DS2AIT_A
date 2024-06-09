/*********************************************************
 * Objetivo: Arquivo responsável por fazer validações,
 * consistencias e regra de negócio para as reservas
 * Data: 31/05/2024
 * Autores: Julia Aparecida da Silva Fonseca, 
 *          Luiz Henrique Vidal Araujo, 
 *          Raica Rodrigues Martinez Castro,
 *          Vitor Hugo Nascimento da Silva;
 * Versão: 1.0 
 ********************************************************/

const tratamentoRepo = require('./tratamentos.js')

const reservasDao = require('../model/DAO/reservas.js')
const message = require('../modulo/config.js')

const antigoDigito = `'`
const novoDigito = `|`

const antigoCarater = `"`
const novoCarater = ` || `

const getListarReservas = async function () {
    let jsonReservas = {}

    try {
        const dadosReservas = await reservasDao.selectAllReservas()

        const dataEntrada = tratamentoRepo.tratarDataSimples(dadosReservas[0].dataEntrada)
        const dataSaida = tratamentoRepo.tratarDataSimples(dadosReservas[0].dataSaida)
        const horarioEntrada = tratamentoRepo.tratarHoraSimples(dadosReservas[0].horarioEntrada)
        const horarioSaida = tratamentoRepo.tratarHoraSimples(dadosReservas[0].horarioSaida)


        let jsonDadosReservas = {}
        let arrayDadosReservasTratados = []

        const keys = Object.keys(dadosReservas)

        keys.forEach((index) => {

            const id = dadosReservas[index].id

            jsonDadosReservas = {
                id,
                dataEntrada,
                dataSaida,
                horarioEntrada,
                horarioSaida
            }

            arrayDadosReservasTratados.push(jsonDadosReservas)
        })

        if (dadosReservas) {
            if (dadosReservas.length > 0) {
                jsonReservas.reservas = arrayDadosReservasTratados
                jsonReservas.quantidade = dadosReservas.length
                jsonReservas.status_code = 200

                return jsonReservas
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

const getBuscarReservasById = async function (id) {
    let jsonReservas = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const dadosReservas = await reservasDao.selectByIdReservas(id)

            const dataEntrada = tratamentoRepo.tratarDataSimples(dadosReservas[0].dataEntrada)
            const dataSaida = tratamentoRepo.tratarDataSimples(dadosReservas[0].dataSaida)
            const horarioEntrada = tratamentoRepo.tratarHoraSimples(dadosReservas[0].horarioEntrada)
            const horarioSaida = tratamentoRepo.tratarHoraSimples(dadosReservas[0].horarioSaida)

            let jsonDadosReservas = {
                id,
                dataEntrada,
                dataSaida,
                horarioEntrada,
                horarioSaida
            }

            if (dadosReservas) {
                if (dadosReservas.length > 0) {
                    jsonReservas.reservas = jsonDadosReservas
                    jsonReservas.status_code = 200


                    console.log(jsonDadosReservas);
                    return jsonReservas
                } else {
                    return message.ERROR_NOT_FOUND
                }
            } else {
                console.log(dadosReservas);
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarUltimoReservasInserido = async function () {
    let jsonReservas = {}

    try {
        const idUltimoReservas = await reservasDao.selectLastIdReservas()

        if (idUltimoReservas) {
            if (idUltimoReservas.length > 0) {
                jsonReservas.idReservas = idUltimoReservas
                jsonReservas.status_code = 200

                return jsonReservas
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

const setInserirReservas = async function (contentType, dadosReservas) {
    try {
        if (String(contentType).toLocaleLowerCase() === "application/json") {

            let novoReservasJson = {}
            if (dadosReservas.dataEntrada == "" || dadosReservas.dataEntrada == undefined ||
                dadosReservas.dataEntrada == null || dadosReservas.dataEntrada.length != 10 ||
                dadosReservas.dataSaida == "" || dadosReservas.dataSaida == undefined ||
                dadosReservas.dataSaida == null || dadosReservas.dataSaida.length != 10 ||
                dadosReservas.horarioEntrada == "" || dadosReservas.horarioEntrada == undefined ||
                dadosReservas.horarioEntrada == null || dadosReservas.horarioEntrada.length < 8 ||
                dadosReservas.horarioSaida == "" || dadosReservas.horarioSaida == undefined ||
                dadosReservas.horarioSaida == null || dadosReservas.horarioSaida.length < 8
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let novoReservas = await reservasDao.insertReservas(dadosReservas)

                if (novoReservas) {
                    let idNovoReservas = await reservasDao.selectLastIdReservas()

                    if (idNovoReservas) {
                        novoReservasJson.status = message.SUCCES_CREATED_ITEM.status
                        novoReservasJson.status_code = message.SUCCES_CREATED_ITEM.status_code
                        novoReservasJson.message = message.SUCCES_CREATED_ITEM.message
                        novoReservasJson.id = idNovoReservas[0].id
                        novoReservasJson.novoReservas = dadosReservas

                        console.log(novoReservas);
                        return novoReservasJson
                    } else {
                        console.log("Novo ID:" + idNovoReservas);
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                } else {
                    console.log("Novo Reservas:" + dadosReservas);
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

const setAtualizarReservas = async function (id, dadosReservasUpdate, content) {
    if (String(content).toLowerCase() == 'application/json') {

        let updateReservasJson = {}
        let resultUpdateReservasJson = {}
        try {
            const validaId = await getBuscarReservasById(id)

            if (validaId) {

                let id = validaId.reservas.id
                let dataEntrada = dadosReservasUpdate.dataEntrada
                let dataSaida = dadosReservasUpdate.dataSaida
                let horarioSaida = dadosReservasUpdate.horarioSaida

                if (
                    dataEntrada != '' &&
                    dataEntrada != undefined &&
                    dataEntrada != null &&
                    dataEntrada.length < 100
                ) {
                    updateReservasJson.dataEntrada = dataEntrada
                } else if (
                    dataEntrada == '' &&
                    dataEntrada == undefined &&
                    dataEntrada == null
                ) { }

                if (
                    dataSaida != '' &&
                    dataSaida != undefined &&
                    dataSaida != null &&
                    dataSaida.length < 100
                ) {
                    updateReservasJson.dataSaida = dataSaida
                } else if (
                    dataSaida == '' &&
                    dataSaida == undefined &&
                    dataSaida == null
                ) { }

                if (
                    horarioSaida != '' &&
                    horarioSaida != undefined &&
                    horarioSaida != null &&
                    horarioSaida.length == 20
                ) {
                    updateReservasJson.horarioSaida = horarioSaida
                } else if (
                    horarioSaida == '' &&
                    horarioSaida == undefined &&
                    horarioSaida == null
                ) { }

                const reservasAtualizado = await reservasDao.updateReservas(id, updateReservasJson)

                if (reservasAtualizado) {
                    resultUpdateReservasJson.id = id
                    resultUpdateReservasJson.status = message.SUCCES_UPDATED_ITEM.status
                    resultUpdateReservasJson.status_code = message.SUCCES_UPDATED_ITEM.status_code
                    resultUpdateReservasJson.message = message.SUCCES_UPDATED_ITEM.message
                    resultUpdateReservasJson.reservas = dadosReservasUpdate

                    return resultUpdateReservasJson
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

const setDeletarReservasById = async function (id) {
    let jsonDeleteReservas = {}

    try {
        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            const validaId = await getBuscarReservasById(id)

            if (validaId) {
                const id = validaId.reservas.id

                const apagarReservas = await reservasDao.deleteReservas(id)

                if (apagarReservas) {
                    jsonDeleteReservas.status = message.SUCCES_DELETED_ITEM.status
                    jsonDeleteReservas.status_code = message.SUCCES_DELETED_ITEM.status_code
                    jsonDeleteReservas.message = message.SUCCES_DELETED_ITEM.message
                    jsonDeleteReservas.id = id

                    return jsonDeleteReservas
                } else {
                    console.log(dadosReservas);
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
    getListarReservas,
    getBuscarReservasById,
    getBuscarUltimoReservasInserido,
    setInserirReservas,
    setAtualizarReservas,
    setDeletarReservasById
}