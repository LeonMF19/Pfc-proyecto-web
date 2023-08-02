const mongoose = require("mongoose")

// Define el esquema para el fighterProfile
const fighterProfileSchema = new mongoose.Schema({
    name: {type: String, required: true},
    school: {type: String, required: true},
    professor: {type: String, required: true},
    gender: {type: String, enum: ["hombre", "mujer"], required: true},
    age: {type: Number, required: true},
    fights: {type: Number, required: true},
    category: {type: Number, required: true},
    terms: {type: Boolean, required: true}
});

// Define el esquema para el usuario con referencia al fighterProfile opcional
const profileSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    fighterProfile: [fighterProfileSchema]
});

const Profile = mongoose.model("Profile", profileSchema)

module.exports = Profile