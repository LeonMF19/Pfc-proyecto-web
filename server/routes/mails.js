const express = require("express")
const {Router} = express
const router = Router()

const nodemailer = require("nodemailer")
const { pwChangeMail, resetPw, sendResetPage } = require("../controller/mailsController")




router.post( "/enviar-mail", (req, res) => {

    const data = req.body

    //Configuracion del envío
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "mail@gmail.com",
            pass: "1234"
        }

    })

    
    const mailOpts = {
        from: email,
        to: "mail@gmail.com",
        subjet: "Formulario de Contacto PFC",
        text: "message"
    }

    //Envío de mail
    transporter.sendMail(mailOpts, (error, info) => {
        if(error){
            console.log("[TRANSPORTER ERROR] ", error)
            return res.status(500).json( {message: "Error al enviar correo electrónico"})
        }else{
            console.log("Mail sended", info.response)
            res.status(200).json({message: "Correo electrónico enviado con éxito"})

        }


    })


})



router.post("/recovery", pwChangeMail)

router.get("/reset/:token", sendResetPage)

router.post("/reset/:token", resetPw)  



module.exports = router



