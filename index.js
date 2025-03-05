const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const { router: movieRoutes } = require('./routes/movies');
const { router: userRoutes } = require('./routes/users');
const bookingRoutes = require('./routes/bookings');

app.use('/movies', movieRoutes);
app.use('/users', userRoutes);
app.use('/bookings', bookingRoutes);

app.get('/', (req, res) => {
    res.send("FlickTicket API is running!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
