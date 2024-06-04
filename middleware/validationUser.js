const permisos = (req, res, next) => {
    // Logic  validate request
    console.log(`date to validate request ${Date.now()}`)
    next()
}

module.exports = permisos