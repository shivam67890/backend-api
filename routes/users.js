const express = require('express');
const router = express.Router();

let users = [];

router.get('/', (req, res) => {
    res.json(users);
});

router.get('/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    user ? res.json(user) : res.status(404).json({ message: "User not found!" });
});

router.post('/', (req, res) => {
    const { id, name } = req.query;
    if (!id || !name) {
        return res.status(400).json({ message: "Missing required fields!" });
    }
    if (users.find(u => u.id == id)) {
        return res.status(400).json({ message: "User already exists!" });
    }
    users.push({ id, name });
    res.json({ message: "User added", users });
});

router.put('/:id', (req, res) => {
    let user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name } = req.query;
    user.name = name;
    res.json({ message: "User updated", user });
});

router.delete('/:id', (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.json({ message: "User deleted", users });
});

const getUsers = () => users;
module.exports = { router, getUsers };
