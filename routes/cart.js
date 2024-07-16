const router = require("express").Router();
const User = require("../models/user");
const authToken = require("../routes/userAuth");


//add to cart
router.put("/add-to-cart", authToken, async (req,res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(bookid);
        if(isBookInCart)
        {
            return res
            .status(200)
            .json({
                message:"Book is already in cart"
            });
        }
        await User.findByIdAndUpdate(id, {$push: { cart:bookid}});
        return res
            .status(200)
            .json({
                message:"Book added to cart"
            });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

//remove from cart
router.put("/remove-from-cart/:bookid", authToken, async (req,res) => {
    try {
        const { bookid } = req.params;
        const { id } = req.headers;
        await User.findByIdAndUpdate(id, {
            $pull: { cart:bookid },
        });
        return res
            .status(200)
            .json({
                message:"Book removed from cart"
            });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

//get all books in cart
router.get("/get-cart-user", authToken, async (req, res) => {
    try {
        const { id } = req.headers;

        // Fetch the user and populate favourites
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();

        // Return the favorite books
        return res.status(200).json({
            data: cart
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = router;