const express = require('express');
const router = express.Router();

const {getBooks, getBooksById, createBook, updateBook, deleteBook, searchBooks} = require('../database');

//search Books
router.get('/search', (req, res) => {
    const filters = {
        title: req.query.title,
        author: req.query.author,
        category: req.query.category,
        isbn: req.query.isbn
    };

    searchBooks(filters, (err, books) => {
        if (err) {
            return res.status(500).send('Error searching books');
        }

        if (books.length === 0) {
            return res.status(404).send('No books found');
        }

        res.json(books);
    });
});


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

//create Books
router.post('/', (req, res) => {
     const { title, author, isbn, category, copies_total, copies_available } = req.body;

    createBook({ title, author, isbn, category, copies_total, copies_available }, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: 'Book added successfully',
            bookId: result.insertId
        });
    }
    );
});



//update Books
router.put('/:bookID', (req, res) => {
    const bookId = req.params.bookID;
    const { title, author, isbn, category, copies_total, copies_available } = req.body;

    updateBook(bookId, { title, author, isbn, category, copies_total, copies_available }, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            message: 'Book updated successfully',
            bookId: bookId
        });
    });
});

//deleteBooks
router.delete('/:bookID', (req, res) => {
    const bookId = req.params.bookID;
    deleteBook(bookId, (err, result) => {   
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            message: 'Book deleted successfully',
            bookId: bookId
        });
    }
    );
});



module.exports = router;
