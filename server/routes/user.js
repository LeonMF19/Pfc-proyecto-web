const express = require("express")
const {Router} = express
const router = Router()

const { login, logout } = require("../controller/userController")


router.post("/login", login)

router.post("/logout", logout)


module.exports = router