const express = require('express');
const router = express.Router();

let movies = [
    { id: "1", title: "Inception", showtime: "7PM", availableSeats: 50 },
    { id: "2", title: "Interstellar", showtime: "9PM", availableSeats: 50 },
    { id: "3", title: "The Dark Knight", showtime: "8PM", availableSeats: 50 }
];

router.get('/', (req, res) => {
    res.json(movies);
});

router.get('/:id', (req, res) => {
    const movie = movies.find(m => m.id == req.params.id);
    movie ? res.json(movie) : res.status(404).json({ message: "Movie not found" });
});

router.put('/:id', (req, res) => {
    let movie = movies.find(m => m.id == req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const { title, showtime } = req.query;
    if (title) movie.title = title;
    if (showtime) movie.showtime = showtime;

    res.json({ message: "Movie updated!", movie });
});


const getMovies = () => movies;
const updateMovieSeats = (movieId, bookedSeats) => {
    let movie = movies.find(m => m.id == movieId);
    if (movie) {
        movie.availableSeats -= bookedSeats;
    }
};
module.exports = { router, getMovies, updateMovieSeats };
