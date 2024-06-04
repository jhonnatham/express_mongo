const mongoose = require('mongoose')

/**Define Schema */
const carShema= new mongoose.Schema({
    company: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        minlength: 2,
        maxlength: 99,
        enum: ['BMW', 'AUDI', 'SEAT']
    },
    model: String,
    sold: Boolean,
    price: {
        type: Number,
        required: () => {
            return this.sold
        },
        get: y => Math.round(y)
    },
    year: {
        type: Number,
        min: 2000,
        max: 2030
    },
    extras: [String],
    date: {type: Date, default: Date.now}
})
const Car = mongoose.model('car', carShema)

module.exports = Car