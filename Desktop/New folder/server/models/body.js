const mongoose = require('mongoose')

const bodySchema = new mongoose.Schema({ 
    BodyPart: { type: String, required: true },
    Exercices: { type: String, required: true, unique: true },
})

const Body = mongoose.model('Body', bodySchema)

module.exports = Body