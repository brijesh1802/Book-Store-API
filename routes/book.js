const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/books");
const jwt = require("jsonwebtoken");
const authToken = require("../routes/userAuth")
require("dotenv").config();

//add book --admin
router.post("/add-book", authToken, async (req,res) =>{
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if(user.role !== "admin")
        {
            return res.status(400).json({
                message: "Access Denied",
            });
        }
        const book  = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        await book.save();
        return res.status(200).json({
            message: "Book added succesfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

//update book --admin
router.put("/update-book", authToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        const { id } = req.headers;
        const user = await User.findById(id);
        if(user.role !== "admin")
        {
            return res.status(400).json({
                message: "Access Denied",
            });
        }
        // Ensure bookId is provided
        if (!bookid) {
            return res.status(400).json({
                message: "Book ID is required"
            });
        }

        // Update the book
        const updatedBook = await Book.findByIdAndUpdate(
            bookid,
            {
                url: req.body.url,
                title: req.body.title,
                author: req.body.author,
                price: req.body.price,
                desc: req.body.desc,
                language: req.body.language,
            }
        );

        // If no book is found with the given ID
        if (!updatedBook) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        return res.status(200).json({
            message: "Book updated successfully",
            book: updatedBook // Optionally return the updated book
        });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

//delete book --admin
router.delete("/delete-book", authToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        const { id } = req.headers;
        const user = await User.findById(id);
        if(user.role !== "admin")
        {
            return res.status(400).json({
                message: "Access Denied",
            });
        }
        // Ensure bookId is provided
        if (!bookid) {
            return res.status(400).json({
                message: "Book ID is required"
            });
        }

        // Find the book by ID
        const book = await Book.findById(bookid);

        // If no book is found with the given ID
        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        // Delete the book
        await Book.findByIdAndDelete(bookid);

        return res.status(200).json({
            message: "Book deleted successfully"
        });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

//display all books
router.get("/get-books", async (req, res) => {
    try {
        // Fetch all books from the database
        const books = await Book.find().sort({createdAt:-1});

        // Return the list of books as JSON response
        return res.status(200).json(books);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

//display books limit to 6
router.get("/get-recent-books", async (req, res) => {
    try {
        // Fetch all books from the database
        const books = await Book.find().sort({createdAt:-1}).limit(6);

        // Return the list of books as JSON response
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});


module.exports = router;