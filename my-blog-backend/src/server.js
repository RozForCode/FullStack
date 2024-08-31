import express from 'express';
"use strict";
const app = express();
app.use(express.json());


app.get('/hello/:name', (req, res) => {
    const name = req.params.name;
    // const {name } = req.params //object destructuring
    res.send(`Hello! ${name}`);
})
app.post('/hello', (req, res) => {
    console.log(req.body)
    res.send(`Hello! ${req.body.name}`);
})
app.listen(8000, () => {
    console.log('working');
})