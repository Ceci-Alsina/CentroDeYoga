import pool from './config/db.js'
import consultas from './modulos/consultas.js'


export const altaContactoPOST = async (req, res) => {
    try {
        await impactarConsulta(req.body)
        res.json("Consulta recibida")
    } catch (error) {
        console.error('Error conectando con la base de datos', error)
        res.status(500)
            .send('Error interno del servidor')
    }
}

export const obtenerMensajesGET = async (req, res) => {
    try {
        res.json(await consultas.obtenerTodos(consultas.CONSULTA.TODOS))
    } catch(err){
        console.error('Error conectando con la base de datos', err)
        res.status(500)
            .send('Error interno del servidor')
    }
}

export const eliminarMensajeDELETE = async (req, res) => {
    try {
        res.json(await eliminarMensaje(req.body))
    } catch(err){
        console.error('Error conectando con la base de datos', err)
        res.status(500)
            .send('Error interno del servidor')
    }
}

export const actualizarMensajePUT = async (req, res) => {
    try {
        res.json(await actualizarMensaje(req.body))
    } catch(err){
        console.error('Error conectando con la base de datos', err)
        res.status(500)
            .send('Error interno del servidor')
    }
}

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

let eliminarMensaje = (reqEliminar) => {
    console.log(reqEliminar)
}

let actualizarMensaje = (reqActualizar) => {
    console.log(reqActualizar)
}
