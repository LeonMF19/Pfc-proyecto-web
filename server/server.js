//Configuracion del servidor backend 
const express = require("express")
const http = require("http")

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))


const userRouter = require("./routes/user")
const mailRouter = require("./routes/mails")

app.use("/api/users", userRouter)
app.use("/api/mails", mailRouter)









const server = http.createServer(app)
server.listen(PORT, () =>{
    console.log("Server running port ", PORT)
})

server.on("error", () =>{
    console.log("Something failed ", "error")
})