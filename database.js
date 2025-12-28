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

function getUserById(uid, callback) {
    pool.query(
        'SELECT * FROM users WHERE uid = ?',
        [uid],
        (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        }
    );
}

function getAllUsers(callback) {
    pool.query(
        'SELECT * FROM users',  
        (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        }
    );
}

module.exports = {
    getUserById,
    getAllUsers
};