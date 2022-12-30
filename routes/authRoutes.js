const router = require('express').Router()
const {LOGIN, REGISTER} = require("../controller/authControllers")


// Register

router.post('/register', REGISTER);

// login
router.post('/login', LOGIN)

module.exports = router