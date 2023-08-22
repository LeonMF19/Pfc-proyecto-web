const profileContainer = document.getElementById("profile-container")
const profileForm = document.getElementById("profile-form")


async function updateProfileView(){
    const result = await fetch("http://localhost:8080/api/users/getP", {method: "get", credentials: "include"})
    const data = await result.json()
    console.log("data profile get ", data)
  
    if(data.user.fighterProfile === 0 || data.user.fighterProfile === undefined){
      console.log("El usuario no tiene un perfil de peleador creado")
      return
    }else{
      profileForm.style.display = "none";
      
      const profileSection = document.createElement("div")
      profileSection.setAttribute("id", "profile-section")
  
      const profileData = [
        { title: "Nombre", value: data.name },
        { title: "Dojo", value: data.school },
        { title: "Profesor", value: data.professor },
        { title: "Edad", value: data.age },
        { title: "Cantidad de Peleas", value: data.fights },
        { title: "Categoría", value: data.category }
      ]
      
      
      profileData.forEach(item => {
        const profileDataDiv = document.createElement("div")
        profileDataDiv.classList.add("profile-data-container")

        const profileDataTitle = document.createElement("h3")
        profileDataTitle.textContent = item.title

        const profileDataText = document.createElement("p")
        profileDataText.textContent = item.value

        profileDataDiv.appendChild(profileDataTitle)
        profileDataDiv.appendChild(profileDataText)

        profileSection.appendChild(profileDataDiv)
      })

      profileContainer.appendChild(profileSection)
    } 
}





document.addEventListener("DOMContentLoaded", async () =>{
    updateProfileView()

    //Configuración inputs(no permitir números negativos)
    const numberInputs = document.getElementsByClassName("number-input")
    for (let i = 0; i < numberInputs.length; i++) {
      numberInputs[i].addEventListener("blur", () => {
          if (numberInputs[i].value < 0) {
              numberInputs[i].value = 0;
          }
      });
  }


})
    