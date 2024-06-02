const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/carsdb2')
    .then(() => console.log('Connect mongoDB'))
    .catch(() => console.log('Error en la conexion'))

/**
 * Valiation mongoose examples
 * https://mongoosejs.com/docs/validation.html
 */
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


const createCar = async () => {
    const car = new Car({
        company: 'Audi',
        model: 'A2',
        price: 5000,
        year: 1999,
        sold: false,
        extras: ['Automatic', '4*4', 'ABS']
    })

    try {
        const result = await car.save()
        console.log(result)
    } catch (error) {
        console.group(error.message)
    }
    
}
createCar()