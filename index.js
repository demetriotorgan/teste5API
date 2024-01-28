//config. inicial
const express = require('express')
const app = express()

//middleWares
app.use(
  express.urlencoded({
    extended:true
  })
)
app.use(express.json())

//Rota inicial
app.get('/', (req, res) => {
  res.json({message: 'Oi Express'})
})


//entregando uma porta
app.listen(process.env.PORT || 3000)