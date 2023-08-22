const Profile = require("../models/userModel")
const bcrypt = require("bcryptjs")


async function login(req, res) {
    const userData = req.body;
    try {
        const user = await Profile.findOne({ email: userData.email });
        if (!user) {
            console.log("Usuario no encontrado");
            return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
        } else {
            // Verificar la contraseña utilizando bcrypt.compare
            const passwordMatch = await bcrypt.compare(userData.password, user.password);
            
            if (passwordMatch) {
                return res.status(200).redirect("http://127.0.0.1:5500/pages/index.html");
            } else {
                console.log("Contraseña incorrecta");
                return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
            }
        }
    } catch (error) {
        console.log("[LOGIN ERROR] ", error);
        return res.status(500).json({ message: "Error al iniciar sesión" });
    }
}


async function register(req, res) {
    try {
        const userData = req.body;
        console.log("USER DATA R ", userData);

        // Generar un hash de la contraseña antes de crear el perfil del usuario
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Crear el perfil del usuario utilizando el hash de la contraseña
        const result = await Profile.create({ ...userData, password: hashedPassword });

        return res.status(201).json(result);
    } catch (error) {
        console.log("[REGISTER ERROR] ", error);
        return res.status(500).json({ message: "Error al registrar usuario" });
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
            res.clearCookie("connect.sid")
            
            res.status(200).redirect("http://localhost:3000")
          });
    } catch (error) {
        console.log("[LOGOUT ERROR] ", error)
        return res.status(500).json( {message: "Error al cerrar sesión"})
    }
}


async function findByEmail(userEmail){
    const result = await Profile.findOne({email: userEmail})

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


async function getUserProfile(req, res){
    try {
        if (req.isAuthenticated()) {
            const user = req.user;
            if(user.fighterProfile.length === 0 || null){
                console.log("El usuario no tiene un perfil de peleador creado")
                return res.status(404)
            }
            console.log("USERSADASDASDASDA ", user.fighterProfile)
            return res.status(200).json(user.fighterProfile)
        } else{
            return res.status(401).json({message: "No iniciaste sesion"})
        }
    } catch (error) {
        console.log("[GET PROFILE ERROR] ", error)
        return res.status(500).json( {message: "Error al encontrar perfil"})
    }
}


async function auth(email, password){
    try {
        const userData = {email, password}
        console.log("USER ", userData)
        const user = await Profile.findOne({ email: userData.email})
        
        if(!user){
            console.log("Email o contraseña incorrecta")
            return null
            
        }else{
            // Verificar la contraseña utilizando bcrypt.compare
            const passwordMatch = await bcrypt.compare(password, user.password);
            
            if(passwordMatch) {
                console.log("Authentication successfull")
                return {status: 200, user: {...user, passwordMatch}}
            }else{
               console.log("Contraseña incorrecta");
               return {status: 401,  message: "Usuario o contraseña incorrectos" };
            }
            
           
        }
    } catch (error) {
        console.log("[MONGODB CONTROLLER AUTH ERROR] ", error)
        throw error
    }
}


async function createFighterProfile(req, res){
    try {
        //Se obtiene el usuario al que se le va a vincular el perfil
        const user = req.user 
        console.log("USESADASMDASNJDANJLSNJKLDASLNJASDNJ ", user)
        //Se obtienen los datos
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
    getUserProfile,
    findByEmail,
    

}