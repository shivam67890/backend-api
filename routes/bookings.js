const express = require('express');
const router = express.Router();

let bookings = [];
const usersModule = require('./users');
const moviesModule = require('./movies');

router.post('/', (req, res) => {
    const { userId, movieId, seats } = req.query;
    if (!userId || !movieId || !seats) {
        return res.status(400).json({ message: "Missing userId, movieId, or seats!" });
    }

    const users = usersModule.getUsers();
    const movies = moviesModule.getMovies();

    const userExists = users.some(user => user.id == userId);
    if (!userExists) {
        return res.status(400).json({ message: "User ID does not exist!" });
    }
    
    let movie = movies.find(m => m.id == movieId);
    if (!movie) {
        return res.status(400).json({ message: "Movie ID does not exist!" });
    }

    if (movie.availableSeats < seats) {
        return res.status(400).json({ message: `Only ${movie.availableSeats} seats available!` });
    }

    // Reduce the available seats
    moviesModule.updateMovieSeats(movieId, seats);

    bookings.push({ userId, movieId, seats });
    res.json({ message: "Booking confirmed!", bookings });
});

router.get('/', (req, res) => {
    res.json(bookings);
});

router.get('/:id', (req, res) => {
    const booking = bookings.find(b => b.id == req.params.id);
    booking ? res.json(booking) : res.status(404).json({ message: "Booking not found" });
});

router.put('/:id', (req, res) => {
    let booking = bookings.find(b => b.id == req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const { seats } = req.query;
    booking.seats = seats;
    res.json({ message: "Booking updated!", booking });
});

router.delete('/:id', (req, res) => {
    bookings = bookings.filter(b => b.id != req.params.id);
    res.json({ message: "Booking canceled", bookings });
});

module.exports = router;
