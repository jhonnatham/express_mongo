const mongoose = require('mongoose')
const {companySchema} = require('../model/company')

/**Define Schema */
const carSchema= new mongoose.Schema({
    /**
     * Example model normalize
     * company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
        
    },
    */
    company: {
        type: companySchema,
        required: true
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
const Car = mongoose.model('car', carSchema)

module.exports = Car