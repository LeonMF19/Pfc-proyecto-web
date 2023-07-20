async function login(req, res){
    const userData = req.body
    try {
        
        
        //const user = await       Traer la info de la base de datos y verificar que exista el usuario
        // if(!user){
        //     console.log("Usuario o contraseña incorrectos")
        //     return res.status(401).json({message: "Usuario o contraseña incorrectos"})
        // }else{

        // }

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

module.exports = {
    login,
    logout
}