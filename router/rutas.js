import express from 'express'

import {obtenerGenerosGET,
        obtenerRangosEtariosGET} from '../controllers/commons.js'

import {altaContactoPOST,
    obtenerMensajesGET,
    eliminarMensajeDELETE,
    actualizarMensajePUT} from '../controllers/mensajes.js'

const rutas = express.Router()

rutas.get('/generos', obtenerGenerosGET)

rutas.get('/rangosEtarios', obtenerRangosEtariosGET)

rutas.post('/altaContacto', altaContactoPOST)

rutas.get('/mensajes', obtenerMensajesGET)

rutas.delete('/mensajes', eliminarMensajeDELETE)

rutas.put('/mensajes', actualizarMensajePUT)

export default rutas
