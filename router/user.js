const express = require('express')
const router = express.Router()
const User = require('../model/user.js')

const { check, validationResult } = require('express-validator')
const myValidationResult = validationResult.withDefaults({
    formatter: error => error.msg,
  });


router.get('/', async (req, res) => {
    const users = await User.find()
    res.send(users)
})

router.get('/:userid([0-9a-z]+)', async (req, res) => {
    const user = await User
        .findById(req.params.userid)
    if (user == undefined) {
        res.status(400).send('No se encuentra el vehiculo')
    } else {
        res.status(200).send(user)
    }
})

// example post con validation

router.post('/create', check('name', 'The name is empty').notEmpty(), async (req, res) => {
    const errors = myValidationResult(req).array();
    if (errors.length > 0) {
        return res.status(422).json({errors: errors})
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        state: req.body.state
    })

    const result = await user.save()
    res.status(201).send(result)
})


// example put con validation
router.put('/:id', [
    check('name', 'The name is empty').notEmpty(),
    check('email', 'Email is empty').notEmpty(),
], async (req, res) => {
    const errors = myValidationResult(req).array();
    if (errors.length > 0) {
        return res.status(422).json({errors: errors})
    }

    const user = await User
        .findById(req.params.id )

    if (!user) return res.status(404).send('No se encuentra el vehiculo')

    user.name = req.body.name
    user.email = req.body.email

    const result = await User.save()
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
        const user = await User
            .findById(id)

        if (user == undefined) {
            return res.status(404).send('No se encuentra el vehiculo')
        } 

        const result = await User.deleteOne({_id: id})

        res.status(200).send("coche borrado")
    } catch (error) {
        res.status(500).send(error.message)
    }
    
})

module.exports = router
