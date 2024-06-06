const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = process.env.PORT || 3003

mongoose.connect('mongodb://127.0.0.1:27017/cars')
    .then(() => console.log('Connect mongoDB'))
    .catch(() => console.log('Error en la conexion mongo'))

const permisos = require('./middleware/validationUser')
const logs = require('./middleware/registerLog')
const car = require('./router/car')
const user = require('./router/user')
const company = require('./router/company')
const sale = require('./router/sale')
const auth = require('./router/auth')

app.use(express.json())

// middleware cualquier peticion
app.use(permisos)

// middleware path especifico
app.use(logs)

// Example  router  
app.use('/api/cars', car)
app.use('/api/user', user)
app.use('/api/company', company)
app.use('/api/sale', sale)
app.use('/api/login', auth)
// example  get
app.get('/', function (req, res) {
  res.send('Hello World')
})




// execute  server
app.listen(port, () => console.log(`Conectado al puerto ${port}`))