import {createPool} from 'mysql2/promise'
import 'dotenv/config'

//Crear conexion
const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 6,
    queueLimit: 0
})

pool.getConnection()
    .then((conexion) => {
        pool.releaseConnection(conexion)
        console.log('Base de datos conectada')
    })
    .catch((err) => console.error('Error contectando con la base de datos', err))

export default pool;