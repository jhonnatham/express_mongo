const mongoose = require('mongoose')

/**Define Schema */
const companySchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 99,
        enum: ['BMW', 'AUDI', 'SEAT']
    },
    country: String,
    date: {type: Date, default: Date.now}
})
const Company = mongoose.model('company', companySchema)

module.exports.Company = Company
module.exports.companySchema = companySchema