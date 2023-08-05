
const express = require("express");
const uploadMiddleware = require("../middleware/MulterMiddleware");
const { addBook, getAllBooks, getBookById, updateBookById, deleteBookById } = require("../controllers/BookController");
const bookrouter = express.Router();


bookrouter.post('/savebook',uploadMiddleware.single('photo'), addBook)
bookrouter.get('/books', getAllBooks)
bookrouter.get('/books/:id', getBookById)
bookrouter.put('/updatebook/:id', updateBookById)
bookrouter.delete('/deletebook/:id', deleteBookById)

module.exports = bookrouter