const Category = require('../models/Category')

const POST_CATEGORY = async (req, res) => {
    
    try {
        const newCat = new Category(req.body);
        const category = await newCat.save();
        res.status(200).json(category)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
}

const GET_CATEGORY = async (req, res) => {
    try {
        const category = await Category.find();
        if(!category) throw Error("There is no category");
        res.status(200).json(category)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
}

module.exports = {POST_CATEGORY, GET_CATEGORY}