import express from 'express'

import jwt, { decode } from 'jsonwebtoken'
import 'dotenv/config'

const secretkey = process.env.SECRET_KEY

import {obtenerGenerosGET,
        obtenerRangosEtariosGET} from '../controllers/commons.js'

import {altaContactoPOST,
    obtenerMensajesGET,
    eliminarMensajeDELETE,
    actualizarMensajePUT} from '../controllers/mensajes.js'

import {existeUsuario} from '../controllers/usuarios.js'

const verificarToken = (req, res, next) => {
    const token = req.cookies.token

    if(!token){
        return res.status(403).redirect('/templates/login.html')
    }

    try {
        const decodificado = jwt.verify(token, secretkey)
        req.user = decodificado
        next()
    } catch(error){
        res.status(401).send('Token inválido')
    }
}

const existeUsuarioRecibido = (usuario) => {
    const rta = existeUsuario(usuario.usuario, usuario.password)
    return (rta <= 0) ? 0 : rta
}

const irAAdminMensajesGET = async (req, res) => {
    return res.status(200).redirect('/templates/adminMensajes.html')
}

const rutas = express.Router()

rutas.post('/login', async (req, res) => {
    const user = req.body
    
    if(existeUsuarioRecibido(user)){
        console.log(secretkey)
        const token = jwt.sign({user}, secretkey)
        console.log(token)

        res.cookie(
            'token',
            token,
            {
                httpOnly: true,
                secure: false,
                expires: new Date(Date.now() + 3600000)
            }
        )
        return irAAdminMensajesGET(req, res)
    } else {
        res.status(401).send('Credenciales no válidas')
    }
})

rutas.get('/logout', (req, res) => {
    res.clearCookie('token').send('Salió correctamente.')
})

rutas.get('/generos', obtenerGenerosGET)

rutas.get('/rangosEtarios', obtenerRangosEtariosGET)

rutas.post('/altaContacto', altaContactoPOST)

rutas.get('/adminMensajes', verificarToken, irAAdminMensajesGET)

rutas.get('/mensajes', verificarToken, obtenerMensajesGET)

rutas.delete('/mensajes', verificarToken, eliminarMensajeDELETE)

rutas.put('/mensajes', verificarToken, actualizarMensajePUT)

export default rutas
