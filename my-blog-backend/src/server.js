import express from 'express';
"use strict";
const app = express();
app.use(express.json());

let articlesInfo = [
    { name: 'learn-react', upvotes: 0, comments: [] },
    { name: 'mongodb', upvotes: 0, comments: [] },
    { name: 'learn-node', upvotes: 0, comments: [] }
]
// app.get('/hello/:name', (req, res) => {
//     const name = req.params.name;
//     // const {name } = req.params //object destructuring
//     res.send(`Hello! ${name}`);
// })
// app.get('/hello/:name/goodbye/:othername', (req, res) => {
//     const name = req.params.name;
//     const { othername } = req.params
//     // const {name } = req.params //object destructuring
//     res.send(`Hello! ${name}  <br> Goodbye! ${othername}`);
// })

app.put('/api/articles/:name/upvote', (req, res) => {
    let article = articlesInfo.find(x => x.name === req.params.name);
    if (article) {
        article.upvotes += 1;
        res.send(`The ${req.params.name} has ${article.upvotes} upvotes`)
    } else {
        res.send(`Article doesn't exist`)
    }

})
app.post('/api/articles/:name/comments', (req, res) => {
    const { postedBy, text } = req.body;
    const { name } = req.params;

    const article = articlesInfo.find(article => article.name === name);
    if (article) {
        article.comments.push({ postedBy, text })
        res.send(article.comments)
    } else {
        res.send(`Article doesn't exist`)
    }
})

app.post('/hello', (req, res) => {
    console.log(req.body)
    res.send(`Hello! ${req.body.name}`);
})
app.listen(8000, () => {
    console.log('working');
})