
const express = require('express')
const app = express()
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
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


// Converting to json 
app.use(express.json())
app.use(express.urlencoded({extended:true }))

// No-cache middleware 
app.use(nocache())

// Session handle middleware  
app.use(session({
    secret: 'keyboard-cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000* 60 * 30,
    }
}))



app.use('/user', userRoute)
app.use('/admin',adminRoute)

// connecting with mongoDB
connect();
 

// Port assigning
app.listen(3003, () => console.log("Port Connected \nServer running on port 3003"))


