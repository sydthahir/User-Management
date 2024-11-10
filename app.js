
const express = require('express')
const app = express()
const hbs = require('hbs');
const session = require('express-session')
const nocache = require('nocache')
const userRoute = require('./Routes/user');
const adminRoute = require("./Routes/admin")
const connect = require("./db/connect")
const path = require("path")



// Set handlebars as the view engine
app.set("views",path.join(__dirname,"views"))
app.set('view engine', 'hbs')

app.use(express.static('public'));



app.use(express.json())
app.use(express.urlencoded({extended:true }))


app.use(session({
    secret: 'keyboard-cat',
    resave: false,
    saveUninitialized: true
}))

// No-cache middleware 
app.use(nocache())



app.use('/user', userRoute)
app.use('/admin',adminRoute)
connect();
 


app.listen(3003, () => console.log("Port Connected \n Server running on port 3003"))


