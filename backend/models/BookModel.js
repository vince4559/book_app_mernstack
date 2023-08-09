const mongoose = require('mongoose');

const bookModel = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require: true,
    },
    name:{
        type:String,
        require: true,
    },
    author:{
        type:String,
        require: true,
    },
    description:{
        type:String,
        require: true,
    },
    price:{
        type:Number,
        require: true,
    },
    available:{
        type:Boolean,
    },
    photo:{
        type:String,
        require: true,
    },
    category:{
        type:String,
        require: true,
    },
    ebook:{
        type:String,
        
    }
},{timestamps:true})

module.exports = mongoose.model('book', bookModel)