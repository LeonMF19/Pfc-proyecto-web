const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const Usercontroller = require("../controller/userController")




//Función para autorizar la sesión del usuario
passport.use("auth", new LocalStrategy({usernameField: "email"}, async (email, password, done) => {
    try {
        //Se verifican los datos en la base de datos
        const result = await Usercontroller.auth(email, password)
        if(result.status === 200){
            //En caso de ser correcto se extrae el mail del usuario, con eso vamos a verificar las solicitudes posteriores
            const userToSerialize = result.email
            return done(null, userToSerialize)
        } else{
            return donde(null, false, {message: "Usuario no encontrado"})
        }
        
    } catch (error) {
        console.log("[PASSPORT AUTH ERROR] ", error)
        return done(error)
    }

}))



passport.serializeUser((email, done) =>{
    console.log("SERIALIZADO ", email)
    done(null, email)

})


passport.deserializeUser((email, done) =>{
    console.log("DESERIALIZADO ", email)
    done(null, email)

})


//Función para verificar si el usuario esta autenticado
async function checkAuthenticated(){
    try {
        
    } catch (error) {
        console.log("[CHECK AUTHENTICATED ERROR] ", error)
        return error
    }

}



module.exports = {
    passport,
    checkAuthenticated,


}