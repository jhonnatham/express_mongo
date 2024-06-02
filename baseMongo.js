const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/cars')
    .then(() => console.log('Connect mongoDB'))
    .catch(() => console.log('Error en la conexion'))

/**
 * Definitionschema
 */
const carShema= new mongoose.Schema({
    company: String,
    model: String,
    price: Number,
    year:Number,
    sold: Boolean,
    extras: [String],
    date: {type: Date, default: Date.now}
})

const Car = mongoose.model('car', carShema)

/**
 * Create
 */
const createCar = async () => {
    const car = new Car({
        company: 'Audi',
        model: 'A2',
        price: 5000,
        year: 2021,
        sold: false,
        extras: ['Automatic', '4*4', 'ABS']
    })

    const result = await car.save()
    console.log(result)
}
//createCar()

/**
 * Update
 * @param {String} id 
 * @returns 
 */
const updateCar = async (id) => {
    const car = await Car
        .findById(id)

    if (!car) return false

    car.company = 'Mercedes'
    car.model   = 'clase A'

    const result = await car.save()
    console.log(result)
}
//updateCar('6659707d1b6f8727cc16b24c')


/**
 * Direct update
 * @param {String} id 
 */
const updateFirstCar = async (id) => {
    const result = await Car.findOneAndUpdate(
        {_id: id},
        {
            company: 'seat',
            model: 'leon'
        },{new: true}
    )
    console.log(result)
}
//updateFirstCar('66597312ceac24ed9bdf6e8d')

/**
 * Delete
 * @param {String} id 
 */
const deleteCar = async (id) => {
    const result = await Car.deleteOne({_id: id})
    console.log(result)
}
//deleteCar('66597305289e5bf9c7805d7f')


/**
 * Get All
 */
const getCars = async () => {
    const cars = await Car.find()
    console.log(cars)
}
//getCars()

/**
 * Get filter
 */
const getCompanyAndSoldFilterCars = async () => {
    const cars = await Car
        .find({company: 'BMW', sold: false})

    console.log(cars)
}
//getCompanyAndSoldFilterCars()


const getMoreFilter = async () => {
    const cars = await Car
        .find({sold: false})
        .sort({price: 1})
        .limit(2)
        .select({company: 1, model:1, price:1})

    console.log(cars)
}
//getMoreFilter()


/** Operators
 * $eq  ==
 * $ne  <>
 * $gt  >
 * $gte >=
 * $lt  <
 * $lte <=
*/
const getFilterPriceCar = async () => {
    const cars = await Car
        .find({price: {$gt: 2000, $lte: 5000}})

    console.log(cars)
}
//getFilterPriceCar()


/** Operators 2
 * $in   Contiene el parametro
 * $nin  No contiene
 * and
 * or
 */
const getFilterExtras = async () => {
    const cars = await Car
        .find({extras: {$in: '4*4'}})
        .and([{price: {$lt: 8000}}])
        .or([{company: 'BMW'}])

    console.log(cars)
}
//getFilterExtras()

/**
 * Count filter
 */
const getCountCar = async () => {
    const car = await Car 
        .find({company: 'BMW'})
        .count()

    console.log(car)
}
//getCountCar()

/**
 * Pagination element
 */
const getPaginationCars = async () => {
    const pagNumber = 1
    const pageSize = 2

    const car = await Car
        .find()
        .skip((pagNumber-1)*pageSize)
        .limit(pageSize)

    console.log(car)
}
//getPaginationCars()

