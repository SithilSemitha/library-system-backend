const express = require('express');
const app = express();
const PORT = 3000;

const { getUserById, getAllUsers } = require('./database');

// Get user by ID
app.get('/user/:uid', (req, res) => {
    const uid = req.params.uid;

    getUserById(uid, (err, userdata) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (userdata.length === 0) {
            return res.status(404).json({ message: 'Invalid User ID' });
        }

        res.json(userdata);
    });
});

// Get all users
app.get('/user', (req, res) => {
    getAllUsers((err, users) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(users);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
