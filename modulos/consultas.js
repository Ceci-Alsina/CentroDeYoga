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
            ', con1.VALOR AS CONTACTO_MAIL' +
            ', con2.VALOR AS CONTACTO_TEL' +
            ' FROM CONSULTA AS c' +
            ' INNER JOIN RANGO_ETARIO AS re ON re.ID = c.ID_RANGO_ETARIO' +
            ' INNER JOIN GENERO AS g ON g.ID = c.ID_GENERO' +
            ' LEFT JOIN CONTACTO AS con1 ON con1.ID_CONSULTA = c.ID AND con1.ID_TIPO_CONTACTO = 1' +
            ' LEFT JOIN CONTACTO AS con2 ON con2.ID_CONSULTA = c.ID AND con2.ID_TIPO_CONTACTO = 2' +
            ' ORDER BY c.ID',
    DELETE_GET_BY_ID: 'DELETE FROM `CONSULTA` WHERE ID = ?',
    INSERT: "INSERT INTO `CONSULTA`"
                + " (`ID`, `NOMBRE`, `APELLIDO`, `MENSAJE`, `RECIBE_NEWSLETTER`, `FECHA_ALTA`, `FECHA_RESPUESTA`, `ID_RANGO_ETARIO`, `ID_GENERO`)"
                + " VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)",
    UPDATE_RESPONDIDO: "UPDATE `CONSULTA` SET FECHA_RESPUESTA = ? WHERE ID = ?"
}

//CONTACTO
const CONTACTO = {
    INSERT: "INSERT INTO `CONTACTO` (`ID_CONSULTA`, `ID_TIPO_CONTACTO`, `VALOR`) VALUES (?, ?, ?)",
    DELETE_GET_BY_ID_CONSULTA: 'DELETE FROM `CONTACTO` WHERE ID_CONSULTA = ?'
}

//USUARIOS
const USUARIOS = {
    EXISTE_USUARIO: "SELECT COUNT(ID) = 1 FROM `USUARIOS` WHERE USUARIO = ? AND PASSWORD = ?",
    GET_USUARIO: "SELECT USUARIO, PASSWORD FROM `USUARIOS` WHERE USUARIO = ?"
}

//module.exports = {
export default {
    GENERO,
    RANGO_ETARIO,
    CONSULTA,
    CONTACTO,
    USUARIOS
}
