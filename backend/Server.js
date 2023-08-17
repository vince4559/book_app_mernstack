const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const bookrouter = require("./routes/BookRoute");
const userRouter = require("./routes/UserRouter")

const PORT = process.env.PORT || 5000

// middlewares
const app = express();
app.use(cors({credentials: true, origin:'https://book-app-mernstack-oe2f.vercel.app/'}))
app.use(express.json());
app.use(cookieParser())
app.use(express.static('public'))

// connect to database
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("mongo db connected successfully"))
.catch(error => console.log(error))


// routes
app.use('/api',bookrouter)
app.use('/auth', userRouter)

// listen to server
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))