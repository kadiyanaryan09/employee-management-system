const express = require('express');
const app = express();
const db = require('./api');
const cors=require('cors')
app.use( cors())
;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log("hello");
    res.send("welcome to my api");
});

app.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee";

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
});

app.post('/employee', (req, res) => {

    const {id, name, email, course } = req.body || {};

    if (!id || !name || !email || !course) {
        return res.status(400).send("All fields are required");
    }

    const sql = "INSERT INTO employee (id, name, email, course) VALUES (?, ?, ?, ?)";
    db.query(sql, [id, name, email, course], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.json({success: true, message: "Employee added"});
        }
    });
});

app.put('/employee/:id', (req, res) => {
    const {name, email, course} = req.body;
    const id = req.params.id;

    if (!name || !email || !course) {
        return res.status(400).send("All fields are required");
    }

    const sql = "UPDATE employee SET name = ?, email = ?, course = ? WHERE id = ?";
    db.query(sql, [name, email, course, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.json({success: true, message: "Employee updated"});
        }
    });
});

app.delete('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM employee WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.json({success: true, message: "Employee deleted"});
        }
    });
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
