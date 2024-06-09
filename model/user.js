const mongoose = require('mongoose')
const fs = require('fs')
const jwt = require('jsonwebtoken')

/**Define Schema */
const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    state: {
        type: Number,
        enum: [0,1]
    },
    isCustomer: Boolean,
    date: {type: Date, default: Date.now}
})

userSchema.methods.generateJWT = () => {
    const now = Math.floor(Date.now() / 1000) 
    const privateKey = fs.readFileSync('./resource/private.key','utf-8');
    const jwtToken = jwt.sign({
        _id: this._id, 
        name: this.name, 
        iat: now, 
        exp: now + 3600
    }, privateKey);

    return jwtToken
}

const User = mongoose.model('user', userSchema)

module.exports = User