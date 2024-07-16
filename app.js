const express = require("express");
const app = express();
require("dotenv").config();
require("./connection/conn");
const User = require("./routes/user");
const Book = require("./routes/book");
const Favourite = require("./routes/favourites");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

// Middleware to parse JSON bodies
app.use(express.json());

//routes
app.use("/api/v1",Book);
app.use("/api/v1",User);
app.use("/api/v1",Favourite);
app.use("/api/v1",Cart);
app.use("/api/v1",Order);

//creating port
app.listen(process.env.PORT,()=>{
    console.log(`Server started at port ${process.env.PORT}`);
});