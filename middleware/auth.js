const checkSession = (req, res, next)=>{
 if (req.session.existingUser){
    next()
 }else{
    res.redirect("/user/login")
 }

}


const isLogin = (req, res, next)=>{
    if(req.session.existingUser){
        res.redirect("/user/home") 
    }else{
        next()
    }
}

module.exports = {checkSession,  isLogin}