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

const uploadMiddleware = multer({storage});
module.exports = uploadMiddleware



// allowedFiles:function(req, file, cb) {
//     // Accept images only
//     if (!file.originalname.match(/\.(pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//         req.fileValidationError = 'Only pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF file type are allowed!';
//         return cb(new Error('Only pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF file type  are allowed!'), false);
//     }
//     cb(null, true);
// }
