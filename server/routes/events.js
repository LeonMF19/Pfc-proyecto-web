const express = require("express")
const {Router} = express
const router = Router()

const eventController = require("../controller/eventsController")


router.get("/get", eventController.getEvents)

router.post("/createEvent", eventController.createEvent)

//funciona
router.get("/test", (req, res) =>{
    console.log("hola")
})

module.exports = router