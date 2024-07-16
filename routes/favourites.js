const router = require("express").Router();
const User = require("../models/user");
const authToken = require("../routes/userAuth");

//add book to favourites
router.put("/add-to-fav", authToken, async (req,res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFav = userData.favourites.includes(bookid);
        if(isBookFav)
        {
            return res
            .status(200)
            .json({
                message:"Book is already in favourites"
            });
        }
        await User.findByIdAndUpdate(id, {$push: { favourites:bookid}});
        return res
            .status(200)
            .json({
                message:"Book added to favourites"
            });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

//remove book from favourites
router.put("/remove-from-fav", authToken, async (req,res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFav = userData.favourites.includes(bookid);
        if(isBookFav)
        {
            await User.findByIdAndUpdate(id, {$pull: { favourites:bookid}});
        }
        
        return res
            .status(200)
            .json({
                message:"Book removed from favourites"
            });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

//get fav books of a particular user
router.get("/get-fav-user", authToken, async (req, res) => {
    try {
        const { id } = req.headers;

        // Validate the ID
        if (!id) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        // Fetch the user and populate favourites
        const userData = await User.findById(id).populate("favourites");

        // Check if user data is found
        if (!userData) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Extract the favorite books
        const favBooks = userData.favourites;

        // Return the favorite books
        return res.status(200).json({
            data: favBooks
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = router;