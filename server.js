const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

const userRoutes = require('./routes/User');
const bookRoutes = require('./routes/Book');

app.use('/user', userRoutes);
app.use('/books', bookRoutes);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
