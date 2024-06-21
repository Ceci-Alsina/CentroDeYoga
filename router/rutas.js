import express from 'express'

import {obtenerGenerosGET,
        obtenerRangosEtariosGET} from '../controllers/commons.js'

import {altaContactoPOST,
    obtenerMensajesGET,
    eliminarMensajeDELETE,
    actualizarMensajePUT} from '../controllers/mensajes.js'

const rutas = express.Router()

app.get('/generos', obtenerGenerosGET)

app.get('/rangosEtarios', obtenerRangosEtariosGET)


app.post('/altaContacto', altaContactoPOST)

app.get('/mensajes', obtenerMensajesGET)

app.delete('/mensajes', eliminarMensajeDELETE)

app.put('/mensajes', actualizarMensajePUT)

export default rutas
