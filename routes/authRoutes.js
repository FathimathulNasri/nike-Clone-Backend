const express = require("express");
const { register, login, getUser,getAllUsers } = require("../controllers/authController");
const {authMiddleware,adminMiddleware} =require('../middleware/authMiddleware')

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get('/getUser',authMiddleware, getUser)
router.get('/users',authMiddleware,adminMiddleware, getAllUsers)
module.exports = router;
