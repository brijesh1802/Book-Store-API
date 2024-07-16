const jwt  = require("jsonwebtoken");
require("dotenv").config();

const authToken = (req,res,next) =>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(token == null)
    {
        return res
        .status(401)
        .json({
            message:" Authentication Token Required"
        });
    }

    jwt.verify(token, process.env.TOKEN, (err,data) =>{
        if(err)
        {
            return res
            .status(400)
            .json({
                message:"Token expired, Please SignIn Again"
            });
        }
        req.data = data;
        next();
    });
};

module.exports = authToken ;