const obtenerDatos = function(url, cargarDatosRecibidos){
    fetch(url)
        .then((respuesta) => respuesta.json())
        .then(cargarDatosRecibidos)
        .catch((error) => console.error(error))
}

/* Cada campo del formulario tiene un manejador de eventos oninput que dá un mensaje de validación 
 que se activa si el campo no cumple con la validación especificada por el atributo pattern o 
 si el campo está vacío (atributo required en el HTML).*/
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById('formularioContacto');

    // Validación para el nombre
    const nombre = document.getElementById("nombre");
    nombre.oninput = function() {
        nombre.setCustomValidity('');
        if (!nombre.validity.valid) {
            nombre.setCustomValidity("El nombre debe contener entre 1 y 15 letras y no puede estar vacío.");
        }
    };

    // Validación para el apellido
    const apellido = document.getElementById("apellido");
    apellido.oninput = function() {
        apellido.setCustomValidity('');
        if (!apellido.validity.valid) {
            apellido.setCustomValidity("El apellido debe contener entre 2 y 15 letras y no puede estar vacío.");
        }
    };

    // Validación para el email
    const email = document.getElementById("email");
    email.oninput = function() {
        email.setCustomValidity('');
        if (!email.validity.valid) {
            email.setCustomValidity("¡Se esperaba una dirección de correo electrónico válida y no puede estar vacía!");
        }
    };

    // Validación para el teléfono
    const telefono = document.getElementById("telefono");
    telefono.oninput = function() {
        telefono.setCustomValidity('');
        if (!telefono.validity.valid) {
            telefono.setCustomValidity("Introduzca un número de teléfono válido y asegúrese de que no esté vacío.");
        }
    };

    // Validación para el mensaje
    const mensaje = document.getElementById("mensaje");
    mensaje.oninput = function() {
        mensaje.setCustomValidity('');
        if (!mensaje.validity.valid) {
            mensaje.setCustomValidity("El mensaje no puede estar vacío.");
        }
    };

    let cerrarDialogoRespuestaSubmit = document.getElementById("cerrarDialogoRespuestaSubmit")
    cerrarDialogoRespuestaSubmit.addEventListener('click', function(){
        let dialogo = document.getElementById("dialogoRespuestaSubmit")
        dialogo.close()
    })

    let mostrarDialogo = function(mensaje){
        let cuerpoDialogo = document.getElementById("cuerpoDialogoRespuestaSubmit")
        cuerpoDialogo.textContent = mensaje

        let dialogo = document.getElementById("dialogoRespuestaSubmit")
        dialogo.showModal()
    }

    let getBodyConsulta = function(formulario){
        let formData = new FormData(formulario)
        let edadSeleccionada = document.querySelectorAll('input[name="edad"]:checked')
        formData.set("edad", edadSeleccionada.length > 0 ? edadSeleccionada[0].getAttribute("id") : null)

        formData.set("recibeNewsletter", formData.get("recibeNewsletter") ? true : false)
        //console.log(formData)
        let rta = {}
        formData.forEach((valor, clave) => rta[clave] = valor)
        rta = JSON.stringify(rta)
        console.log(rta)
        return rta
    }

    let enviarDatosConsulta = async function(formulario){
        try {
            const response = await fetch("/altaContacto", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: getBodyConsulta(formulario)
            })
            
            let rta = await response.json()
            
            mostrarDialogo(rta)

            if(response.status == 200){
                await formulario.reset()
            }
            
        } catch (e) {
            console.error(e)
        }
    }

    // Agrega el evento submit para verificar la validez del formulario
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        if (!formulario.checkValidity()) {    
            // Activar las validaciones de los campos para mostrar mensajes
            nombre.oninput();
            apellido.oninput();
            email.oninput();
            telefono.oninput();
            mensaje.oninput();
        }

        enviarDatosConsulta(formulario)
        
    });

    obtenerDatos("/generos", (data) => {
        //cargar el combo de genero del formulario de contactos
        console.log(data)
        let selectGenero = document.getElementById('genero')
  
        data.forEach((e) => {
            selectGenero.options[selectGenero.options.length] = new Option(e.DESCRIPCION, e.ID)
        });
    })
    
    obtenerDatos("/rangosEtarios", (data) => {
        console.log(data)
        let divRangoEtario = document.getElementById('rangoEdad')
  
        data.forEach((e) => {
            divRangoEtario.innerHTML = divRangoEtario.innerHTML
                                        + '<input type="radio" name="edad" id="' + e.ID + '">  <span class="radioLabel">' + e.RANGO + '</span><br>'
        })
    })
});