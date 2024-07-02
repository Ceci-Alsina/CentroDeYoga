import express from 'express'
import rutas from './router/rutas.js'
import cookieParser from 'cookie-parser'

const app = express()
const port = process.env.PORT || 3000

//middlewares
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/', rutas)

app.listen(port, () => console.log("Servidor levantado"))
