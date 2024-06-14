import express from 'express'
import pool from './config/db.js'
import consultas from './modulos/consultas.js'

const app = express()
const port = 3000

app.use(express.static('public'))
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

let obtenerTodos = async function(consulta){
    const conexion = await pool.getConnection()
    const [filas] = await conexion.query(consulta)
    conexion.release()
    //console.log(filas)
    return filas
}

app.get('/generos', async (req, res) => {
    try {
        res.json(await obtenerTodos(consultas.GENERO.TODOS))
    } catch(err){
        console.error('Error conectando con la base de datos', err)
        res.status(500)
            .send('Error interno del servidor')
    }
})

app.get('/rangosEtarios', async (req, res) => {
    try {
        res.json(await obtenerTodos(consultas.RANGO_ETARIO.TODOS))
    } catch(err){
        console.error('Error conectando con la base de datos', err)
        res.status(500)
            .send('Error interno del servidor')
    }
})

app.listen(port, () => console.log("Servidor levantado"))