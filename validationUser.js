const permisos = (req, res, next) => {
    console.log(`Validacion de autenticacion ${Date.now()}`)
    next()
}

module.exports = permisos