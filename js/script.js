//-------------------------------------------------------------------------
//Scripts Inicio

//Funcion para crear eventos dinamicos y cargarlos
async function loadEvents() {
  //Se consiguen los datos de los eventos
  const response = await fetch("http://localhost:8080/api/events/get") 
  const data = await response.json()
 
  const eventsContainer = document.getElementById("events-container")

  //En caso de no haber eventos se crea un div avisando que no hay eventos
  if(data.length === 0){
    const eventEmpty = document.createElement("div")
    eventEmpty.classList.add("event-empty")
    eventEmpty.innerHTML = `<h2 class="empty">No hay eventos por el momento</h2>`
    
    eventsContainer.appendChild(eventEmpty)
  }else{
    //De lo contrario se crea un div con los datos correspondientes para cada uno de los eventos
    const createDiv = document.getElementById("create-event")
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
      eventOrg.textContent = evento.eventOrg
  
      eventHostDiv.appendChild(logoImg)
      eventHostDiv.appendChild(eventOrg)
  
      const eventName = document.createElement("p")
      eventName.textContent = evento.eventName
  
      //Se obtienen los datos de la fecha para formatearla DD/MM
      const formatedDate = new Date(evento.eventDate)
      
      const month = formatedDate.getMonth() + 1
      const day = formatedDate.getDay()
      const normalDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}`
      const eventDate = document.createElement("p")
      eventDate.textContent = `Fecha ${normalDate}`
  
      const eventModality = document.createElement("p")
      eventModality.textContent = evento.eventModality
  
      eventDiv.appendChild(eventHostDiv)
      eventDiv.appendChild(eventName)
      eventDiv.appendChild(eventDate)
      eventDiv.appendChild(eventModality)
  
      eventsContainer.insertBefore(eventDiv, createDiv) // Agregar el div del evento al contenedor
    });
  }
}
loadEvents()



const home = document.querySelector(".home"),
formContainer = document.querySelector(".form-container"),
formCloseBtn = document.querySelector(".form-close"),
signupBtn = document.querySelector("#signup"),
loginBtn = document.querySelector("#login"),
pwShowHide = document.querySelectorAll(".pw-hide");

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
async function updateNavbar() {
  try {
    const response = await fetch("http://localhost:8080/api/users/get",{ method: "GET", credentials: "include"});
    console.log("Response fetch get user ", response)
    const data = await response.json();
    console.log("DAAAAAAAAAAAAAAAATAAAAAAAAAAAAAAAAAAAAAA ", data)

    const userField = document.getElementById("userField");

    if (response.ok) {
      // El usuario está autenticado, muestra la información del usuario
      userField.innerHTML = `Bienvenido, ${data.name || data.email}`;
    } else {
      // El usuario no está autenticado, muestra el enlace de inicio de sesión
      
      // evento del boton iniciar sesion 
      userField.innerHTML = `<button class="button" id="form-open">Iniciar sesion</button>`;
      
      
      const formOpenBtn = document.querySelector("#form-open")
      formOpenBtn.addEventListener("click", () => home.classList.add("show"));
      formCloseBtn.addEventListener("click", () => home.classList.remove("show"));
    }
  } catch (error) {
    console.log("Error al realizar la solicitud", error);
  }
}



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
// const submitButton = document.querySelector("#form-submit")

// submitButton.addEventListener("click", () =>{
  

// })



//-------------------------------------------------------------------------
//Scripts pagina de perfil:

document.addEventListener('DOMContentLoaded', async () => {

  updateNavbar()
  
  //Cambio de foto de perfil
  //   const pictureInput = document.getElementById('picture-input');
  //   const imageElement = document.getElementById('profile-picture');

  //   pictureInput.addEventListener('change', (event) => {
  //     const file = event.target.files[0];

  //     if (file) {
        
  //       if (file.type.startsWith('image/')) {
  //         const reader = new FileReader();
  //         reader.onload = function () {
  //           // Actualizar el atributo src de la imagen para mostrar la imagen seleccionada
  //           imageElement.src = reader.result;
  //         };
  //         reader.readAsDataURL(file);
  //       } else {
  //         alert('Por favor, selecciona un archivo de imagen válido.');
  //       }
  //     }
  //   });

  // //Configuración inputs(no permitir números negativos)
  //   const numberInputs = document.getElementsByClassName("number-input")

  //   numberInputs.addEventListener("blur", () => {
  //     if (numberInputs.value < 0) {
  //       numberInputs.value = 0;
  //     }
  //   });
});
  