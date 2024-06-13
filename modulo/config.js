/*************************************************************************
 * Objetivo: Arquivo responsável pelas variáveis globais do projeto, 
 * onde haverão mensagens, status_codes e outros conteúdos para o projeto
 * Data: 31/05/2024
 * Autor: Luiz Henrique Vidal Araujo
 * Versão: 1.0
 *************************************************************************/

/**********************Mensagens de Erro do Projeto**********************/

const ERROR_INVALID_ID = {status: false, status_code: 400, message: 'O ID encaminhado na requisição não é válido!!!'}

const ERROR_REQUIRED_FIELDS = {status: false, status_code: 400, message: 'As informações encaminhadas na requisição não são válidas!!!'}

const ERROR_INVALID_NAME_ENTER = {status: false, status_code: 400, message: 'O Nome encaminhado na requisição não é válido!!!'}

const ERROR_UPDATED_ITEM = {status: true, status_code: 400, message: 'As informações encaminhadas na requisição de update não são válidas!!!'}

const ERROR_DELETED_ITEM = {status: true, status_code: 400, message: 'Não foi possível fazer a exclusão!!!'}

const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Nenhum item encontrado na requisição!!!'}

const ERROR_CONTENT_TYPE = {status: false, status_code: 415, message: 'O Content-Type da requisição não é suportado na API. Deve-se encaminhar os dados no formato application/json!!!'}

const ERROR_INTERNAL_SERVER_DB = {status: false, status_code: 500, message: 'Ocorreram Erros no processamento do Banco de Dados. Contate o Administrador da API!!!'}

const ERROR_INTERNAL_SERVER = {status: false, status_code: 500, message: 'Ocorreram Erros no servidor Back-end na camada de serviços/negócios, portanto não foi possível fazer a requisição!!!'}

/**********************Mensagens de Sucesso do Projeto**********************/
const SUCCES_CREATED_ITEM = {status: true, status_code: 201, message: 'O item foi inserido com sucesso!!!'}

const SUCCES_UPDATED_ITEM = {status: true, status_code: 200, message: 'O item foi atualizado com sucesso!!!'}

const SUCCES_DELETED_ITEM = {status: true, status_code: 200, message: 'O item foi deletado com sucesso!!!'}


module.exports = {
    ERROR_INVALID_ID,
    ERROR_REQUIRED_FIELDS,
    ERROR_INVALID_NAME_ENTER,
    ERROR_UPDATED_ITEM,
    ERROR_DELETED_ITEM,
    ERROR_NOT_FOUND,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_INTERNAL_SERVER,

    SUCCES_CREATED_ITEM,
    SUCCES_UPDATED_ITEM,
    SUCCES_DELETED_ITEM
    
}