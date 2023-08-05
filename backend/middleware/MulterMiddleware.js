const multer = require("multer")
const {v4: uuidv4} = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/photos")
    },

    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}_${path.extname(file.originalname)}`)
    },

})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/PNG"] 
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true)
    }else {
        cb(null, false)
    }
}

const uploadMiddleware = multer({storage, fileFilter});
module.exports = uploadMiddleware
