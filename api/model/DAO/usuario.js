const { PrismaClient } = require('@prisma/client')
const { sqltag } = require('@prisma/client/runtime/library');


const prisma = new PrismaClient()

const insertuser = async function(data){
    try {
        let sql = `INSERT INTO usuario(usuario, senha) VALUES
        (
            '${data.usuario}',
            '${data.senha}'
        )`

        let rs = await prisma.$executeRawUnsafe(sql)
        return rs
    } catch (error) {
        console.log(error)
        return false
    }
}

const selectuser = async function(){
    try {
        let sql = 'select * from usuario'
        let rs = await prisma.$queryRawUnsafe(sql)
        return rs
    } catch (error) {
        console.log(error);
        return false
    }
}

const selectuserId = async function(id){
    try {
        let sql = `SELECT * FROM usuario WHERE id = ${id}`
        let rs = await prisma.$queryRawUnsafe(sql)
        return rs
    } catch (error) {
        console.log(error);
        return false
    }
}

const lastID = async function(){
    try {
        let sql = `SELECT id FROM usuario ORDER BY id DESC LIMIT 1;`
        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}

const callLogin = async function(usuario, pw){
    try {
        let sql = `CALL sp_login_cliente('${usuario}', '${pw}');`        
        let rs = await prisma.$queryRawUnsafe(sql)
        return rs
    } catch (error) {
        return false
    }
}
module.exports ={
    insertuser,
    selectuserId,
    selectuser,
    callLogin,
    lastID
}