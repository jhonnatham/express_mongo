const mongoose = require('mongoose')

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
const User = mongoose.model('user', userSchema)

module.exports = User