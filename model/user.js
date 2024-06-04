const mongoose = require('mongoose')

/**Define Schema */
const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
    state: {
        type: Number,
        enum: [0,1]
    },
    date: {type: Date, default: Date.now}
})
const User = mongoose.model('user', userSchema)

module.exports = User