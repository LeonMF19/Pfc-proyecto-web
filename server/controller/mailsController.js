const nodemailer = require('nodemailer');



async function sendMail(){
    try {
        // Configurar el transporte del correo
        const transporter = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
            user: 'tucorreo@gmail.com', // Es la cuenta desde la que se va a mandar el mail
            pass: 'tucontrasena', // Contraseña de la misma 
            },
        });
  
  
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





module.exports = {
    sendMail,
    
}