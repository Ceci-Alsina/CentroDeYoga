import pool from '../config/db.js'

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
    try {
        const conexion = await pool.getConnection()
        //'SELECT * FROM PRODUCTOS'
        const [filas] = await conexion.query("SELECT p.ID, p.NOMBRE, p.PRECIO, p.DESCRIPCION, p.STOCK, p.IMAGEN, p.ID_CATEGORIA, c.DESCRIPCION AS CATEGORIA FROM PRODUCTOS AS p INNER JOIN CATEGORIAS AS c ON c.ID = p.ID_CATEGORIA")
        conexion.release()
        console.log(filas)
        filas.forEach((fila) => {
            fila.IMAGEN = fila.IMAGEN.toString('base64')
        })
        res.json(filas)
    } catch(err){
        console.error('Error conectando con la base de datos', err)
        res.status(500)
            .send('Error interno del servidor')
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const conexion = await pool.getConnection()
        //'SELECT * FROM PRODUCTOS WHERE ID = ?'
        const results = await conexion.query("SELECT p.ID, p.NOMBRE, p.PRECIO, p.DESCRIPCION, p.STOCK, p.IMAGEN, p.ID_CATEGORIA, c.DESCRIPCION AS CATEGORIA FROM PRODUCTOS AS p INNER JOIN CATEGORIAS AS c ON c.ID = p.ID_CATEGORIA WHERE p.ID = ?", [id]);
        res.json(results[0][0]);
    } catch(err){
        console.error('Error conectando con la base de datos', err)
        res.status(500)
            .send('Error interno del servidor')
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const conexion = await pool.getConnection()
        conexion.query('DELETE FROM PRODUCTOS WHERE ID = ?', [id])

        res.json({ message: `Producto con ID: ${id} eliminado` });

    } catch(err){
        console.error('Error conectando con la base de datos', err)
        res.status(500)
            .send('Error interno del servidor')
    }
}

export const createProduct = async (req, res) => {
    try {
        const { nombre, precio, descripcion, stock, fk_categoria } = req.body
        console.log(req.file)
        let valores = [nombre, precio, descripcion, stock, req.file.buffer, fk_categoria]
        const conexion = await pool.getConnection()
        const rtaInsert = await conexion.query("INSERT INTO `PRODUCTOS` (`ID`, `NOMBRE`, `PRECIO`, `DESCRIPCION`, `STOCK`, `IMAGEN`, `ID_CATEGORIA`) VALUES (NULL, ?, ?, ?, ?, ?, ?)", valores)
        console.log(rtaInsert)

        res.status(200).json({ message: `Producto ${nombre} dado de alta` });
        
    } catch(err){
        console.error('Error conectando con la base de datos', err)
        res.status(500)
            .send('Error interno del servidor')
    }
}

export const updateProduct = async (req, res) => {
    try {
       

    } catch(err){
        console.error('Error conectando con la base de datos', err)
        res.status(500)
            .send('Error interno del servidor')
    }
}

export const getCategorias = async (req, res) => {
    try {
        const conexion = await pool.getConnection()
        const [filas] = await conexion.query("SELECT ID, DESCRIPCION FROM CATEGORIAS")
        conexion.release()
        res.json(filas)
    } catch(err){
        console.error('Error conectando con la base de datos', err)
        res.status(500)
            .send('Error interno del servidor')
    }
}