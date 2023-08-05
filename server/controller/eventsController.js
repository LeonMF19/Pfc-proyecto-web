const Events = require("../models/eventsModel")


async function getEvents(req, res){
    try {
        const data = await Events.find()
        console.log("EVENT DATA ", data)
        return res.status(200).json(data)
    } catch (error) {
        console.log("[GET EVENTS ERROR] ", error)
        return res.status(500).json( {message: "GET EVENT ERROR ", error})
    }
}

async function createEvent(req, res){
    try {
        const data = req.body
        console.log("EVENTS DATA ", data)

        const result = await Events.create(data)


        return res.status(201).json(result)
    } catch (error) {
        console.log("[CREATE EVENT ERROR] ", error)
        return res.status(500).json( { message: "[CREATE EVENT ERROR] ", error})
    }


}


module.exports = {
    getEvents,
    createEvent,
}