const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authToken = require("../routes/userAuth")
require("dotenv").config();

//Sign Up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        if (username.length <= 4) {
            return res.status(400).json({
                message: "Username length should be greater than 4",
            });
        }

        const existUser = await User.findOne({
            username: username,
        });
        if (existUser) {
            return res.status(400).json({
                message: "Username already exists",
            });
        }

        const existMail = await User.findOne({
            email: email,
        });
        if (existMail) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }

        if (password.length <= 5) {
            return res.status(400).json({
                message: "Password length should be greater than 5",
            });
        }

        const hashPass = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            email: email,
            password: hashPass,
            address: address,
        });
        await newUser.save();

        return res.status(200).json({
            message: "SignUp Successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

//Sign In
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        const existUser = await User.findOne({ username });
        if (!existUser) {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }

        bcrypt.compare(password, existUser.password, (err, data) => {
            if (data) {
                const authClaims = [
                    { name : existUser.username },
                    { role : existUser.role }
                ];

                const token = jwt.sign({ authClaims },process.env.TOKEN,{
                    expiresIn:"30d",
                });

                return res.status(200).json({
                    id : existUser._id ,
                    role : existUser.role ,
                    token : token,
                    message : "SignIn Succesfull"
                });
            } else {
                return res.status(400).json({
                    message: "Invalid Credentials",
                });
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

//Get User Info
router.get("/user-info", authToken, async (req,res) =>{
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select("-password");
        return res
        .status(200)
        .json(data);
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

//update user-address
router.put("/update-address", authToken, async (req,res) =>{
    try {
        const { id } = req.headers;
        const { address } = req.body;
        if (address == null)
        {
            return res.status(400).json({
            message: "Enter address to update",
            });
        }
        await User.findByIdAndUpdate(id, { address:address});
        return res
        .status(200)
        .json( { message:"Updated address succesfully" });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

module.exports = router;
