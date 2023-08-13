const express = require('express');
const { signUp, login, verifyToken, getUser, logOut, refreshToken } = require('../controllers/UserController');

const userRouter = express.Router();

userRouter.post('/signup', signUp)
userRouter.post('/login', login)
userRouter.get('/user', verifyToken, getUser)
userRouter.get('/refresh',refreshToken, verifyToken, getUser)
userRouter.post('/logout',verifyToken, logOut)


module.exports = userRouter