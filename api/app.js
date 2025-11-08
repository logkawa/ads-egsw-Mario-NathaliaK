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
const controller_usuario = require('./controller/usuario.js')

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


app.post('/1.0/wishme/usuario', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let data = request.body
    let result = await controller_usuario.postUser(data, contentType)
    
    response.status(result.status_code)
    response.json(result)
})

app.get('/1.0/wishme/usuario/:id', cors(), async function(request, response){
    let idUser = request.params.id
    let results = await controller_usuario.getUserId(idUser)
    console.log(results);
    
    response.status(results.status_code)
    response.json(results)
})

const { postPhotocard, getPhotocardsByUserId } = require('./controller/controller_photocard.js');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });
app.post('/1.0/wishme/photocard', upload.single('image'), postPhotocard);
app.get('/1.0/wishme/photocard/:usuario_id', getPhotocardsByUserId);


app.post('/1.0/wishme/login', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let data = request.body 
    let result = await controller_usuario.postUserLogin(data, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.listen('8080', function(){
    console.log('API funcionando!!')
})
