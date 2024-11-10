const express = require('express')
const admin = express.Router()

admin.get("/login",(req,res)=>{
         res.send("hi from admin page")
})


module.exports = admin