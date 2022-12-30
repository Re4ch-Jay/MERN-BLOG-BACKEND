const User = require('../models/User')
const Post = require("../models/Post")
const bcrypt = require('bcrypt')
const {isEmail, isStrongPassword} = require("validator")

// GET
const GET_USER = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findById(id);
        if(!user) throw Error("There is no user with this ID");
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}

// UPDATE

const UPDATE_USER = async (req, res) => {
    const {id} = req.params;
    const {password, userId, email} = req.body;
    if(userId === id) {
        try {
            if(!email) return;
            if(!isEmail(email)) throw Error("Email must be valid")
            if(!isStrongPassword(password)) throw Error("Password must be strong")
            if(password) {
                const salt = await bcrypt.genSalt()
                req.body.password = await bcrypt.hash(password, salt);
            }
            const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true})
            res.status(200).json(updatedUser);
        } catch (error) {
            console.log(error)
            res.status(500).json({error: error.message})
        }
    }else{
        res.status(401).json("You can update only your account")
    }
    
}

// Delete

const DELETE_USER = async (req, res) => {
    const {id} = req.params;
    const {userId} = req.body;
    if(userId === id) {
        try {
            const user = await User.findById(id);
            try {
                await Post.deleteMany({username: user.username})
                await User.findByIdAndDelete(id);
                res.status(200).json("User has been deleted");
            } catch (error) {
                console.log(error)
                res.status(500).json({error: error.message})
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({error: error.message})
        }
       
    }else{
        res.status(400).json("You can delete only your account")
    }
    
}


module.exports = {GET_USER, UPDATE_USER, DELETE_USER}