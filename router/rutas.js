import express from 'express'

import jwt, { decode } from 'jsonwebtoken'
import 'dotenv/config'
//import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'



const secretkey = process.env.SECRET_KEY
//const __filename = fileURLToPath(import.meta.url)
//const __dirname = dirname(__filename)

import {obtenerGenerosGET,
        obtenerRangosEtariosGET} from '../controllers/commons.js'

import {altaContactoPOST,
    obtenerMensajesGET,
    eliminarMensajeDELETE,
    actualizarMensajePUT} from '../controllers/mensajes.js'

import {existeUsuario} from '../controllers/usuarios.js'

const verificarToken = (req, res, next) => {
    console.log(req.cookies)
    const token = req.cookies.token

    if(!token){
        return res.status(403).redirect('/templates/login.html')
    }

    try {
        console.log(secretkey)
        const decodificado = jwt.verify(token, secretkey)
        console.log(decodificado)
        req.user = decodificado
        next()
    } catch(error){
        res.status(401).send('Token inválido')
    }
}

const existeUsuarioRecibido = (usuario) => {
    //console.log(usuario)
    const rta = existeUsuario(usuario.usuario, usuario.password)
    //console.log(rta)
    return (rta <= 0) ? 0 : rta
}

const irAAdminMensajesGET = async (req, res) => {
    //console.log(res)
    //res.sendFile(__dirname + '/../no_public/templates/adminMensajes.html')
    //let aux = resolve('no_public/templates/adminMensajes.html')
    //console.log(aux)
    //return res.status(200).redirect('')
    let aux = resolve('no_public/templates/adminMensajes.html')
    return res.sendFile(aux)
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
