const mongoose = require("mongoose")


const eventsSchema = new mongoose.Schema({
    eventOrg: {type: String, required: true},
    logoCompetition: {type: Buffer, required: false},
    eventName: {type: String, required: true},
    eventDate: {type: Date, required: true},
    eventModality: {type: String, required: true},
    eventAdress: {type: String, required: true},
    eventWeighing: {type: String, required: true},
    eventDescription: {type: String, required: false}
})

eventsSchema.index({date: 1}, {expireAfterSeconds: 0})

const Events = mongoose.model("Events", eventsSchema)

module.exports = Events