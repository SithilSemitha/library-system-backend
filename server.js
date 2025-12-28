const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

app.use(express.json()); // to parse JSON bodies

const { getUserById, getAllUsers, createUser } = require('./database');

// Get user by ID
app.get('/user/:uid', (req, res) => {
    const uid = req.params.uid;

    getUserById(uid, (err, userdata) => {
        if (err) return res.status(500).json({ error: err.message });

        if (userdata.length === 0) return res.status(404).json({ message: 'Invalid User ID' });

        res.json(userdata);
    });
});

// Get all users
app.get('/user', (req, res) => {
    getAllUsers((err, users) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(users);
    });
});

// Sign Up (Create new user)
app.post('/signup', async (req, res) => {
    const { uname, password, utype } = req.body;

    if (!uname || !password || !utype) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Hash the password
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
