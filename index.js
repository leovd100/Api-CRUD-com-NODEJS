const express = require('express')
const bodyParse = require('body-parser')
const userRout = require('./Routes/userRoutes')

const app = express()
const port = 3000

app.use(bodyParse.urlencoded({extended: false}))

userRout(app)
app.get('/', (req,res) => res.send('Olá mundo pelo Express!'))

app.listen(port, () => console.log('Api rodando na porta 3000'))