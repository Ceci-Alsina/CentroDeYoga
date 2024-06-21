
const formatearFecha = (fechaString) => {
    if(fechaString){
        let fecha = new Date(fechaString)

        return fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate()
                + " " + ('0' + fecha.getHours()).slice(fecha.getHours().toString().length -1)
                + ":" + ('0' + fecha.getMinutes()).slice(fecha.getMinutes().toString().length -1)
    }

    return ""
}

const getImg = (src, alt) => {
    let imagen = document.createElement('img')
    imagen.setAttribute("src", src)
    imagen.setAttribute("alt", alt)
    return imagen
}

const getAnchor = (title, href, accion) => {
    let anchor = document.createElement('a')
    anchor.setAttribute("title", title)
    anchor.setAttribute("href", href ? href : "#")

    if(accion){
        anchor.addEventListener('click', accion)
    }

    return anchor
}

const formatearRecibeNewsletter = (recibeNewsletter) => {
    return getImg((recibeNewsletter == 1) ? "../img/iconos/check.svg": "../img/iconos/close.svg",
                    (recibeNewsletter == 1) ? "Si" : "No")
}

const respondido = (evento) => {
    console.log(evento)

    try {
        const response = await fetch("/mensajes", {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: 1})
        })

        console.log(response)

    } catch (e) {
        console.error(e)
    }
}

const eliminar = (evento) => {
    console.log(evento)

    try {
        const response = await fetch("/mensajes", {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: 1})
        })

        console.log(response)

    } catch (e) {
        console.error(e)
    }
}

const formatearBotonera = (fechaRespuesta) => {
    let elementos = []

    if(fechaRespuesta){
        elementos.push(getImg("../img/iconos/check.svg", "OK"))
    } else {
        let anchorResponder = getAnchor("Responder", null, respondido)
        anchorResponder.appendChild(getImg("../img/iconos/reply.svg", "R"))
        elementos.push(anchorResponder)

        let anchorEliminar = getAnchor("Eliminar", null, eliminar)
        anchorEliminar.appendChild(getImg("../img/iconos/delete.svg", "E"))
        elementos.push(anchorEliminar)
    }

    return elementos
}

const mostrarDialogoMensaje = (evento) => {
    let cuerpoDialogo = document.getElementById("cuerpoDialogoAdminMensaje")
    //mostrar contactos y mensaje
    //document.getElementsByTagName('a')[0].setAttribute('data-prueba', "esta es una prueba")
    //document.getElementsByTagName('a')[0].getAttribute('data-prueba') 
    cuerpoDialogo.textContent = ""

    let dialogo = document.getElementById("dialogoAdminMensaje")
    dialogo.showModal()
}

const formatearMensaje = (mensaje) => {
    let anchor = getAnchor(mensaje, null, mostrarDialogoMensaje)
    anchor.innerText = mensaje.substring(0, 5) + "..."

    return anchor
}

const cargarDatosRecibidos = (datos) => {
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
        fila.insertCell(8).innerHTML = formatearFecha(mensaje.FECHA_RESPUESTA)

        formatearBotonera(mensaje.FECHA_RESPUESTA).forEach((e) => {
            fila.insertCell(9).appendChild(e)
        })
    });
};

document.addEventListener("DOMContentLoaded", function () {
    fetch('/mensajes')
        .then((respuesta) => respuesta.json())
        .then(cargarDatosRecibidos)
        .catch((error) => console.error(error));
});
