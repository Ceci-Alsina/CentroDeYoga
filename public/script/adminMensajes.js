
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
    let dataset = evento.target.parentElement.dataset
    
    fetch("/mensajes", {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'id': dataset.id})
        })
        .then((response) => {
            if(response.status == 200){
                obtenerMensajes()
            }
        })
        .catch((e) => console.error(e))
}

const eliminar = (evento) => {
    let dataset = evento.target.parentElement.dataset

    fetch("/mensajes", {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: dataset.id})
        })
        .then((response) => {
            if(response.status == 200){
                obtenerMensajes()
            }
        })
        .catch((e) => console.error(e))
}

const formatearBotonera = (fechaRespuesta, id) => {
    let elementos = []

    if(fechaRespuesta){
        elementos.push(getImg("../img/iconos/check.svg", "OK"))
    } else {
        let anchorResponder = getAnchor("Marcar como Respondido", null, respondido)
        anchorResponder.appendChild(getImg("../img/iconos/reply.svg", "R"))
        anchorResponder.setAttribute('data-id', id)
        elementos.push(anchorResponder)

        let anchorEliminar = getAnchor("Eliminar", null, eliminar)
        anchorEliminar.appendChild(getImg("../img/iconos/delete.svg", "E"))
        anchorEliminar.setAttribute('data-id', id)
        elementos.push(anchorEliminar)
    }

    return elementos
}

const copiarAlClipboard = async (texto) => {
    try {
        await navigator.clipboard.writeText(texto)
    } catch(e){
        console.error(e)
    }
}

const getLinkCopiar = (mail) => {
    let copiar = "copiarAlClipboard('" + mail + "')"
    return mail != "null" ?
            mail + ' <a href="#" onclick="' + copiar + '"><span class="material-symbols-outlined">content_copy</span></a>'
            : "&nbsp;"
}

const mostrarDialogoMensaje = (evento) => {
    let dataset = evento.target.dataset

    document.getElementById("cerrarDialogoAdminMensaje")
            .addEventListener('click', function(){
        let dialogo = document.getElementById("dialogoAdminMensaje")
        dialogo.close()
    })

    let cuerpoDialogo = document.getElementById("cuerpoDialogoAdminMensaje")
    
    cuerpoDialogo.innerHTML = "<div>"
                                + "<div class='titulo'>Mensaje</div>"
                                + "<textarea rows='5' cols='25' readonly>" 
                                + dataset.mensaje
                                + "</textarea>"
                                + "<div class='filaDialogo'>"
                                + "<span class='titulo'>Mail:</span> " + getLinkCopiar(dataset.mail)
                                + "</div>"
                                + "<div class='filaDialogo'>"
                                + "<span class='titulo'>Teléfono:</span> " + (dataset.telefono != "null" ? dataset.telefono : "&nbsp;")
                                + "</div>"
                                + "</div>"
    let dialogo = document.getElementById("dialogoAdminMensaje")
    dialogo.showModal()
}

const formatearMensaje = (mensaje, mail, telefono) => {
    let anchor = getAnchor(mensaje, null, mostrarDialogoMensaje)
    anchor.innerText = mensaje.substring(0, 5) + "..."
    anchor.setAttribute('data-mensaje', mensaje)
    anchor.setAttribute('data-mail', mail)
    anchor.setAttribute('data-telefono', telefono)
    return anchor
}

const cargarDatosRecibidos = (datos) => {
    console.log(datos);

    let tablaTBody = document.getElementById("adminMensajesTable").getElementsByTagName('tbody')[0]

    while(tablaTBody.firstChild){
        tablaTBody.removeChild(tablaTBody.firstChild)
    }

    datos.forEach((mensaje, indice) => {
        let fila = tablaTBody.insertRow(indice)
        fila.insertCell(0).innerHTML = mensaje.ID
        fila.insertCell(1).innerHTML = formatearFecha(mensaje.FECHA_ALTA)
        fila.insertCell(2).innerHTML = mensaje.NOMBRE
        fila.insertCell(3).innerHTML = mensaje.APELLIDO
        fila.insertCell(4).innerHTML = mensaje.RANGO
        fila.insertCell(5).innerHTML = mensaje.GENERO
        fila.insertCell(6).appendChild(formatearRecibeNewsletter(mensaje.RECIBE_NEWSLETTER))
        fila.insertCell(7).appendChild(formatearMensaje(mensaje.MENSAJE, mensaje.CONTACTO_MAIL, mensaje.CONTACTO_TEL))
        fila.insertCell(8).innerHTML = formatearFecha(mensaje.FECHA_RESPUESTA)

        let botonera = document.createElement('div')
        formatearBotonera(mensaje.FECHA_RESPUESTA, mensaje.ID).forEach((e) => {
            botonera.appendChild(e)
        })

        fila.insertCell(9).appendChild(botonera)
    });
};

const obtenerMensajes = () => {
    console.log("a buscar los mensajes")
    fetch('/mensajes')
        .then((respuesta) => respuesta.json())
        .then((datos) => cargarDatosRecibidos(datos))
        .catch((error) => console.error(error));
}

document.addEventListener("DOMContentLoaded", obtenerMensajes);
