import pool from '../config/db.js'

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
    try {
        const conexion = await pool.getConnection()
        const [filas] = await conexion.query("SELECT p.ID, p.NOMBRE, p.PRECIO, p.DESCRIPCION, p.STOCK, p.IMAGEN, p.ID_CATEGORIA, c.DESCRIPCION AS CATEGORIA FROM PRODUCTOS AS p INNER JOIN CATEGORIAS AS c ON c.ID = p.ID_CATEGORIA")
        conexion.release()
        filas.forEach((fila) => {
            fila.IMAGEN = (fila.IMAGEN) ? fila.IMAGEN.toString('base64') : null
        })
        res.json(filas)
    } catch(err){
        console.error('Error conectando con la base de datos', err)
        res.status(500)
            .send('Error interno del servidor')
    }
};

const getUnProducto = async (id) => {
    const conexion = await pool.getConnection()
    const results = await conexion.query("SELECT p.ID, p.NOMBRE, p.PRECIO, p.DESCRIPCION, p.STOCK, p.IMAGEN, p.ID_CATEGORIA, c.DESCRIPCION AS CATEGORIA FROM PRODUCTOS AS p INNER JOIN CATEGORIAS AS c ON c.ID = p.ID_CATEGORIA WHERE p.ID = ?", [id]);
    conexion.release()
    return results[0][0]
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const aux = await getUnProducto(id)
        res.json(aux);
        
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
        conexion.release()
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
        const imagen = req.file
        let valores = [nombre, precio, descripcion, stock, imagen ? imagen.buffer : null, fk_categoria]
        const conexion = await pool.getConnection()
        const rtaInsert = await conexion.query("INSERT INTO `PRODUCTOS` (`ID`, `NOMBRE`, `PRECIO`, `DESCRIPCION`, `STOCK`, `IMAGEN`, `ID_CATEGORIA`) VALUES (NULL, ?, ?, ?, ?, ?, ?)", valores)
        conexion.release()
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
        const { id } = req.params;
        const { nombre, precio, descripcion, stock, fk_categoria } = req.body
        let imagen = req.file

        if(imagen){
            imagen = imagen.buffer
        } else {
            const productoPersistido = await getUnProducto(id)
            if(productoPersistido.IMAGEN){
                imagen = productoPersistido.IMAGEN
            } else {
                imagen = null
            }
        }

        let valores = [nombre, precio, descripcion, stock, imagen, fk_categoria, id]
        const conexion = await pool.getConnection()
        const rtaUpdate = await conexion.query('UPDATE `PRODUCTOS` SET NOMBRE = ?, PRECIO = ?, DESCRIPCION = ?, STOCK = ?, IMAGEN = ?, ID_CATEGORIA = ? WHERE ID = ?', valores)
        conexion.release()
        
        res.status(200).json({ message: `Producto ${nombre} actualizado` });
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