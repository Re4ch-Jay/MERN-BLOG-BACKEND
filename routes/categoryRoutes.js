const router = require('express').Router()
const {POST_CATEGORY, GET_CATEGORY} = require('../controller/categoryControllers')

router.post("/", POST_CATEGORY)   
router.get("/", GET_CATEGORY)   
module.exports = router;