const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const {auth, findByEmail} = require("../controller/userController")




//Función para autorizar la sesión del usuario
passport.use("auth", new LocalStrategy({usernameField: "email"}, async (email, password, done) => {
    try {
        //Se verifican los datos en la base de datos
        const result = await auth(email, password)
        console.log("RESULT AUTH ", result)
        if(result.status === 200){
            //En caso de ser correcto se extrae el mail del usuario, con eso vamos a verificar las solicitudes posteriores
            const user = result.user
            return done(null, user)
        } else if(result.status !== 200 || !result.status){
            return done(null, false, {message: "Usuario no encontrado"})
        }
        
    } catch (error) {
        console.log("[PASSPORT AUTH ERROR] ", error)
        return done(error)
    }

}))



passport.serializeUser((user, done) =>{
    console.log("SERIALIZADO ", user)
    done(null, user._doc.email)

})


passport.deserializeUser( async (email, done) =>{
    const deserialized = await findByEmail(email)
    console.log("DESERIALIZADO ", deserialized)
    done(null, deserialized)

})


//Función para verificar si el usuario esta autenticado
async function checkAuthenticated(req, res, next){
    try {
        if(req.isAuthenticated()){
            return next()
        }
        
    } catch (error) {
        console.log("[CHECK AUTHENTICATED ERROR] ", error)
        return error
    }

}



module.exports = {
    passport,
    checkAuthenticated,


}