const router = require('express').Router()
const {GET_ALL_POSTS, GET_POST, DELETE_POST, UPDATE_POST, CREATE_POST} = require("../controller/postControllers")

router.post('/', CREATE_POST)
router.get('/', GET_ALL_POSTS);
router.get('/:id', GET_POST);
router.delete('/:id', DELETE_POST);
router.put('/:id', UPDATE_POST);

module.exports = router