import express from 'express';
"use strict";
const app = express();


app.get('/hello', (req, res) => {
    res.send('Hello!');
})
app.listen(8000, () => {
    console.log('working');
})