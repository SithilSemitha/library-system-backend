const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const {
    getUserById,
    getAllUsers,
    getUserByUsername,
    createUser
} = require('../database');

// GET user by ID → /user/:uid
router.get('/:uid', (req, res) => {
    const uid = req.params.uid;

    getUserById(uid, (err, users) => {
        if (err) return res.status(500).json({ error: err.message });

        if (users.length === 0) {
            return res.status(404).json({ message: 'Invalid User ID' });
        }

        res.json(users[0]);
    });
});

// GET all users → /user
router.get('/', (req, res) => {
    getAllUsers((err, users) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(users);
    });
});

// SIGNUP 
router.post('/signup', async (req, res) => {
    const { uname, password, utype } = req.body;

    if (!uname || !password || !utype) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        createUser({ uname, password: hashedPassword, utype }, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ message: 'User already exists' });
                }
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: 'User registered successfully',
                userId: result.insertId
            });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LOGIN 
router.post('/login', async (req, res) => {
    const { uname, password } = req.body;

    if (!uname || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    getUserByUsername(uname, async (err, users) => {
        if (err) return res.status(500).json({ error: err.message });

        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = users[0];
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.json({
            message: 'Login successful',
            user: {
                uid: user.uid,
                uname: user.uname,
                utype: user.utype
            }
        });
    });
});

module.exports = router;
