const logs = (req, res, next) => {
    if (req.method == 'DELETE') {
        // Register log  transaction
        console.log(`Time ${Date.now()}`)
    }

    next()
}


module.exports = logs


