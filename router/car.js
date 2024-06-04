const express = require('express')
const router = express.Router()
const Car = require('../model/car.js')

const { check, validationResult } = require('express-validator')
const myValidationResult = validationResult.withDefaults({
    formatter: error => error.msg,
  });


router.get('/', async (req, res) => {
    const cars = await Car.find()
    res.send(cars)
})

router.get('/id/:carid([0-9a-z]+)', async (req, res) => {
    const car = await Car
        .findById(req.params.carid)
    if (car == undefined) {
        res.status(400).send('No se encuentra el vehiculo')
    } else {
        res.status(200).send(car)
    }
})

router.get('/company/:company', async (req, res) => {
    const car = await Car
        .find({company:req.params.company })

    if (car.length == 0) {
        res.status(200).send('No se encuentra el vehiculo')
    } else {
        res.status(200).send(car)
    }
})

// example post con validation

router.post('/create', check('company', 'The company is empty').notEmpty(), async (req, res) => {
    const errors = myValidationResult(req).array();
    if (errors.length > 0) {
        return res.status(422).json({errors: errors})
    }

    const car = new Car({
        company: req.body.company,
        model: req.body.model,
        price: req.body.price,
        year: req.body.year,
        sold: req.body.sold,
        extras: req.body.extras
    })

    const result = await car.save()
    res.status(201).send(result)
})


// example put con validation
router.put('/:id', [
    check('company', 'La compania no puede  ser vacia').notEmpty(),
    check('model', 'El modelo no puede  ser vacia').notEmpty(),
], async (req, res) => {
    const errors = myValidationResult(req).array();
    if (errors.length > 0) {
        return res.status(422).json({errors: errors})
    }

    const car = await Car
        .findById(req.params.id )

    if (!car) return res.status(404).send('No se encuentra el vehiculo')

    car.marca = req.body.company
    car.model = req.body.model
    car.year = req.body.year

    const result = await car.save()
    res.status(204).send()
})

// example delete
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).send('format id invalid')
            return false
        }
        const car = await Car
            .findById(id)

        if (car == undefined) {
            return res.status(404).send('No se encuentra el vehiculo')
        } 

        const result = await Car.deleteOne({_id: id})

        res.status(200).send("coche borrado")
    } catch (error) {
        res.status(500).send(error.message)
    }
    
})

module.exports = router
