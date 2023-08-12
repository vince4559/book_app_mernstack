const bookModel = require('../models/BookModel')

// get all books
exports.getAllBooks = async(req, res, next) => {
    let books;
    try {
        books= await bookModel.find()
    } catch (error) {
        console.log(error)
    }

    if(!books){
        return res.status(404).json({msg:'books not found'})
    }else{
        return res.status(200).json({books})
    }
}

// add books to database
exports.addBook = async(req, res, next) => {
    
    const photo = req.files.photo[0].filename;
    const ebook = req.files.ebook[0].filename;


    let book;
    try {
        book = await bookModel.create({...req.body, photo, ebook})
    } catch (error) {
        console.log(error)
    }

    if(!book){
        return res.status(404).json({msg:'book not  saved successfully'})
    }else{
        return res.status(201).json({msg:'books saved successfully', book})
    }
}

// get a book by id
exports.getBookById = async(req, res, next) => {
    let book;
    const id = req.params.id;
    try {
        book = await bookModel.findById(id)
    } catch (error) {
        console.log(error)
    }
    if(!book){
        return res.status(404).json({msg:"book cannot be found"})
    }else{
        return res.status(201).json({book})
    }
}

// update a book by id
exports.updateBookById = async(req, res, next) => {
    let book;
    const id = req.params.id;

    try {
        book = await bookModel.findByIdAndUpdate(id, {...req.body})
    } catch (error) {
        console.log(error)
    }
    
    if(!book){
        return res.status(404).json({msg:"book cannot be updated"})
    }else{
        return res.status(201).json({msg:'book updated successfully'})
    }
}


// delete a book by id
exports.deleteBookById = async(req, res, next) => {
    let book;
    const id = req.params.id;

    try {
        book = await bookModel.findByIdAndRemove(id)
    } catch (error) {
        console.log(error)
    }
    
    if(!book){
        return res.status(404).json({msg:"book cannot be deleted"})
    }else{
        return res.status(201).json({msg:'book deleted successfully'})
    }
}


