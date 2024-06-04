const express = require('express')
const router = express.Router()
const {Company} = require('../model/company')


router.get('/', async (req, res) => {
    const companys = await Company.find()
    res.send(companys)
})

router.get('/:companyid([0-9a-z]+)', async (req, res) => {
    const company = await Company
        .findById(req.params.companyid)
    if (company == undefined) {
        res.status(400).send('No se encuentra el vehiculo')
    } else {
        res.status(200).send(company)
    }
})

// example post con validation

router.post('/create', async (req, res) => {
    const company = new Company({
        name: req.body.name,
        country: req.body.country
    })

    const result = await company.save()
    res.status(201).send(result)
})


// example put con validation
router.put('/:id',  async (req, res) => {

    const company = await Company
        .findById(req.params.id )

    if (!company) return res.status(404).send('No se encuentra el vehiculo')

    company.name = req.body.name
    company.country = req.body.country

    const result = await Company.save()
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
        const company = await Company
            .findById(id)

        if (company == undefined) {
            return res.status(404).send('No se encuentra el vehiculo')
        } 

        const result = await Company.deleteOne({_id: id})

        res.status(200).send("coche borrado")
    } catch (error) {
        res.status(500).send(error.message)
    }
    
})

module.exports = router
