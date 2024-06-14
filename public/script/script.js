
let menu_responsive = document.querySelector(".checkbtn");

menu_responsive.onclick = function () {
  navBar = document.querySelector(".navbar");
  navBar.classList.toggle("active");
};

const obtenerDatos = function(url, cargarDatosRecibidos){
  fetch(url)
      .then((respuesta) => respuesta.json())
      .then(cargarDatosRecibidos)
      .catch((error) => console.error(error))
}

document.addEventListener("DOMContentLoaded", () => {
  
  obtenerDatos("http://localhost:3000/generos", (data) => {
      //cargar el combo de genero del formulario de contactos
      console.log(data)
      let selectGenero = document.getElementById('genero')

      data.forEach((e) => {
          selectGenero.options[selectGenero.options.length] = new Option(e.DESCRIPCION, e.ID)
      });
  })
  
  obtenerDatos("http://localhost:3000/rangosEtarios", (data) => {
      console.log(data)
      let divRangoEtario = document.getElementById('rangoEdad')

      data.forEach((e) => {
          divRangoEtario.innerHTML = divRangoEtario.innerHTML
                                      + '<input type="radio" name="edad" id="' + e.ID + '">  <span class="radioLabel">' + e.RANGO + '</span><br>'
      })
  })
     
})