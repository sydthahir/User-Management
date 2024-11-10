const express = require('express')
const user = express.Router()
// const { body, validationResult } = require('express-validator')
const userController = require("../controller/userController")



// const username = 'admin'
// const password = 'admin@321'

user.use(express.static('public'));

user.get("/login", userController.loadLogin)

user.post('/login', userController.login)

user.get("/signup", userController.loadSignup)

user.post("/signup", userController.registerUser)








// user.get('/', (req, res) => {
//     if (req.session.user) {
//         res.render('home')
//     } else {

//         if (req.session.passwordwrong) {
//             res.render('login', { msg: 'Invalid Credentials' })
//             req.session.passwordwrong = false
//         } else {
//             res.render('login')
//         }
//     }

// })




// user.post('/verify',

//     [body('username').notEmpty().withMessage('Username is required'),
//     body('password').notEmpty().withMessage('Password is required')],
//     // body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')],


//     (req, res) => {
//         console.log(req.body);
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {

//             return res.render('login', { msg: errors.array()[0].msg });

//         }
//         if (req.body.username === username && req.body.password === password) {

//             req.session.user = req.body.username
//             res.redirect('/home')

//         }
//         else {

//             req.session.passwordwrong = true
//             res.redirect('/')
//         }

//     })


// user.get('/home', (req, res) => {
//     if (req.session.user) {
//         res.render('home')
//     } else {
//         if (req.session.passwordwrong) {
//             req.session.passwordwrong = false
//             res.render('login', { msg: 'Invalid Credentials' })
//         } else {
//             res.render('login')
//         }

//     }

// })



// user.get('/logout', (req, res) => {
//     req.session.destroy()
//     res.render('login', { msg: 'Logged Out' })
// })


// user.get("/signup",(req, res)=>{
//     res.render("signup") 
// })
// user.post("/signup",async(req, res)=>{
//     console.log(req.body);


//   const data  ={
//         name: req.body.username,
//         password: req.body.password 
//   }
//   const extistingUser = await collection.findOne({name:data.name})
//     if(extistingUser){
//         res.send("User already exists.Please choose a diiferent ")
//     }

//      const userData = await collection.insertMany(data)
//      console.log(userData);

// res.render("/home")
// })











module.exports = user;