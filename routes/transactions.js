const express = require('express');
const router = express.Router();

const {
    getTransactions,
    getTransactionsForUser,
    getTransactionsByBookId,
    createTransaction,
    updateTransaction
} = require('../database');

// Get all transactions
router.get('/', (req, res) => {
    getTransactions((err, transactions) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching transactions' });
        }
        res.json(transactions);
    });
});

// Get transactions by BOOK ID
router.get('/book/:book_id', (req, res) => {
    const { book_id } = req.params;
    getTransactionsByBookId(book_id, (err, transactions) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching book transactions' });
        }
        res.json(transactions);
    });
});

// Get transactions by USER ID
router.get('/:uid', (req, res) => {
    const { uid } = req.params;
    getTransactionsForUser(uid, (err, transactions) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching user transactions' });
        }
        res.json(transactions);
    });
});

// Create transaction (Issue book)
router.post('/', (req, res) => {
    const { uid, book_id, issue_date, due_date, return_date, status } = req.body;

    createTransaction(
        { uid, book_id, issue_date, due_date, return_date, status },
        (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error creating transaction' });
            }
            res.status(201).json({ message: 'Transaction created successfully' });
        }
    );
});

// Update transaction (Return / status update)
router.put('/:transaction_id', (req, res) => {
    const { transaction_id } = req.params;
    const { uid, book_id, issue_date, due_date, return_date, status } = req.body;

    updateTransaction(
        transaction_id,
        { uid, book_id, issue_date, due_date, return_date, status },
        (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error updating transaction' });
            }
            res.json({ message: 'Transaction updated successfully' });
        }
    );
});

module.exports = router;
