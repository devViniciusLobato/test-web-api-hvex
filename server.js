const express = require('express')
var bodyParser = require('body-parser')

// Rota de Usuários
const userRoutes = require('./src/routes/usuario.rotas')

// Funcionalidades do Express
const app = express()

// Selecionar qual porta utilizar, se estiver algum configurada no dotenv, caso contrário, utilizar o padrão 9090
const port = process.env.PORT || 9090

// Traduz requisições do content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Traduz requisições do content-type - application/json
app.use(bodyParser.json())

// Configurando a base de dados
const dbConfig = require('./config/db.config.js')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// Conectando à base de dados
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Conexão com banco bem sucedida!")
}).catch(err => {
    console.log('Não foi possível conectar ao banco de dados', err)
    process.exit()
})

// Define a rota padrão / root
app.get('/', (req, res) => {
    res.json({ "message": "Porta padrão para requisições" })
})

// Usando como middleware
app.use('/api/users', userRoutes)

// Habilita a porta para ouvir as requisições feitas para a nossa API
app.listen(port, () => {
    console.log(`Node server is listening on port ${port}`)
})