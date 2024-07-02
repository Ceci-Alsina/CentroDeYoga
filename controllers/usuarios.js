import pool from '../config/db.js'
import consultas from '../modulos/consultas.js'

export const existeUsuario = async (nombreUsuario, password) => {
    try {
        console.log(nombreUsuario)
        console.log(password)
        const conexion = await pool.getConnection()
        const existeElUsuario = await conexion.query(consultas.USUARIOS.EXISTE_USUARIO, [nombreUsuario, password])
        return existeElUsuario
    } catch (error) {
        console.error('Error conectando con la base de datos', error)
        return -1
    }
}

