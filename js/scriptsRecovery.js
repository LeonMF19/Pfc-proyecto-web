const pwShowHide = document.querySelectorAll(".pw-hide");



const pwContainer = document.querySelector(".pw-reset-container")



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


document.addEventListener("DOMContentLoaded", () =>{
    const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const resetForm = document.getElementById('pw-reset-form');
      const newPwForm = document.getElementById('new-pw-form');
      
      if(token){
        // Ocultar el formulario de solicitud de recuperación y mostrar el formulario de cambio de contraseña
        pwContainer.classList.add('active');
        
      }else{
        console.log("sallam hallekum")        
        pwContainer.classList.remove('active')
      }


})