const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()
const User = require('../model/user.js')

const { check, validationResult } = require('express-validator')
const myValidationResult = validationResult.withDefaults({
    formatter: error => error.msg,
  });

router.post('/', [
    check('email', 'The email is empty').notEmpty(),
    check('password', 'The password is empty').notEmpty().isLength({min: 3})
], async (req, res) => {
    const errors = myValidationResult(req).array();
    if (errors.length > 0) {
        return res.status(422).json({errors: errors})
    }

    try {
        let user = await User.findOne({email: req.body.email})
        if (!user) return res.status(400).send('Invalid User!')

        const validatePassword = await bcrypt.compare(req.body.password, user.password)
        if (!validatePassword) return res.status(400).send('Invalid User!')

        const jwtToken = user.generateJWT()

        res.status(201)
            .header('Authorization', jwtToken)
            .send('ok!')
    } catch (e) {
        console.group(e.message)
        return res.status(400).send('Invalid User!')
    }
})

module.exports = router