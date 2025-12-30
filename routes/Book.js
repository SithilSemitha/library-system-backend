const express = require('express');
const router = express.Router();

const { getBooks, getBooksById, createBook, updateBook, deleteBook, searchBooks } = require('../database');

// SEARCH books
router.get('/search', (req, res) => {
    const filters = {
        title: req.query.title,
        author: req.query.author,
        category_id: req.query.category_id,
        isbn: req.query.isbn
    };

    searchBooks(filters, (err, books) => {
        if (err) {
            return res.status(500).json({ error: 'Error searching books' });
        }
        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found' });
        }
        res.json(books);
    });
});

// GET all books
router.get('/', (req, res) => {
    getBooks((err, books) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching books' });
        }
        res.json(books);
    });
});

// GET book by ID
router.get('/:bookId', (req, res) => {
    const bookId = req.params.bookId;

    getBooksById(bookId, (err, books) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching book' });
        }
        if (books.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(books[0]);
    });
});

// CREATE book
router.post('/', (req, res) => {
    const { title, author, isbn, category_id, copies_total, copies_available } = req.body;

    createBook(
        { title, author, isbn, category_id, copies_total, copies_available },
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                message: 'Book added successfully',
                book_id: result.insertId
            });
        }
    );
});

// UPDATE book
router.put('/:bookId', (req, res) => {
    const bookId = req.params.bookId;

    const { title, author, isbn, category_id, copies_total, copies_available } = req.body;
    updateBook(
        bookId,
        { title, author, isbn, category_id, copies_total, copies_available },
        (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({
                message: 'Book updated successfully',
                book_id: bookId
            });
        }
    );
});

// DELETE book
router.delete('/:bookId', (req, res) => {
    const bookId = req.params.bookId;

    deleteBook(bookId, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            message: 'Book deleted successfully',
            book_id: bookId
        });
    });
});

module.exports = router;
