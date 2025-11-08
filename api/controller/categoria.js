const categoriaDAO = require('../model/DAO/categoria.js')
const message = require('./modulo/config.js')


const getCategory = async function () {
    try {
        let dados = await categoriaDAO.selectCategory()
        let json = {}
        if (dados) {
            json.categorias = dados
            json.status = message.SUCCESS_CREATED_ITEM.status
            json.status_code = message.SUCCESS_CREATED_ITEM.status_code
            return json
        }
        else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const postCategory = async function (data, contentType) {
    try {
        // Verifica se o content-type é JSON
        if (String(contentType).toLocaleLowerCase() !== 'application/json') {
            return message.ERROR_CONTENT_TYPE;
        }
        if (
            data.nome === null || data.nome === undefined || data.nome.length > 100 ||
            data.cor === null || data.cor === undefined || data.cor.length > 100 
        ) {
            return message.ERROR_REQUIRED_FIELDS;
        }

        const categoriaInserida = await categoriaDAO.insertCategory(data);
        if (!categoriaInserida) {
            return message.ERROR_INTERNAL_SERVER_DB;
        }
        let id_ = await categoriaDAO.lastID()
        let idC = id_[0].id

        const categoria = await categoriaDAO.selectCategoryId(idC);


        if (categoria) {
            // Monta a resposta
            const resultado = {
                categoria: {
                    ...categoria[0]
                },
                status: message.SUCCESS_CREATED_ITEM.status,
                status_code: message.SUCCESS_CREATED_ITEM.status_code,
                message: message.SUCCESS_CREATED_ITEM.message,
            };
            console.log(resultado)
            return resultado;
        } else {
            return message.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        console.error("Erro ao processar requisição:", error);
        return message.ERROR_INTERNAL_SERVER;
    }
}

module.exports = {
    getCategory,
    postCategory
}