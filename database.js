const { createPool } = require('mysql2');

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

// Create new user
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

module.exports = {
    getUserById,
    getAllUsers,
    createUser
};
