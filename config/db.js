import {createPool} from 'mysql2/promise'

//Crear conexion
const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'yoga',
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