import pool from '../config/db.js'
import consultas from '../modulos/consultas.js'

export const existeUsuario = async (nombreUsuario, password) => {
    try {
        const conexion = await pool.getConnection()
        const existeElUsuario = await conexion.query(consultas.USUARIOS.EXISTE_USUARIO, [nombreUsuario, password])
        return existeElUsuario
    } catch (error) {
        console.error('Error conectando con la base de datos', error)
        return -1
    }
}

export const getUsuario = async (nombreUsuario) => {
    try {
        const conexion = await pool.getConnection()
        const usuarioEncontrado = await conexion.query(consultas.USUARIOS.GET_USUARIO, nombreUsuario)
        return usuarioEncontrado[0][0]
    } catch (error) {
        console.error('Error conectando con la base de datos', error)
        return -1
    }
}


