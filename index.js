//config. inicial
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

//instanciando o express
const app = express()

//importanto o model Person
const Person = require('./models/Person')

//middleWares-------------
app.use(
  express.urlencoded({
    extended:true
  })
)
app.use(express.json())

app.use((req,res, next)=>{
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  app.use(cors())
  next()
})

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
      //validando a busca
        if(!person){
          res.status(422).json({message: 'Usuário não encontrado'})
          return
        }
    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({erro:error})
  }
})

//rota DELETE --------------
app.delete('/person/:id', async(req,res)=>{
  const id = req.params.id
  const person = await Person.findOne({_id:id})
    if(!person){
      res.status(422).json({mensagem: 'Usuario não encontrado'})
      return
    }

    try {
      await Person.deleteOne({_id:id})
      res.status(200).json({mensagem:'Usuário excluido com sucesso'})
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
