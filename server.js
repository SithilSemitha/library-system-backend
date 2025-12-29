const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

const userRoutes = require('./routes/User');

app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
