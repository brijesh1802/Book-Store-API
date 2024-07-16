const mongoose = require("mongoose");

const user = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        avatar:{
            type:String,
            default:"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" 
        },
        role:{
            type:String,
            default:"user",
            enum:["user","admin"]
        },
        favourites:[
            {
                type:mongoose.Types.ObjectId,
                ref:"books"
            }
        ],
        cart:[
            {
                type:mongoose.Types.ObjectId,
                ref:"books"
            }
        ],
        orders:[
            {
                type:mongoose.Types.ObjectId,
                ref:"books"
            }
        ]
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model("user",user);