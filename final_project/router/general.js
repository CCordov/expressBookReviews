const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    //res.send(JSON.stringify(books,null,4));
    let myPromise = new Promise((resolve,reject) => {
        res.send(JSON.stringify(books,null,4));
        resolve("Promise resolved")    
    })

    myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage)
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    //const isbn = req.params.isbn;
    //res.send(JSON.stringify(books[isbn],null,4));
    let myPromise = new Promise((resolve,reject) => {
        const isbn = req.params.isbn;
        res.send(JSON.stringify(books[isbn],null,4));
        resolve("Promise resolved")    
    })

    myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage)
    })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    /*const author = req.params.author;
    const booksByAuthor = [];

    for (const book in books){
        if(books[book].author === author){
            booksByAuthor.push(books[book]);
        }
    }
    if (booksByAuthor.length > 0) {
        res.send(JSON.stringify(booksByAuthor,null,4));
    } else {
        return res.send("Author not found");
    }*/

    let myPromise = new Promise((resolve,reject) => {
        const author = req.params.author;
        const booksByAuthor = [];
        for (const book in books){
            if(books[book].author === author){
                booksByAuthor.push(books[book]);
            }
        }
        if (booksByAuthor.length > 0) {
            res.send(JSON.stringify(booksByAuthor,null,4));
            resolve("Promise resolved")   
        } else {
            return res.send("Author not found");
        }
    })
    myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage)
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    /*const title = req.params.title;
    const booksByTitle = [];

    for (const book in books){
        if(books[book].title === title){
            booksByTitle.push(books[book]);
        }
    }
    if (booksByTitle.length > 0) {
        res.send(JSON.stringify(booksByTitle,null,4));
    } else {
        return res.send("Title not found");
    }*/

    let myPromise = new Promise((resolve,reject) => {
        const title = req.params.title;
        const booksByTitle = [];
        for (const book in books){
            if(books[book].title === title){
                booksByTitle.push(books[book]);
            }
        }
        if (booksByTitle.length > 0) {
            res.send(JSON.stringify(booksByTitle,null,4));
            resolve("Promise resolved")   
        } else {
            return res.send("Title not found");
        }
    })

    myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage)
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(JSON.stringify(books[isbn].reviews,null,4));
});

module.exports.general = public_users;
