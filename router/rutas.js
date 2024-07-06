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

import {getUsuario} from '../controllers/usuarios.js'

import {getAllProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    getCategorias} from '../controllers/productos.js'

import {upload} from '../config/multerConfig.js'

const verificarToken = (req, res, next) => {
    const token = req.cookies.token

    if(!token){
        req.app.set("origen", req.url)
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

const irAProductosGET = async (req, res) => {
    return res.status(200).redirect('/templates/productos.html')
}

const obtenerPassEncriptada = async (req, res) => {
    const hash = bcrypt.hashSync(req.body.pass, bcrypt.genSaltSync(10))
    return res.json(hash)
}
const rutas = express.Router()

rutas.post('/login', async (req, res) => {
    const origen = req.app.get("origen")
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
        return (origen == "/adminMensajes") ?
                irAAdminMensajesGET(req, res)
                : irAProductosGET(req, res)
    } else {
        res.status(401).json('Credenciales no válidas')
    }
})

rutas.get('/logout', (req, res) => {
    res.clearCookie('token').redirect('/')
})

rutas.get('/generos', obtenerGenerosGET)

rutas.get('/rangosEtarios', obtenerRangosEtariosGET)

rutas.post('/altaContacto', altaContactoPOST)

rutas.get('/adminMensajes', verificarToken, irAAdminMensajesGET)

rutas.get('/mensajes', verificarToken, obtenerMensajesGET)

rutas.delete('/mensajes', verificarToken, eliminarMensajeDELETE)

rutas.put('/mensajes', verificarToken, actualizarMensajePUT)

rutas.get('/productos', getAllProducts)
rutas.get('/productos/:id', getProductById)
rutas.delete('/productos/:id', deleteProduct)
rutas.post('/productos', upload, createProduct); // Subida de un solo archivo
rutas.put('/productos/:id', upload, updateProduct); // Subida de un solo archivo
rutas.get('/categorias', getCategorias)

rutas.get('/adminProductos', verificarToken, irAProductosGET)

rutas.get('/passEncriptada', obtenerPassEncriptada)

export default rutas
