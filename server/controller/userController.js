const Profile = require("../models/userModel")


const testDB = [{
    
    email: "testemail@gmail.com",
    password: "test123"
},{ 
    email: "testemail2@gmail.com",
    password: "test1234"

}]




async function login(req, res){
    const userData = req.body
    try {
        
        
        //const user = await       Traer la info de la base de datos y verificar que exista el usuario
        
        const user = testDB.find(
            (item) => item.email === userData.email && item.password === userData.password
            );
            if(!user){
            console.log("Usuario o contraseña incorrectos")
            return res.status(401).json({message: "Usuario o contraseña incorrectos"})
        }else{
            
        }
        






        return res.status(200).json( {message: "Sesión iniciada con éxito"})
    } catch (error) {
        console.log("[LOGIN ERROR] ", error)
        return res.status(500).json( {message: "Error al iniciar sesión"})
    }  
}


async function logout(req, res){
    try {
        
        
        return res.status(200).json( {message: "Sesión cerrada con éxito"})
    } catch (error) {
        console.log("[LOGIN ERROR] ", error)
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


async function auth(email, password){
    try {
        const user = {email, password}
        console.log("USER ", user)
        const result = await this.collection.find({ email: user.email, password: user.password })
        
        console.log("RESULT ", result)
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
        //const createdUser = Obtener 
        const userData = req.body

        await Profile.create(userData)

        return res.status(201).json( {message: "Usuario creado con éxito"}).redirect("http://localhost:3000")
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

}