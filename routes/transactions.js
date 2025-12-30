const express = require('express');
const router = express.Router();

const{getTransactions, getTransactionsForUser, createTransaction, getTransactionsByBookId, updateTransaction } = require("../database");


router.get('/', (req, res) => {
    getTransactions((err, transactions) => {
        if (err) {
            return  res.status(500).send('Error fetching transactions');
        }
        res.json(transactions);
    });
});

router.get('/:uid', (req, res) => {
    const uid = req.params.uid; 
    getTransactionsForUser(uid, (err, transactions) => {
        if (err) {
            return res.status(500).send('Error fetching transactions');
        }
        res.json(transactions);
    });
});

router.get('/book/:bookID', (req, res) => {
    const bookID = req.params.bookID;
    getTransactionsByBookId(bookID, (err, transactions) => {
        if (err) {
            return res.status(500).send('Error fetching transactions for the book');
        }
        res.json(transactions);
    });
});

router.post('/', (req, res) => {
    const { uid, bookID, issue_date, return_date, status } = req.body;
    createTransaction({ uid, bookID, issue_date, return_date, status }, (err, result) => {
        if (err) {
            return res.status(500).send('Error creating transaction');
        }
        res.status(201).send('Transaction created successfully');
    });
});

router.put('/:transactionId', (req, res) => {
    const transactionId = req.params.transactionId;
    const { uid, bookID, issue_date, return_date, status } = req.body;
    updateTransaction(transactionId, { uid, bookID, issue_date, return_date, status }, (err, result) => {
        if (err) {
            return res.status(500).send('Error updating transaction');
        }
        res.send('Transaction updated successfully');
    });
});

module.exports = router;