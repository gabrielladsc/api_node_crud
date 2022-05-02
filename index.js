//configuração inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// forma de ler JSON
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// rota inicial (endpoint)
app.get('/', (req, res) => {
    res.json({ message: 'Teste!' })
})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

//entregar uma porta
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.vbzx0.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3000)
        console.log('Conectado ao MongoDB')
    })
    .catch((err) => console.log(err))