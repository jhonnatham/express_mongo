const jwt = require('jsonwebtoken')
const fs = require('fs')

const permisos = (req, res, next) => {
    // Logic  validate request
    const jwtToken = req.header('Authorization')

    if (!jwtToken) return res.status(401).end('Invalid Access')

    try {
        const privateKey = fs.readFileSync('./resource/private.key','utf-8');
        const payload = jwt.verify(jwtToken, privateKey)

        res.user = payload
        console.log(`date to validate request ${Date.now()}`)
        next()
    } catch (e) {
        console.error(e.message)
        return res.status(401).send('Invalid Access')
    }
}

module.exports = permisos