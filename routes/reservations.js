const express = require('express');
const router = express.Router();
const { createReservation, getReservationsForUser, deleteReservation } = require('../database');

// Create a new reservation
router.post('/', (req, res) => {
    const { uid, book_id, reservation_date, status } = req.body;

    if (!uid || !book_id) {
        return res.status(400).json({ error: 'uid and book_id are required' });
    }

    createReservation({ uid, book_id, reservation_date, status }, (err, reservationId) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error creating reservation' });
        }
        res.status(201).json({ 
            message: 'Reservation created successfully', 
            reservationId 
        });
    });
});

// Get all reservations for a specific user
router.get('/:uid', (req, res) => {
    const uid = req.params.uid;

    getReservationsForUser(uid, (err, reservations) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error fetching reservations' });
        }
        res.status(200).json(reservations);
    });
});

router.delete('/:reservationId', (req, res) => {
    const reservationId = req.params.reservationId;
    deleteReservation(reservationId, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error deleting reservation' });
        }
        res.status(200).json({ message: 'Reservation deleted successfully' });
    });
});


module.exports = router;
