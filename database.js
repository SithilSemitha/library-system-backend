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


function getBooks(callback) {
    pool.query(
        'SELECT * FROM books',  
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        }
)};

function getBooksById(bid, callback) {
    pool.query(
        'SELECT * FROM books WHERE bookID = ?',
        [bid],
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        }
    );
}

function createBook(book, callback) {
    const { title, author, isbn, category, copies_total, copies_available } = book;

    pool.query(
        'INSERT INTO books (title, author, isbn, category, copies_total, copies_available) VALUES (?, ?, ?, ?, ?, ?)',
        [title, author, isbn, category, copies_total, copies_available],
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        }
    );
}


function updateBook(bookId, book, callback) {
    const { title, author, isbn, category, copies_total, copies_available } = book;

    pool.query(
        'UPDATE books SET title = ?, author = ?, isbn = ?, category = ?, copies_total = ?, copies_available = ? WHERE bookID = ?',
        [title, author, isbn, category, copies_total, copies_available, bookId],
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        }
    );
}


function deleteBook(bookId, callback) {
    pool.query(
        'DELETE FROM books WHERE bookID = ?',
        [bookId],
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        }
    );
}  

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

    if (filters.category) {
        sql += ' AND category LIKE ?';
        values.push(`%${filters.category}%`);
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
    searchBooks
};
