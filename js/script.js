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



//-------------------------------------------------------------------------
//Scripts pagina de contacto:




//-------------------------------------------------------------------------
//Scripts pagina de perfil:

//Cambio de foto de perfil
document.addEventListener('DOMContentLoaded', () => {
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
});
  