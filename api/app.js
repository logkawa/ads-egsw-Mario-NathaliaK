const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors())
    next()
})
const bodyParserJSON = bodyParser.json()

const controller_categoria = require('./controller/categoria.js')

app.post('/1.0/wishme/categoria', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let data = request.body
    let result = await controller_categoria.postCategory(data, contentType)
    
    response.status(result.status_code)
    response.json(result)
})
app.put('/2.0/wishme/categoria/:id', cors(), bodyParserJSON, async function(request, response){
    let id=request.params.id
    let contentType=request.headers['content-type']
    let data=request.body
    let result=await controller_categoria.putUser(data, contentType, id)
    console.log(result)
    
    response.status(result.status_code)
    response.json(result)
})
app.get('/1.0/wishme/categoria', cors(), async function(request, response){
    let result = await controller_categoria.getCategory();

    response.status(result.status_code)
    response.json(result)
})
app.get('/2.0/wishme/categoria/:id', cors(), async function(request, response){
    let idUser = request.params.id
    let results = await controller_categoria.getUserId(idUser)
    console.log(results);
    
    response.status(results.status_code)
    response.json(results)
})
app.delete('/2.0/wishme/cliente/:id', cors(), async function(request, response){
    let idClient = request.params.id
    let result = await controller_cliente.deleteClient(idClient)
    response.status(result.status_code)
    response.json(result)
})
app.listen('8080', function(){
    console.log('API funcionando!!')
})
