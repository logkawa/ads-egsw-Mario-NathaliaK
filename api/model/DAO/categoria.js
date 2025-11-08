const { PrismaClient } = require('@prisma/client')
const { sqltag } = require('@prisma/client/runtime/library');


const prisma = new PrismaClient()

const insertCategory = async function(data){
    try {
        let sql = `INSERT INTO categoria(nome, cor) VALUES
        (
            '${data.nome}',
            '${data.cor}'
        )`

        let rs = await prisma.$executeRawUnsafe(sql)
        return rs
    } catch (error) {
        console.log(error)
        return false
    }
}

const selectCategory = async function(){
    try {
        let sql = 'select * from categoria'
        let rs = await prisma.$queryRawUnsafe(sql)
        return rs
    } catch (error) {
        console.log(error);
        return false
    }
}

const selectCategoryId = async function(id){
    try {
        let sql = `SELECT * FROM categoria WHERE id = ${id}`
        let rs = await prisma.$queryRawUnsafe(sql)
        return rs
    } catch (error) {
        console.log(error);
        return false
    }
}

const lastID = async function(){
    try {
        let sql = `SELECT id FROM categoria ORDER BY id DESC LIMIT 1;`
        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}
module.exports ={
    insertCategory,
    selectCategoryId,
    selectCategory,
    lastID
}