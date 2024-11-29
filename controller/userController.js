const LoginSchema = require('../model/userModel')
const bcrypt = require('bcryptjs');


// Registering new user on DB
const registerUser = async (req, res) => {
    try {

    // Acquiring data from Signup page
        const { username, email, password } = req.body
        
         // Matching with email
        const existingUser = await LoginSchema.findOne({ email })
            if (existingUser)
            return res.render("user/signup", { message: "Email already exists" })

        // Password hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating new data on databse
        const newUser = new LoginSchema({
            username,
            email,
            password: hashedPassword,

        })
        await newUser.save()

        res.render("user/login", { message: "Account created successfully" })

    } catch (error) {

        console.log(error)
        res.render("user/signup", { message: "An error occurred, please try again later" });

    }
}

// Login Validation and Rendering
const login = async (req, res) => {
    try {

        // Acquiring passing valuses through the login form
        const { username, email, password } = req.body


        // Matching with email
        const existingUser = await LoginSchema.findOne({ email })
        console.log(existingUser);
        if (!existingUser) return res.render("user/login", { message: "User doesn't exist" })

        // Password decrypting and matching
        const isDecrypt = await bcrypt.compare(password, existingUser.password)
        if (!isDecrypt) return res.render("user/login", { message: "Incorrect password" })
            
        req.session.existingUser = true
        req.session.user={
            password:existingUser.password,
            email: existingUser.email,
        }

        res.render("user/home", { message: "Login success" ,user:req.session.user })

    } catch (error) {
        res.render("user/login", { message: "An error occurred, please try again later" });
    }
}

// Loading signup-page
const loadSignup = (req, res) => {
    res.render("user/signup")
}

// Loading login-page
const loadLogin = (req, res) => {
    res.render("user/login")
}

//loading home-page
const loadHome = (req, res) => {
    res.render("user/home")
    
}

// Logout and rendering login
const logout = (req, res) => {
    req.session.destroy()
    res.redirect("/user/login")
}

module.exports = { registerUser, loadSignup, loadLogin, login, loadHome, logout }