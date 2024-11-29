const express = require('express')
const admin = express.Router()
const adminController =require("../controller/adminController")
const adminAuth = require("../middleware/adminAuth")




admin.get("/login",adminAuth.isLogin, adminController.loadLogin)
admin.post("/login",adminController.login)
admin.get("/dashboard",adminAuth.checkSession, adminController.loadDashboard)
admin.post("/edit-user",adminAuth.checkSession, adminController.editUser)
admin.get("/delete-user/:id",adminAuth.checkSession, adminController.deleteUser)
admin.post("/add-user",adminAuth.checkSession, adminController.addUser)
admin.get("/logout",adminAuth.checkSession, adminController.logout)
admin.get("/search", adminAuth.checkSession, adminController.loadSearch)

module.exports = admin;  