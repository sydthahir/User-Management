const LoginSchema = require('../model/userModel')
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        console.log(email);
 
        const existingUser =await LoginSchema.findOne({email})
        // console.log(user);
        if(existingUser) 
            return res.render("user/signup",{message:"Email already exists"})
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new LoginSchema({
            username,
            email,
            password:hashedPassword,
 
        })   

        await newUser.save()

        res.render("user/login",{message:"Account created successfully"})

    } catch (error) { 

console.log("error found",error)
res.render("user/signup", { message: "An error occurred, please try again later" });

    }
}

const login = async (req,res)=>{
    try{
        const{username, email, password}= req.body

         const existingUser = await LoginSchema.findOne({username})
         console.log(existingUser);

    if(!existingUser) return res.render("user/login",{message:"User doesn't exist"})
        const isDecrypt =await bcrypt.compare(password,existingUser.password)
    
 
    if(!isDecrypt) return res.render("user/login",{message:"Incorrect password"})
        res.render("user/home",{message:"Login success"})
                
    }catch(error){
        res.render("user/login", { message: "An error occurred, please try again later" });
    }
}

const loadSignup = (req, res)=>{
    res.render("user/signup")
}


const loadLogin = (req,res)=>{
    res.render("user/login")
}



module.exports = { registerUser, loadSignup, loadLogin, login }