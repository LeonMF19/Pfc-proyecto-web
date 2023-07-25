const express = require("express")
const {Router} = express
const router = Router()

const { login, logout, createFighterProfile } = require("../controller/userController")


router.post("/login", login)

router.post("/logout", logout)

router.post("/fighterProfile", createFighterProfile)


module.exports = router