//config. inicial
const express = require('express')
const cors = require('cors')
const app = express()

//middleWares
app.use(cors())
app.use(
  express.urlencoded({
    extended:true
  })
)
app.use(express.json())

//Rota inicial
app.get('/', (req, res) => {
  res.send('Ola Express')
})


//entregando uma porta
app.listen(process.env.PORT || 3000)