const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const bookrouter = require("./routes/BookRoute");

const PORT = process.env.PORT || 5000

// middlewares
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static('public'))

// connect to database
mongoose.connect(process.env.MONGOOSE)
.then(() => console.log("mongo db connected successfully"))
.catch(err => console.log(err))


// routes
app.use('/api',bookrouter)


// listen to server
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))