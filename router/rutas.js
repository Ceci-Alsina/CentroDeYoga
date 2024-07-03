import express from 'express'

import jwt, { decode } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const secretkey = process.env.SECRET_KEY

import {obtenerGenerosGET,
        obtenerRangosEtariosGET} from '../controllers/commons.js'

import {altaContactoPOST,
    obtenerMensajesGET,
    eliminarMensajeDELETE,
    actualizarMensajePUT} from '../controllers/mensajes.js'

import {existeUsuario, getUsuario} from '../controllers/usuarios.js'

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
        res.status(401).json('Token inválido')
    }
}

const existeUsuarioRecibido = async (usuario) => {
    const usuarioEnBase = await getUsuario(usuario.username)
    
    if(usuarioEnBase){
        const aux = bcrypt.compareSync(usuario.password, usuarioEnBase.PASSWORD)
        return aux
    }
    
    return false;
}

const irAAdminMensajesGET = async (req, res) => {
    return res.status(200).redirect('/templates/adminMensajes.html')
}

const obtenerPassEncriptada = async (req, res) => {
    const hash = bcrypt.hashSync(req.body.pass, bcrypt.genSaltSync(10))
    return res.json(hash)
}
const rutas = express.Router()

rutas.post('/login', async (req, res) => {
    const user = req.body
    
    if(await existeUsuarioRecibido(user)){
        const token = jwt.sign({user}, secretkey)

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
        res.status(401).json('Credenciales no válidas')
    }
})

rutas.get('/logout', (req, res) => {
    //res.clearCookie('token').json('Logout exitoso')
    res.clearCookie('token').redirect('/')
})

rutas.get('/generos', obtenerGenerosGET)

rutas.get('/rangosEtarios', obtenerRangosEtariosGET)

rutas.post('/altaContacto', altaContactoPOST)

rutas.get('/adminMensajes', verificarToken, irAAdminMensajesGET)

rutas.get('/mensajes', verificarToken, obtenerMensajesGET)

rutas.delete('/mensajes', verificarToken, eliminarMensajeDELETE)

rutas.put('/mensajes', verificarToken, actualizarMensajePUT)

rutas.get('/passEncriptada', obtenerPassEncriptada)

export default rutas
