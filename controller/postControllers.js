const Post = require("../models/Post")

// create post
const CREATE_POST = async (req, res) => {
    const {username, title, desc} = req.body;
    const newPost = new Post(req.body);
    try {
        if(!username && !title && !desc) throw Error("Username, title, and description is required");
        if(!username) throw Error("Username is required");
        if(!title) throw Error("Title is required");
        if(!desc) throw Error("Description is required");
        
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
}

// GET
const GET_POST = async (req, res) => {
    const {id} = req.params;
    try {
        const post = await Post.findById(id);
        if(!post) throw Error("There is no post with this ID");
        res.status(200).json(post);
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}

// Get all post and query
const GET_ALL_POSTS = async (req, res) => {
    const username = req.query.username;
    const catName = req.query.category;
    const title = req.query.title;
    try {
        let posts;
        if(username) {
            posts = await Post.find({username})
        }else if(catName) {
            posts = await Post.find({categories: {$in: [catName]}})
        }else if(title) {
            posts = await Post.find({title})
        }
        else{
            posts = await Post.find();
        }
        if(!posts) throw Error("Cannot find posts");
        res.status(200).json(posts);
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}
// UPDATE
const UPDATE_POST = async (req, res) => {
    const {id} = req.params;
    try {
        const post = await Post.findById(id)
        if(post.username === req.body.username){
            try {
                const updatedPost = await Post.findByIdAndUpdate(id, req.body, {new: true})
                res.status(200).json(updatedPost)
            } catch (error) {
                console.log(error)
                res.status(400).json({error: error.message})
            }
        }else{
            res.status(401).json("You can update only your post")
        } 
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

// Delete
const DELETE_POST = async (req, res) => {
    const {id} = req.params;
    try {
        const post = await Post.findById(id)
        if(post.username === req.body.username){
            try {
                await post.delete()
                res.status(200).json("Delted post")
            } catch (error) {
                console.log(error)
                res.status(400).json({error: error.message})
            }
        }else{
            res.status(401).json("You can delete only your post")
        } 
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}


module.exports = {CREATE_POST, GET_POST, GET_ALL_POSTS, DELETE_POST, UPDATE_POST}