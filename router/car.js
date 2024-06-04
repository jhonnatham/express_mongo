const express = require('express')
const router = express.Router()
const Car = require('../model/car')
const {Company} = require('../model/company')

const { check, validationResult } = require('express-validator')
const myValidationResult = validationResult.withDefaults({
    formatter: error => error.msg,
  });


router.get('/', async (req, res) => {
    const cars = await Car
        .find()
        //.populate('company', 'name country') // se  utilizado en modelo normalizado
    res.send(cars)
})

router.get('/:carid([0-9a-z]+)', async (req, res) => {
    const car = await Car
        .findById(req.params.carid)
        //.populate('company', 'name country')
    if (car == undefined) {
        res.status(400).send('No se encuentra el vehiculo')
    } else {
        res.status(200).send(car)
    }
})

// example post con validation modelo embebido (usual en relaciones 1 1 o 1 *)
router.post('/create', 
[
    check('model', 'El modelo no puede  ser vacia').notEmpty(),
],
async (req, res) => {
    const errors = myValidationResult(req).array();
    if (errors.length > 0) {
        return res.status(422).json({errors: errors})
    }

    const company = await Company.findById(req.body.company)

    if (!company){
        return es.status(400).send('Company isnt exist!')
    }

    const car = new Car({
        company: company,
        model: req.body.model,
        price: req.body.price,
        year: req.body.year,
        sold: req.body.sold,
        extras: req.body.extras
    })

    const result = await car.save()
    res.status(201).send(result)
})

// example post con validation modelo normalizado
/**
router.post('/create', 
[
    check('model', 'El modelo no puede  ser vacia').notEmpty(),
],
async (req, res) => {
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
*/

// example put con validation
router.put('/:id', [
    check('model', 'El modelo no puede  ser vacia').notEmpty(),
], async (req, res) => {
    const errors = myValidationResult(req).array();
    if (errors.length > 0) {
        return res.status(422).json({errors: errors})
    }

    const car = await Car
        .findById(req.params.id )

    if (!car) return res.status(404).send('No se encuentra el vehiculo')

    car.company = req.body.company
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
