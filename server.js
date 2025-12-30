const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

const userRoutes = require('./routes/User');
const bookRoutes = require('./routes/Book');
const transactionRoutes = require('./routes/transactions');
const reservationRoutes = require('./routes/reservations');

app.use('/user', userRoutes);
app.use('/books', bookRoutes);
app.use('/transactions', transactionRoutes);
app.use('/reservations', reservationRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
