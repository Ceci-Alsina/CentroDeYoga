import pool from '../config/db.js'
import consultas from '../modulos/consultas.js'

const obtenerTodos = async function(consulta){
    const conexion = await pool.getConnection()
    const [filas] = await conexion.query(consulta)
    conexion.release()
    //console.log(filas)
    return filas
}

export const obtenerGenerosGET = async (req, res) => {
    try {
        res.json(await obtenerTodos(consultas.GENERO.TODOS))
    } catch(err){
        console.error('Error conectando con la base de datos', err)
        res.status(500)
            .send('Error interno del servidor')
    }
}

export const obtenerRangosEtariosGET = async (req, res) => {
    try {
        res.json(await obtenerTodos(consultas.RANGO_ETARIO.TODOS))
    } catch(err){
        console.error('Error conectando con la base de datos', err)
        res.status(500)
            .send('Error interno del servidor')
    }
}
