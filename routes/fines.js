const express = require('express');
const router = express.Router();

const {getfines, getfinesByUserId, updateFine} = require('../database');
 
router.get('/', (req, res) => {
    getfines((err, fines) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error fetching fines' });
        }
        res.status(200).json(fines);
    });
});

router.get('/:uid', (req, res) => {
    const uid = req.params.uid;
    getfinesByUserId(uid, (err, fines) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error fetching fines for user' });
        }
        res.status(200).json(fines);
    });
});


router.put('/:fineId', (req, res) => {
    const fineId = req.params.fineId;
    const fineData = req.body;
    updateFine(fineId, fineData, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error updating fine' });
        }
        res.status(200).json({ message: 'Fine updated successfully' });
    });
});



module.exports = router;