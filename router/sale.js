const express = require('express')
const Sale = require('../model/sale')
const Car = require('../model/car')
const User = require('../model/user')
const { default: mongoose } = require('mongoose')

const router = express.Router()


router.get('/', async (req, res) => {
    const sales = await Sale.find()
    res.send(sales)
})

router.get('/:saleid([0-9a-z]+)', async (req, res) => {
    const sale = await Sale
        .findById(req.params.userid)
    if (user == undefined) {
        res.status(400).send('No se encuentra el vehiculo')
    } else {
        res.status(200).send(sale)
    }
})

// example post con validation

router.post('/create', async (req, res) => {

    const user = await User.findById(req.body.userId)
    if(!user) return res.status(400).send('user not exist!')

    const car = await Car.findById(req.body.carId)
    if(!car) return res.status(400).send('car not exist!')

    if (car.sold === true) return res.status(400).send('Car is sold!!')

    const sale = new Sale({
        user: {
            _id:  user._id,
            name: user.name,
            email: user.email
        },
        car: {
            _id: Car._id,
            model: car.model
        },
        price: req.params.price
    })

    /**
     * Transactions moongose > v5.2 Mongodb > 4.0
     */
    const session = mongoose.startSession()
    await session.startTransaction
    try {
        const result = await sale.save()
        user.isCustomer = true
        user.save()
        car.sold = true
        car.save()

        await session.commitTransaction
        session.endSession
        res.status(201).send(result)
    } catch (error) {
        await session.abortTransaction
        session.endSession
        res.status(500).send(error.message)
    }
})


module.exports = router