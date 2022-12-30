require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const app = express();
const path = require('path')

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes")
const categories = require("./routes/categoryRoutes")
const upload = require("./routes/uploadRoutes")

app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")))
mongoose.set('strictQuery', false);
// connect to db
mongoose.connect(process.env.MONGO_URL)
    .then(res => {
        app.listen(process.env.PORT, () => {
            console.log('Server is running on Port ' + process.env.PORT + ' connected to db')
        })
    })
    .catch(err => {
        console.log(err)
    })


app.use("/api/upload", upload)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/categories', categories)