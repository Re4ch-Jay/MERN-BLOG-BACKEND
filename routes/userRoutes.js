const router = require('express').Router()
const {GET_USER, DELETE_USER, UPDATE_USER} = require('../controller/userControllers')


router.get('/:id', GET_USER);
router.delete('/:id', DELETE_USER);
router.put('/:id', UPDATE_USER);

module.exports = router