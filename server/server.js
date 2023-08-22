//Configuracion del servidor backend 
const express = require("express")
const http = require("http")

const app = express()
const PORT = 8080

const cors = require("cors")

const mongoose = require("mongoose")
const DBconfig = require("./db/config")
const MongoStore = require("connect-mongo")

const {passport} = require("./security/passport")
const session = require("express-session")



async function connectDB(){
    try {
        await mongoose.connect(DBconfig.URI)
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.log("MONGO CONNECT ERROR ", error)
    }
}

//Configuracion de la sesión
const sessionOpts = {
    secret: "shhh",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: DBconfig.URI,
        dbName: "test",
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 
    }
}




//Middlewares globales
app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(passport.initialize())
app.use(session(sessionOpts))
app.use(passport.session())

//Configuración de rutas
const userRouter = require("./routes/user")
const mailRouter = require("./routes/mails")
const eventRouter = require("./routes/events")

app.use("/api/users", userRouter)
app.use("/api/mails", mailRouter)
app.use("/api/events", eventRouter)

//Inicio del servidor
const server = http.createServer(app)
server.listen(PORT, () =>{
    console.log("Server running port ", PORT)
})

server.on("error", () =>{
    console.log("Something failed ", "error")
})
connectDB()