const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = process.env.PORT || 3003

mongoose.connect('mongodb://127.0.0.1:27017/cars')
    .then(() => console.log('Connect mongoDB'))
    .catch(() => console.log('Error en la conexion mongo'))

const permisos = require('./validationUser')
const logs = require('./registerLog')
const car = require('./cars/car')

app.use(express.json())

// middleware cualquier peticion
app.use(permisos)

// middleware path especifico
app.use('/api/cars$', logs, permisos)

// Example  router  
app.use('/api/cars', car)

// example  get
app.get('/', function (req, res) {
  res.send('Hello World')
})




// execute  server
app.listen(port, () => console.log(`Conectado al puerto ${port}`))