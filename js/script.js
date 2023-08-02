//-------------------------------------------------------------------------
//Scripts Inicio

//Funcion para crear eventos dinamicos y cargarlos
async function loadEvents() {
  const response = await fetch("http://localhost:8080/api/events/get") 
  const data = await response.json()
 
  const eventsContainer = document.getElementById("events-container")

  if(data.length === 0){
    const eventEmpty = document.createElement("div")
    eventEmpty.classList.add("event-empty")
    eventEmpty.innerHTML = `<h2 class="empty">No hay eventos por el momento</h2>`
    
    eventsContainer.appendChild(eventEmpty)
  }else{
    data.forEach((evento) => {
      const eventDiv = document.createElement("div")
      eventDiv.classList.add("event")
      eventDiv.setAttribute("data-bs-toggle", "modal")
      eventDiv.setAttribute("data-bs-target", "#staticBackdrop")
  
      const eventHostDiv = document.createElement("div")
      eventHostDiv.classList.add("event-host")
  
      const logoImg = document.createElement("img")
      logoImg.src = evento.logoCompetition
      logoImg.alt = "Logo competencia"
  
      const eventOrg = document.createElement("p")
      eventOrg.textContent = evento.org
  
      eventHostDiv.appendChild(logoImg)
      eventHostDiv.appendChild(eventOrg)
  
      const eventName = document.createElement("p")
      eventName.textContent = evento.name
  
      const eventDate = document.createElement("p")
      eventDate.textContent = `Fecha ${evento.date}`
  
      const eventModality = document.createElement("p")
      eventModality.textContent = evento.modality
  
      eventDiv.appendChild(eventHostDiv)
      eventDiv.appendChild(eventName)
      eventDiv.appendChild(eventDate)
      eventDiv.appendChild(eventModality)
  
      eventsContainer.appendChild(eventDiv) // Agregar el div del evento al contenedor
    });
  }
}
loadEvents()



const formOpenBtn = document.querySelector("#form-open"),
home = document.querySelector(".home"),
formContainer = document.querySelector(".form-container"),
formCloseBtn = document.querySelector(".form-close"),
signupBtn = document.querySelector("#signup"),
loginBtn = document.querySelector("#login"),
pwShowHide = document.querySelectorAll(".pw-hide");

// evento del boton iniciar sesion 
formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));
 // Ocultar o mostrar contraseña
pwShowHide.forEach(icon =>{
    icon.addEventListener("click", () =>{
        let getPwInput = icon.parentElement.querySelector("input");
        if(getPwInput.type === "password"){
            getPwInput.type = "text";
            icon.classList.replace("uil-eye-slash", "uil-eye")
        }else{
            getPwInput.type = "password";
            icon.classList.replace("uil-eye", "uil-eye-slash")
        }
    });
});
//Eventos del link iniciar sesion y registrarme
signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.remove("active");
});

//Mostrar usuario en navbar y esconder "Iniciar Sesion"
const userField = document.getElementById("userField")





//-------------------------------------------------------------------------
//Scripts Eventos

//Funcion para enviar los datos del evento creado
const eventsSubmit = document.getElementById("events-submit")

eventsSubmit.addEventListener("click", () =>{
  const form = document.getElementById("events-form")
  
  
  form.submit()

})
  
  
  
  
  
  
  
  
  
  



//-------------------------------------------------------------------------
//Scripts pagina de contacto:
const submitButton = document.querySelector("#form-submit")

submitButton.addEventListener("click", () =>{
  

})



//-------------------------------------------------------------------------
//Scripts pagina de perfil:

document.addEventListener('DOMContentLoaded', async () => {
  //Cambio de foto de perfil
    const pictureInput = document.getElementById('picture-input');
    const imageElement = document.getElementById('profile-picture');

    pictureInput.addEventListener('change', (event) => {
      const file = event.target.files[0];

      if (file) {
        
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = function () {
            // Actualizar el atributo src de la imagen para mostrar la imagen seleccionada
            imageElement.src = reader.result;
          };
          reader.readAsDataURL(file);
        } else {
          alert('Por favor, selecciona un archivo de imagen válido.');
        }
      }
    });

  //Configuración inputs(no permitir números negativos)
    const numberInputs = document.getElementsByClassName("number-input")

    numberInputs.addEventListener("blur", () => {
      if (numberInputs.value < 0) {
        numberInputs.value = 0;
      }
    });
});
  