//GENERO
const GENERO = {
    TODOS: 'SELECT * FROM GENERO'
}

//RANGO_ETARIO
const RANGO_ETARIO = {
    TODOS: 'SELECT * FROM RANGO_ETARIO'
}

//CONSULTA
const CONSULTA = {
    //falta la informacion del resto de las tablas
    TODOS: 'SELECT c.ID' +
            ', c.NOMBRE' +
            ', c.APELLIDO' +
            ', c.MENSAJE' +
            ', c.RECIBE_NEWSLETTER' +
            ', c.FECHA_ALTA' +
            ', c.FECHA_RESPUESTA' +
            ', re.ID AS ID_RANGO_ETARIO' +
            ', re.RANGO' +
            ', g.ID AS ID_GENERO' +
            ', g.DESCRIPCION AS GENERO' +
            ' FROM CONSULTA AS c' +
            ' INNER JOIN RANGO_ETARIO AS re ON re.ID = c.ID_RANGO_ETARIO' +
            ' INNER JOIN GENERO AS g ON g.ID = c.ID_GENERO',
    INSERT: "INSERT INTO `CONSULTA`"
                + " (`ID`, `NOMBRE`, `APELLIDO`, `MENSAJE`, `RECIBE_NEWSLETTER`, `FECHA_ALTA`, `FECHA_RESPUESTA`, `ID_RANGO_ETARIO`, `ID_GENERO`)"
                + " VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)"
}

//CONTACTO
const CONTACTO = {
    INSERT: "INSERT INTO `CONTACTO` (`ID_CONSULTA`, `ID_TIPO_CONTACTO`, `VALOR`) VALUES (?, ?, ?)"
}

const obtenerTodos = async function(consulta){
    const conexion = await pool.getConnection()
    const [filas] = await conexion.query(consulta)
    conexion.release()
    //console.log(filas)
    return filas
}

//module.exports = {
export default {
    GENERO,
    RANGO_ETARIO,
    CONSULTA,
    CONTACTO,
    obtenerTodos
}
