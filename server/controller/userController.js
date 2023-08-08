const Profile = require("../models/userModel")



async function login(req, res){
    const userData = req.body
    try {
        
        
        
        
        const user = await Profile.find({email: userData.email, password: userData.password});
        console.log("User finded ", user)
            if(!user){
            console.log("Usuario o contraseña incorrectos")
            return res.status(401).json({message: "Usuario o contraseña incorrectos"})
        }else{
            return res.status(200).redirect("http://127.0.0.1:5500/pages/index.html")
        }
        






        return res.status(200).json( {message: "Sesión iniciada con éxito"})
    } catch (error) {
        console.log("[LOGIN ERROR] ", error)
        return res.status(500).json( {message: "Error al iniciar sesión"})
    }  
}


async function register(req, res){
    try {
        const userData = req.body
        console.log("USER DATA R ", userData)

        const result = await Profile.create(userData)
        return res.status(201).json(result)
    } catch (error) {
        console.log("[REGISTER ERROR] ", error)
        return res.status(500).json( {message: "Error al registrar usuario"})
    }

}



async function logout(req, res){
    try {
        req.logout(function (err) {
            if (err) {
              console.log("[LOGOUT ERROR] ", err)
              return res.status(500).json({ message: "Error al cerrar sesión" })
            }
            // Una vez cerrada la sesión, redirecciona al login o a cualquier otra página que desees
            res.status(200).redirect("http://localhost:3000")
          });
    } catch (error) {
        console.log("[LOGOUT ERROR] ", error)
        return res.status(500).json( {message: "Error al cerrar sesión"})
    }
}


async function findByEmail(userEmail){
    const result = await Profile.find({email: userEmail})

    try {
        return result
    } catch (error) {
        console.log("[FIND BY EMAIL ERROR] ", error)
        return res.status(500).json( {message: "Error al encontrar usuario"})
    }
}


async function getUser(req, res){
    try {
        console.log("REKUSERRRR ", req.user)
        if (req.isAuthenticated()) {
            const user = req.user;
            console.log("USER ACAAAAAAAAAAAAAAAAAAAAA ", user)
            return res.status(200).json({
              name: user.name,
              email: user.email,
            });
        } else{
            return res.status(401).json({message: "No iniciaste sesion"})
        }
    } catch (error) {
        console.log("[GET USER ERROR] ", error)
        return res.status(500).json( {message: "Error al encontrar usuario"})
    }
}



async function auth(email, password){
    try {
        const user = {email, password}
        console.log("USER ", user)
        const result = await Profile.find({ email: user.email, password: user.password })
        
        // console.log("RESULT ", result)
        if(result.length !== 0){
            console.log("Authentication successfull")
            
            return {status: 200, user: result}
        }else{
            console.log("Email o contraseña incorrecta")
            return null
        }
    } catch (error) {
        console.log("[MONGODB CONTROLLER AUTH ERROR] ", error)
        throw error
    }
}


async function createFighterProfile(req, res){
    try {
        const user = req.user 
        console.log("USESADASMDASNJDANJLSNJKLDASLNJASDNJ ", user)
        //Obtener el usuario al que se va a vincular !!!
        //----------------------------------------------------
        const userData = req.body
        console.log("Data Fighter ", userData)

        await Profile.findOneAndUpdate({email: user.email}, {$push: {fighterProfile: userData}}, {upsert: true})

        return res.status(201).json( {message: "Usuario creado con éxito"})
    } catch (error) {
        console.log("[createProfile ERROR] ", error)
        return res.status(500).json( {message: "Error al crear usuario"})
    }
}





module.exports = {
    login,
    logout,
    createFighterProfile,
    auth,
    register,
    getUser,
    findByEmail,
    

}