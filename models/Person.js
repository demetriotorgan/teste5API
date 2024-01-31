const mongoose = require('mongoose')
const Person = mongoose.model('Person',{
    id: Number,
    nome:String,
    email:String,
})

module.exports = Person