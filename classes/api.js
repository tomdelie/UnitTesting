const express = require('express');
const User = require('./User');
const TodoList = require('./TodoList');

const app = express();

const portNo = process.env.PORT || 4000;

app.get("/users", async (req, res) => {
    try {
        const user1 = new User('Tom', 'Délié', 21, 'tom@gmail.com');
        const user2 = new User('Pierre', 'Délzié', 39, 'zdazdatom@gmail.com');
        const user3 = new User('Tridjaiz', 'Dédazdazdlié', 12, 'tezadom@gmail.com');
        res.json([user1, user2, user3]);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get("/users/:id", async (req, res) => {
    try {
        const user = new User('Tom', 'Délié', 21, 'tom@gmail.com');
        res.json([user]);
    } catch (e) {
        res.status(500).send(e);
    }
});


app.get("/todolists", async (req, res) => {
    try {
        const user = new User('Tom', 'Délié', 21, 'tom@gmail.com');
        const todo = new TodoList('Name', 'Content', user, 'service');
        res.json([todo]);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.post("/todolists/:todolistId", async(req, res) => {
    try {
        res.json({message: `Item added to Todolist ${req.params.todolistId}`});
    } catch (e) {
        res.status(500).send(e);
    }
});

app.listen(portNo, () => {
    console.log(`> API running at http://localhost:${portNo}`);
});

module.exports = app;