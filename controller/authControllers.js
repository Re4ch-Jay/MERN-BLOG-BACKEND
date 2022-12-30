const {isEmail, isStrongPassword} = require("validator")
const bcrypt = require("bcrypt")
const User = require('../models/User');

const REGISTER = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        
        if(!username && !email && password) throw Error("All fields are required")
        if(!username) throw Error("Username is required")
        if(!email) throw Error("Email is required")
        if(!password) throw Error("Password is required")

        // validate email and password

        if(!isEmail(email)) throw Error("Email must be valid")
        if(!isStrongPassword(password)) throw Error("Password must be strong")
 
        const isEmailExist = await User.findOne({email})
        if(isEmailExist) throw Error("This email is already existed")

        const isUsernameExist = await User.findOne({username})
        if(isUsernameExist) throw Error("This username is already existed")

        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)

        const user = await User.create({username, email, password: hash});

        res.status(200).json(user)

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

const LOGIN = async (req, res) => {
    const {password, username} = req.body;
    try {
        if(!username && password) throw Error("All fields are required")
        if(!username) throw Error("Username is required")
        if(!password) throw Error("Password is required")
        const user = await User.findOne({username});

        if(!user) throw Error("Incorrect username");

        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch) throw Error("Incorrect password");

        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

module.exports = {REGISTER, LOGIN}