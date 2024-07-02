document.addEventListener("DOMContentLoaded", function () {
    let mostrarDialogo = function(mensaje){
        let cuerpoDialogo = document.getElementById("cuerpoDialogoRespuestaLogin")
        cuerpoDialogo.textContent = mensaje

        let dialogo = document.getElementById("dialogoRespuestaLogin")
        dialogo.showModal()
    }

    let getBodyLogin = function(formulario){
        let formData = new FormData(formulario)
        console.log(formData)
        let rta = {}
        formData.forEach((valor, clave) => rta[clave] = valor)
        rta = JSON.stringify(rta)
        console.log(rta)
        return rta
    }

    let enviarDatosLogin = async function(formulario){
        try {
            const response = await fetch("/login", {
                method: "POST",
                redirect: "follow",
                headers: {'Content-Type': 'application/json'},
                body: getBodyLogin(formulario)
            })
            console.log(response)
            
            if(response.status != 200){
                let rta = await response.json()
                mostrarDialogo(rta)
            } else {
                let nuevoContenido = await response.text()
                console.log(nuevoContenido)
                document.open()
                document.write(nuevoContenido)
                document.close()
                document.dispatchEvent(new Event("DOMContentLoaded"))
            }
            
        } catch (e) {
            console.error(e)
        }
    }

    const formulario = document.getElementById('formularioLogin');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();
    
        enviarDatosLogin(formulario)
    })
});