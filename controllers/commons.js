import pool from './config/db.js'
import consultas from './modulos/consultas.js'


export const obtenerGenerosGET = async (req, res) => {
    try {
        res.json(await consultas.obtenerTodos(consultas.GENERO.TODOS))
    } catch(err){
        console.error('Error conectando con la base de datos', err)
        res.status(500)
            .send('Error interno del servidor')
    }
}

export const obtenerRangosEtariosGET = async (req, res) => {
    try {
        res.json(await consultas.obtenerTodos(consultas.RANGO_ETARIO.TODOS))
    } catch(err){
        console.error('Error conectando con la base de datos', err)
        res.status(500)
            .send('Error interno del servidor')
    }
}
