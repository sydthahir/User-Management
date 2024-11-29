const mongoose=require("mongoose")
const connect = async() => {
    try{
       
        const conn= await mongoose.connect("mongodb://localhost:27017/Login_Signup",{})
        console.log("MongoDB Connected Successfully");
    }catch(error){

        console.log(error);
        process.exit(1);

    }

    
};

 
module.exports =connect
