//-------------------------------------------------------------------------
//Scripts Inicio

//Funcion para crear eventos y modales dinamicos y cargarlos
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
    //Funcion para crear modales dinamicos
    function createAndShowModal(event) {
      const modalId = `modal-${event._id}`;
      console.log("EVENTTTTT ", event)
      const modalContent = `
      <div class="modal fade" id="${modalId}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5">${event.eventOrg}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h2>${event.eventName}</h2>  
              <div>
                <p> </p>  
                <h4>Dirección</h4>
                  <p>${event.eventAdress}</p>
                <h4>Pesaje</h4>
                  <p>${event.eventWeighing}</p>
              </div>
              <label for="fighter-data">Anotarme con mis <a href="http://" target="_blank" rel="noopener noreferrer">datos actuales</a> 
                    <input type="checkbox" name="fighter-data">
                </label>
            </div>
            <div class="modal-footer">
                <button type="button" class="modal-button-cancel" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="modal-button-confirm">Confirmar</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalContent);

    const modalElement = document.getElementById(modalId);
    const modal = new bootstrap.Modal(modalElement);

    modal.show();
    }

    
    //Se crea un div con los datos correspondientes para cada uno de los eventos
    const createDiv = document.getElementById("create-event")
    data.forEach((evento) => {
      const eventDiv = document.createElement("div")
      eventDiv.classList.add("event")
      
      eventDiv.addEventListener('click', () => {
        createAndShowModal(evento);
      });
      // const modalId = `modal-${evento._id}`
      // eventDiv.setAttribute("data-bs-toggle", "modal")
      // eventDiv.setAttribute("data-bs-target", `#${modalId}`)
  
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



//Mostrar usuario en navbar y esconder "Iniciar Sesion"
async function updateNavbar() {
  try {
    
    const response = await fetch("http://localhost:8080/api/users/get",{ 
      method: "get",
      credentials: "include"
    });
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


//Constantes globales
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
  console.log("LOADED")
  await updateNavbar()
  
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


});


