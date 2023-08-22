const nodemailer = require('nodemailer')
const crypto = require('crypto')
const Profile = require("../models/userModel")
const {findByEmail} = require("../controller/userController")
const bycript = require("bcryptjs")



// Simulación de tokens de recuperación de contraseña
const passwordResetTokens = {}

// Configuración de nodemailer para enviar correos electrónicos
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'maildelPFC@gmail.com', 
    pass: 'contrasena X', //Contraseña generada por servicios de gmail
  },
})



async function sendMail(){
    try {
        // Ruta para enviar el correo cuando se reciba la solicitud POST desde el formulario
        
        const { nombre, email, mensaje } = req.body
    
        const mailOptions = {
        from: 'tucorreo@gmail.com', // Reemplaza con tu dirección de correo (misma que la configurada en auth)
        to: 'tucorreo@gmail.com', // Reemplaza con la dirección a la que quieres enviar el correo
        subject: 'Mensaje de contacto desde el formulario',
        text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`,
        }
    
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.status(500).send('Hubo un error al enviar el correo.')
        } else {
            console.log('Correo enviado: ' + info.response)
            res.status(200).send('¡Correo enviado correctamente!')
        }
        })
    
    
  
        
        
        
        
        console.log('Correo enviado: ' + info.response)
        res.status(200).send('¡Correo enviado correctamente!')
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error al enviar el correo.')
    }


}



//Reestablecimiento de contraseña
async function resetPw(req, res){
    try {
        //Se obtiene el token generado y el usuario
        const token = req.params.token
        const userId = passwordResetTokens[token]

        if (!userId) {
            return res.status(403).json({ error: 'Token inválido o expirado.' })
        }

        const newPassword = req.body.newPassword;
        const user = await findByEmail(userId)

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' })
        }

        //Establecer la nueva contraseña hasheada
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        //Se elimina el token 
        delete passwordResetTokens[token]

        res.status(200) // Redirigir a la página de inicio de sesión
    } catch (error) {
        console.log("[RESET PW ERROR] ", error)
        return res.statsu(500).json({message: "RESET PW ERROR"})
    }


}


//Solicitud de cambio de contraseña
async function pwChangeMail(req, res){
    try {
        const email = req.body.email
        const user = await findByEmail(email) //cambiar

        if (!user) {
            return res.status(404).json({ message: 'No se encontró un usuario con este correo electrónico.' })
        }
        
        //Se genera un token aleatorio
        const token = crypto.randomBytes(20).toString('hex')
        passwordResetTokens[token] = user.id

        //Configuracion del mail
        const mailOptions = {
            from: 'tu_correo@gmail.com',
            to: email,
            subject: 'Recuperación de contraseña',
            text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: http://127.0.0.1:5500/pages/recuperacion.html/${token}`,
        }

        //Envio de mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
            console.log(error)
            } else {
            console.log('Correo enviado: ' + info.response)
            }
        })

        res.status(200).json({message: `<h3 class="text-response" >Se ha enviado un correo con instrucciones para restablecer la contraseña.</h3>`})
    } catch (error) {
        console.log("[PW CHANGE MAIL ERROR] ", error)
        return res.status(500).json({message: "PW CHANGE MAIL ERROR"})
    }
}

async function sendResetPage(req, res){
    try {
        
        res.sendFile(path.join(__dirname, '../pages', 'recuperacion.html'));
    } catch (error) {
        console.log("[SEND RESET PAGE ERROR] ", error)
        return res.status(500).json( { message: "SEND RESET PAGE ERROR"})
    }



}




module.exports = {
    sendMail,
    resetPw,
    pwChangeMail,
    sendResetPage,
}