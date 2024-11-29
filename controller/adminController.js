const adminSchema = require("../model/adminModel")
const bcrypt = require("bcryptjs")
const LoginSchema = require("../model/userModel")



const loadLogin = async (req, res) => {
    res.render("admin/login")
}

const login = async (req, res) => {
    try {

        // Acquiring data from login-page
        const { username, email, password } = req.body
        
        //  Finding email from DB
        const admin = await adminSchema.findOne({ email })
        if (!admin) return res.render("admin/login", { message: "Invalid Credentials" })
         
        //  Compare pswrd with DB hashed pswrd    
        const isDecrypt = await bcrypt.compare(password, admin.password)
        if (!isDecrypt) return res.render("admin/login", { message: "Invalid Credentials" })

        req.session.admin = true;
        
        res.redirect("/admin/dashboard")

    } catch (error) {
        console.log(error)
    }
}
const loadDashboard = async (req, res) => {

    try {
        // Session handling
        const admin = req.session.admin
        if (!admin) return res.redirect("/admin/login")
         
        // Fetching users from DB
        const users = await LoginSchema.find({})
        res.render("admin/dashboard", { users })

    } catch (error) {
        console.log(error)
        res.redirect("/admin/login");
    }
}

const editUser = async (req, res) => {
    try {

        const { id, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)


        const user = await LoginSchema.findOneAndUpdate({ _id: id },
            { $set: { email, password: hashedPassword } },
            { new: true })
        console.log(user)


        res.render("admin/dashboard", { message: "User updated successfully", users: allUsers })


    } catch (error) {
        console.log(error)
        res.redirect("/admin/dashboard")
    }


}

const deleteUser = async (req, res) => {
    try {


        const { id } = req.params

        const user = await LoginSchema.findOneAndDelete({ _id: id })

        res.redirect("/admin/dashboard")

    } catch (error) {
        console.log(error);

    }

}

const addUser = async (req, res) => {
    try {
        console.log("Add User Function Triggered");
        const { email, password, username } = req.body
        const existingUser = await LoginSchema.findOne({ email })
        var users = await LoginSchema.find({});
        if (existingUser){
           
        return res.render("admin/dashboard",{message:"user already exists", users})
    }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new LoginSchema({
            email,
            password: hashedPassword,
            username
        })
        
        await newUser.save()

        var users = await LoginSchema.find({});
        res.render("admin/dashboard", { message: "User added successfully", users });



    } catch (error) {
        console.log(error);
        res.render("admin/dashboard", { message: "Error adding user" });


    }
}

const logout = async (req, res) => {
    console.log("logout function triggered")
    req.session.admin = null
    res.redirect("/admin/login")
}


const loadSearch = async (req, res) => {
    try {

        // Check  admin is logged in
        const admin = req.session.admin;
        if (!admin) return res.redirect("/admin/login");


        let searchQuery = req.query.search ? req.query.search.trim() : '';
        let users;


        if (searchQuery) {
            searchQuery = searchQuery.replace(/[^\w\s@.]/gi, '')

            if (searchQuery.includes("@")) {
                users = await LoginSchema.find({ email: searchQuery })


            } else {
                users = await LoginSchema.find({
                    username: new RegExp(searchQuery, "i")
                })
            }
        } else {
            users = await LoginSchema.find({});
        }
        res.render("admin/dashboard", { users, message: req.query.message })

    } catch (error) {
        console.log(error)
        res.redirect("/admin/login")

    }
}
 




module.exports = { loadLogin, login, loadDashboard, editUser, deleteUser, addUser, logout, loadSearch }  