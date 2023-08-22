const express = require("express")
const {Router} = express
const router = Router()

const { login, logout, createFighterProfile, register, getUser, getUserProfile } = require("../controller/userController")
const { checkAuthenticated, passport } = require("../security/passport")

router.get("/", () => {
    console.log("dsadasdas")
})

router.post("/register", register, passport.authenticate("auth"))

router.post("/login", passport.authenticate("auth"), login)

router.post("/logout", logout)

router.get("/get", getUser)

router.get("/getP", getUserProfile)

router.post("/fighterProfile", checkAuthenticated, createFighterProfile)



module.exports = router