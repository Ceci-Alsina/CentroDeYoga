import express from 'express'
import rutas from './router/rutas.js'

const app = express()
const port = 3000

//middlewares
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', rutas)

app.listen(port, () => console.log("Servidor levantado"))
