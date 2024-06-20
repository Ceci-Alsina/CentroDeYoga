import express from 'express'
import pool from './config/db.js'
import consultas from './modulos/consultas.js'

const app = express()
const port = 3000

app.use(express.static('public'))
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

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

let impactarConsulta = async (datos) => {
    //console.log(datos)
    
    const conexion = await pool.getConnection()

    const rtaInsertConsulta = await conexion.query(consultas.CONSULTA.INSERT, [datos.nombre, datos.apellido, datos.mensaje, datos.recibeNewsletter ? 1 : 0, new Date(), null, datos.edad, datos.genero])
    //console.log(rtaInsertConsulta)
    
    if(datos.email){
        const rtaInsertContacto1 = await conexion.query(consultas.CONTACTO.INSERT, [rtaInsertConsulta[0].insertId, 1, datos.email])
        //console.log(rtaInsertContacto1)
    }
    
    if(datos.telefono){
        const rtaInsertContacto2 = await conexion.query(consultas.CONTACTO.INSERT, [rtaInsertConsulta[0].insertId, 2, datos.telefono])
        //console.log(rtaInsertContacto2)
    }
    
    conexion.release()
}

app.post('/altaContacto', async (req, res) => {
    try {
        await impactarConsulta(req.body)
        res.json("Consulta recibida")
    } catch (error) {
        console.error('Error conectando con la base de datos', error)
        res.status(500)
            .send('Error interno del servidor')
    }
})

app.get('/mensajes', async (req, res) => {
    try {
        res.json(await obtenerTodos(consultas.CONSULTA.TODOS))
    } catch(err){
        console.error('Error conectando con la base de datos', err)
        res.status(500)
            .send('Error interno del servidor')
    }
})

app.listen(port, () => console.log("Servidor levantado"))
