const formatearFecha = (fechaString) => {
    let fecha = new Date(fechaString)

    return fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate()
            + " " + (fecha.getHours() < 10 ? "0" : "") + fecha.getHours()
            + ":" + (fecha.getMinutes() < 10 ? "0" : "") + fecha.getMinutes()
}

const getImg = (src, alt) => {
    let imagen = document.createElement('img')
    imagen.setAttribute("src", src)
    imagen.setAttribute("alt", alt)
    return imagen
}

const getAnchor = (title, href) => {
    let anchor = document.createElement('a')
    anchor.setAttribute("title", title)
    anchor.setAttribute("href", href ? href : "#")
    return anchor
}

const formatearRecibeNewsletter = (recibeNewsletter) => {
    return getImg((recibeNewsletter == 1) ? "../img/iconos/check.svg": "../img/iconos/close.svg",
                    (recibeNewsletter == 1) ? "Si" : "No")
}

const formatearBotonera = (fechaRespuesta) => {
    let elementos = []
    
    if(fechaRespuesta){
        elementos.push(getImg("../img/iconos/check.svg", "OK"))
    } else {
        let anchorResponder = getAnchor("Responder")
        anchorResponder.appendChild(getImg("../img/iconos/reply.svg", "R"))
        elementos.push(anchorResponder)

        let anchorEliminar = getAnchor("Eliminar")
        anchorEliminar.appendChild(getImg("../img/iconos/delete.svg", "E"))
        elementos.push(anchorEliminar)
    }

    return elementos
}

const formatearMensaje = (mensaje) => {
    let anchor = getAnchor(mensaje)
    anchor.innerText = mensaje.substring(0, 5) + "..."

    return anchor
}

document.addEventListener("DOMContentLoaded", function () {
    let cargarDatosRecibidos = (datos) => {
        console.log(datos);

        let tablaTBody = document.getElementById("adminMensajesTable").getElementsByTagName('tbody')[0]

        datos.forEach((mensaje, indice) => {
            let fila = tablaTBody.insertRow(indice)
            fila.insertCell(0).innerHTML = mensaje.ID
            fila.insertCell(1).innerHTML = formatearFecha(mensaje.FECHA_ALTA)
            fila.insertCell(2).innerHTML = mensaje.NOMBRE
            fila.insertCell(3).innerHTML = mensaje.APELLIDO
            fila.insertCell(4).innerHTML = mensaje.RANGO
            fila.insertCell(5).innerHTML = mensaje.GENERO
            fila.insertCell(6).appendChild(formatearRecibeNewsletter(mensaje.RECIBE_NEWSLETTER))
            fila.insertCell(7).appendChild(formatearMensaje(mensaje.MENSAJE))
            fila.insertCell(8).innerHTML = mensaje.FECHA_RESPUESTA

            formatearBotonera(mensaje.FECHA_RESPUESTA).forEach((e) => {
                fila.insertCell(9).appendChild(e)
            })
            
        });
    };

    fetch('/mensajes')
        .then((respuesta) => respuesta.json())
        .then(cargarDatosRecibidos)
        .catch((error) => console.error(error));
});
