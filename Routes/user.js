const express = require('express')
const user = express.Router()
// const { body, validationResult } = require('express-validator')
const userController = require("../controller/userController")
const auth = require("../middleware/auth")



user.get("/login", auth.isLogin, userController.loadLogin)

user.post('/login', userController.login)

user.get("/signup", auth.isLogin, userController.loadSignup)

user.post("/signup", userController.registerUser)

user.get("/home", auth.checkSession, userController.loadHome)
 
user.get("/logout",auth.checkSession, userController.logout)










module.exports = user;