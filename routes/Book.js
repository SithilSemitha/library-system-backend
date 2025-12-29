const express = require('express');
const router = express.Router();

const {getBooks, getBooksById} = require('../database');

//getBOOKS 
router.get('/', (req, res) => {
    getBooks((err, books) => {
        if (err) {
            res.status(500).send('Error fetching books');
        } else {
            res.json(books);
        }
    });
});

//getBOOKS by id
router.get('/:bookId', (req, res) => {
    const bookId = req.params.bookId;
    getBooksById(bookId, (err, books) => {
        if (err) {
            res.status(500).send('Error fetching book');   
        } else if (books.length === 0) {
            res.status(404).send('Book not found');
        }
        else {
            res.json(books[0]);
        }
    });
});


module.exports = router;
