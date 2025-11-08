const usuarioDAO = require('../model/DAO/usuario.js')
const message = require('./modulo/config.js')


const getUser = async function () {
    try {
        let dados = await usuarioDAO.selectuser()
        let json = {}
        if (dados) {
            json.usuarios = dados
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

const getUserId = async function(id){
    try {
        let idU = id
        if (idU == '' || idU == null || isNaN(idU) || idU == undefined) 
        {
            return message.ERROR_INVALID_ID
        }
        else
        {
            let json = {}
            let rtnUsuario = await usuarioDAO.selectuserId(idU)
            //console.log(rtnUsuario)
            if (rtnUsuario) 
            {
                if (rtnUsuario.length > 0) 
                {
                    json.usuario = rtnUsuario[0]
                    json.status = message.SUCCESS_FOUND_USER.status
                    json.status_code = message.SUCCESS_FOUND_USER.status_code
                    //console.log(json.usuario);
                    return json
                } 
                else 
                {
                    return message.ERROR_NOT_FOUND
                }
            } 
            else 
            {
                return message.ERROR_INTERNAL_SERVER_DB    
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const postUser = async function (data, contentType) {
    try {
        // Verifica se o content-type é JSON
        if (String(contentType).toLocaleLowerCase() !== 'application/json') {
            return message.ERROR_CONTENT_TYPE;
        }
        if (
            data.usuario === null || data.usuario === undefined || data.usuario.length > 100 ||
            data.senha === null || data.senha === undefined || data.senha.length > 100 
        ) {
            return message.ERROR_REQUIRED_FIELDS;
        }

        const usuarioInserida = await usuarioDAO.insertuser(data);
        if (!usuarioInserida) {
            return message.ERROR_INTERNAL_SERVER_DB;
        }
        let id_ = await usuarioDAO.lastID()
        let idC = id_[0].id

        const usuario = await usuarioDAO.selectuserId(idC);


        if (usuario) {
            // Monta a resposta
            const resultado = {
                usuario: {
                    ...usuario[0]
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

const postUserLogin = async function(data, contentType){
    console.log(data)
    try {
        if (String(contentType).toLowerCase() == 'application/json'
        ) 
        {
            if(
                data.usuario == '' || data.usuario == undefined || data.usuario == null || data.usuario.length > 100 ||
                data.senha == ''    || data.senha == undefined || data.senha == null || data.senha.length > 30)
            {
               return message.ERROR_REQUIRED_FIELDS
            }
            else
            {
                let usuarioU = data.usuario
                let password = data.senha
                let rtnUsuario = await usuarioDAO.callLogin(usuarioU, password)
                if (rtnUsuario) 
                    {
                    if (rtnUsuario.length > 0) 
                    {
                        let id = rtnUsuario[0].f0
                        let json = {}
                        json.usuario = {id}
                        json.status = message.SUCCESS_FOUND_USER.status
                        json.status_code = message.SUCCESS_FOUND_USER.status_code
    
                        return json
                    } 
                    else 
                    {
                        return message.ERROR_USER_NOT_FOUND
                    }
                }
                else
                {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        } 
        else 
        {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    getUser,
    postUser,
    postUserLogin,
    getUserId
}