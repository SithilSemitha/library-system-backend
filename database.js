const { createPool } = require('mysql2');
const { get } = require('./routes/User');

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'sithil123',
    database: 'library_system',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Get user by ID
function getUserById(uid, callback) {
    pool.query(
        'SELECT * FROM users WHERE uid = ?',
        [uid],
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        }
    );
}

// Get all users
function getAllUsers(callback) {
    pool.query(
        'SELECT * FROM users',
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        }
    );
}

// Get user by username (for login)
function getUserByUsername(uname, callback) {
    pool.query(
        'SELECT * FROM users WHERE uname = ?',
        [uname],
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        }
    );
}

// Create new user (signup)
function createUser(user, callback) {
    const { uname, password, utype } = user;

    pool.query(
        'INSERT INTO users (uname, password, utype) VALUES (?, ?, ?)',
        [uname, password, utype],
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        }
    );
}

// GET all books
function getBooks(callback) {
    pool.query(
        'SELECT * FROM books',
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        }
    );
}

// GET book by ID
function getBooksById(bookId, callback) {
    pool.query(
        'SELECT * FROM books WHERE book_id = ?',
        [bookId],
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        }
    );
}

// CREATE book
function createBook(book, callback) {
    const {
        title,
        author,
        isbn,
        category_id,
        copies_total,
        copies_available
    } = book;

    pool.query(
        `INSERT INTO books 
        (title, author, isbn, category_id, copies_total, copies_available) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [title, author, isbn, category_id, copies_total, copies_available],
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        }
    );
}

// UPDATE book
function updateBook(bookId, book, callback) {
    const {
        title,
        author,
        isbn,
        category_id,
        copies_total,
        copies_available
    } = book;

    pool.query(
        `UPDATE books 
         SET title = ?, author = ?, isbn = ?, category_id = ?, 
             copies_total = ?, copies_available = ?
         WHERE book_id = ?`,
        [
            title,
            author,
            isbn,
            category_id,
            copies_total,
            copies_available,
            bookId
        ],
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        }
    );
}

// DELETE book
function deleteBook(bookId, callback) {
    pool.query(
        'DELETE FROM books WHERE book_id = ?',
        [bookId],
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        }
    );
}

// SEARCH books
function searchBooks(filters, callback) {
    let sql = 'SELECT * FROM books WHERE 1=1';
    const values = [];

    if (filters.title) {
        sql += ' AND title LIKE ?';
        values.push(`%${filters.title}%`);
    }

    if (filters.author) {
        sql += ' AND author LIKE ?';
        values.push(`%${filters.author}%`);
    }

    if (filters.category_id) {
        sql += ' AND category_id = ?';
        values.push(filters.category_id);
    }

    if (filters.isbn) {
        sql += ' AND isbn = ?';
        values.push(filters.isbn);
    }

    pool.query(sql, values, (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
}

// TRANSACTIONS
// Get all transactions
function getTransactions(callback) {
    pool.query(
        'SELECT * FROM transactions',
        (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        }
    );
}

// Get transactions for a specific user
function getTransactionsForUser(uid, callback) {
    pool.query(
        'SELECT * FROM transactions WHERE uid = ?',
        [uid],
        (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        }
    );
}

// Get transactions for a specific book
function getTransactionsByBookId(book_id, callback) {
    pool.query(
        'SELECT * FROM transactions WHERE book_id = ?',
        [book_id],
        (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        }
    );
}

// Create transaction (Issue book)
function createTransaction(transaction, callback) {
    const { uid, book_id, issue_date, due_date, return_date, status } = transaction;

    pool.query(
        `INSERT INTO transactions 
        (uid, book_id, issue_date, due_date, return_date, status) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [uid, book_id, issue_date, due_date, return_date, status || 'BORROWED'],
        (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        }
    );
}

// Update transaction (Return book / change status)
function updateTransaction(transaction_id, transaction, callback) {
    const { uid, book_id, issue_date, due_date, return_date, status } = transaction;

    pool.query(
        `UPDATE transactions 
         SET uid = ?, book_id = ?, issue_date = ?, due_date = ?, return_date = ?, status = ?
         WHERE transaction_id = ?`,
        [uid, book_id, issue_date, due_date, return_date, status, transaction_id],
        (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        }
    );
}


// RESERVATIONS

function createReservation(reservation, callback) {
    const { uid, book_id, reservation_date, status } = reservation;

    // Format date to MySQL TIMESTAMP format
    const date = reservation_date
        ? new Date(reservation_date).toISOString().slice(0, 19).replace('T', ' ')
        : new Date().toISOString().slice(0, 19).replace('T', ' ');

    const reservationStatus = status || 'ACTIVE';

    const query = `
        INSERT INTO reservations (uid, book_id, reservation_date, status)
        VALUES (?, ?, ?, ?)
    `;

    pool.query(query, [uid, book_id, date, reservationStatus], (err, results) => {
        if (err) return callback(err);
        // Return the inserted reservation ID
        callback(null, results.insertId);
    });
}

function getReservationsForUser(uid, callback) {
    const query = `SELECT * FROM reservations WHERE uid = ? ORDER BY reservation_date DESC`;

    pool.query(query, [uid], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
}

function deleteReservation(reservationId, callback) {
    const query = `DELETE FROM reservations WHERE reservation_id = ?`;

    pool.query(query, [reservationId], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
}

// Categoires

function getCategories(callback) {
    pool.query(
        'SELECT * FROM categories',
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        }
    );
}

function createCategory(category, callback) {
    const { name, description } = category;
    pool.query(
        'INSERT INTO categories (name) VALUES (?)',
        [name],
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        }
    );
}

function deleteCategory(categoryId, callback) {
    pool.query(
        'DELETE FROM categories WHERE category_id = ?',
        [categoryId],
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        }
    );
}

module.exports = {
    getUserById,
    getAllUsers,
    getUserByUsername,
    createUser,
    getBooks,
    getBooksById,
    createBook,
    updateBook,
    deleteBook,
    searchBooks,
    getTransactionsForUser,
    createTransaction,
    getTransactionsByBookId,
    getTransactions,
    updateTransaction,
    createReservation,
    getReservationsForUser,
    deleteReservation,
    getCategories,
    createCategory,
    deleteCategory
};
