const userModel = require("../models/UserModel")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRETE_KEY = process.env.JWT_SECRETE_KEY;

exports.signUp = async(req, res, next) => {
    const {name, email, password} = req.body;

    // check if user already existed
    let existingUser;

    try {
        existingUser = await userModel.findOne(email)
    } catch (err) {
        console.log(err)
    }

    if(existingUser){
        return res.status(400).json({msg: "user with same credentails already existing"})
    }

    // hashing password
    const hashedPassword = bcrypt.hashSync(password)

    // saving data to database

    const user = userModel({name, email, password:hashedPassword})

    try {
        await user.save()
    } catch (err) {
        console.log(err)
    }
    return res.status(201).json({msg:"signup successfull", user:user})
}


exports.login = async(req, res, next) => {
    const {email, password} = req.body

    // check if user has an account
    let existingUser;

    try {
        existingUser = await userModel.findOne({email:email})
    } catch (error) {
        console.log(error)
    }

    if(!existingUser){
        return res.status(400).json({msg:"user does not exist"})
    }

    // compare password
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if(!isPasswordCorrect) return res.status(400).json({msg:"invalid username/password"})
        
    // auhthenticating token
    const token = jwt.sign({id:existingUser._id}, JWT_SECRETE_KEY, {expiresIn: "45s"})

    // console.log("Generated Token\n", token);

    // checking if cookies already exist

    if(req.cookies[`${existingUser._id}`]){
        req.cookies[`${existingUser._id}`]  = ""
    }

    // setting coookie
    res.cookie(String(existingUser._id), token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 45),
        httpOnly: true,
        sameSite: "lax"
    })

    return res
            .status(200)
            .json({msg: "Login successfull", user:existingUser, token})
}


exports.verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    // console.log(cookies)
    const token = cookies.split("=")[1];
    // console.log(token)

    if(!token){
        return res.status(404).json({message:'no token found'})
    }
    
    jwt.verify(String(token),JWT_SECRETE_KEY, (err, user) => {
        if(err){
          return  res.status(400).json({message:'Invalid Token'})
        }
        // console.log(user.id)
        req.id = user.id
    });
    next()
}


exports.getUser =async (req, res, next) => {
    const userId = req.id
    let user;

    try {
        user = await userModel.findById(userId, "-password");
    } catch (err) {
       console.log(err)
    }

    if(!user){
        return res.status(404).json({message:'User not found'})
    }
        return res.status(200).json({user})
};



exports.refreshToken = (req, res, next) => {
    const cookies = req.headers.cookie
    const prevToken = cookies.split("=")[1]

    if(!prevToken){
        return res.status(400).json({msg:"Token not found"})
    }

    jwt.verify(String(prevToken), JWT_SECRETE_KEY, (err, user) => {
        if(err){
            return res.status(403).json({msg:"Authentication failed"})
        }
        
        res.clearCookie(`${user.id}`)
        req.cookies[`${user.id}`] = " "

        // token
        const token = jwt.sign({id:user.id}, JWT_SECRETE_KEY, {expiresIn:"45s"})

        // console.log(token)

        // setting cookies
    
        res.cookie(String(user.id), token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 45),
            httpOnly: true,
            sameSite: "lax"
        })

        req.id = user.id;    
        next()
    })   
}



exports.logOut = async(req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];

    if(!prevToken){
        return res.status(400).json({msg:"No token found"})
    };

    // verify token if it exist
    jwt.verify(String(prevToken), JWT_SECRETE_KEY, (err, user) => {
        if(err){
            return res.status(400).json({msg:"Token verification failed"})
        }

        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";
        return res.status(200).json({msg:"Logout successfully"})
    })
}