document.addEventListener("DOMContentLoaded", function () {
    let cerrarDialogoRespuestaLogin = document.getElementById("cerrarDialogoRespuestaLogin")
    cerrarDialogoRespuestaLogin.addEventListener('click', function(){
        let dialogo = document.getElementById("dialogoRespuestaLogin")
        dialogo.close()
    })

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
                document.location.href = response.url
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