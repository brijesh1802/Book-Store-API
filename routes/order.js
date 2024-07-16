const router = require("express").Router();
const User = require("../models/user");
const Order = require("../models/order");
const authToken = require("../routes/userAuth");

//place order
router.post("/place-order", authToken, async (req,res) => {

    try {
        const { id } = req.headers;
        const { order } = req.body;
        for(const orderData of order)
        {
            const newOrder = new Order({
                user: id, book: orderData._id
            });
            const orderDataFromDb = await newOrder.save();

            //saving Order in user model
            await User.findByIdAndUpdate(id,{
                $push:{ orders: orderDataFromDb._id }
            });

            //clearing cart
            await User.findByIdAndUpdate(id,{
                $pull: { cart: orderData._id }
            });
        }
        return res
        .status(500)
        .json({
            message:"Order Placed Succesfully"
        });
    } catch (error) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

//order of particular user
router.get("/get-order-history", authToken, async (req,res) =>{
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate : { path: "book" }
        });

        const ordersData = userData.orders.reverse();
        return res
        .status(500)
        .json({
            data: ordersData
        });
    } catch (error) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

//get all orders --admin
router.get("/get-all-orders", authToken, async (req,res) =>{
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if(user.role !== "admin")
        {
            return res.status(400).json({
                message: "Access Denied",
            });
        }
        const userData = await Order.find()
        .populate({
            path: "book"
        })
        .populate({
            path: "user"
        })
        .sort({
            createdAt: -1 
        });
        return res
        .status(500)
        .json({
            data: userData
        });
    } catch (error) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

//update order --admin
router.get("/update-order-status/:id", authToken, async (req,res) =>{
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if(user.role !== "admin")
        {
            return res.status(400).json({
                message: "Access Denied",
            });
        }
        await Order.findByIdAndUpdate(id , {
            status: req.body.status 
        });
        return res
        .status(500)
        .json({
            message:"Status updated succesfully"
        });
    } catch (error) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = router;