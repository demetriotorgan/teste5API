//config. inicial
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

//instanciando o express
const app = express()

//importanto o model Person
const Person = require('./models/Person')

//middleWares-------------
app.use(cors())
app.use(
  express.urlencoded({
    extended:true
  })
)
app.use(express.json())

//Rota inicial--------------------
app.get('/', (req, res) => {
  res.json({mensagem: 'Ola Express'})
})

// //Post modo 1
// app.post('/', async(req,res)=>{
//   const person = new Person({
//     nome: req.body.nome,
//     email: req.body.email,
//   })
//   await person.save()
//   res.send(person)
  
// })

//Post Modo 2
app.post('/person', async(req,res)=>{
  const {nome, email} = req.body
  const person = {
    nome,
    email,
  }
  try {
    await Person.create(person)
      res.status(201).json({mensagem:'Registro criado com sucesso'})
  } catch (error) {
    res.status(500).json({erro:error})
  }
})

//Rota GET-----------------
app.get('/person', async(req,res)=>{
  try {
    const people = await Person.find();
    res.status(200).json(people)
  } catch (error) {
    res.status(500).json({erro:error})
  }
})

//Rota GET por ID----------------
app.get('/person/:id', async(req,res)=>{
  const id = req.params.id
  try {
    const person = await Person.findOne({_id:id})
    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({erro:error})
  }
})

//entregando uma porta
mongoose.connect('mongodb+srv://deUser:NFExiDw0ac2XvlSi@cluster0.vi7idmi.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
  console.log('Conectado ao AtlasDB com sucesso')
  app.listen(process.env.PORT || 3000)  
})
.catch((err)=>console.log(err))
