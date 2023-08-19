const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const bookrouter = require("./routes/BookRoute");
const userRouter = require("./routes/UserRouter")
// const proxy = require('express-http-proxy');
const proxy= require('http-proxy-middleware');


const PORT = process.env.PORT || 5000

// middlewares
const app = express();
// http-proxy-middleware
app.use('/proxy',{
    pathRewrite:{'^/proxy/':'/'},
    target: 'http://localhost:3000',
    changeOrigin: true,
    secure:true
}   
);

// http-express proxy
// app.use('/proxy', proxy("http://localhost:3000"))
app.use(cors({
    credentials: true, 
    origin:"http://localhost:3000",
}));
app.use(express.json());
app.use(cookieParser())
app.use(express.static('public'))

// connect to database
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("mongo db connected successfully"))
.catch(error => console.log(error))


app.get('/', (req, res) => {
    res.json('hello');
});

// routes
app.use(bookrouter)
app.use(userRouter)



// listen to server
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))