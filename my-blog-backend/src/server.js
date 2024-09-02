import fs from 'fs';
import admin from 'firebase-admin';
import express from 'express';
import { MongoClient } from 'mongodb';

const credentails = JSON.parse(
    fs.readFileSync('./confidentail.json')
);
admin.initializeApp(
    {
        credential: admin.credential.cert(credentails)
    });

"use strict";
const app = express();
app.use(express.json());

app.use(async (req, res, next) => {
    const { authtoken } = req.headers;//case insensitive

    try {
        if (authtoken) {
            const user = await admin.auth().verifyIdToken(authtoken);
            req.user = user;
        }
    } catch (e) {
        return res.sendStatus(404);
    }
    req.user = req.user || {};

    next();
})

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('react-blog-db');

    const article = await db.collection('articles').findOne({ name });
    const { uid } = req.user;
    if (article) {
        const upvoteIds = article.upvoteIds || [];
        article.canUpVote = uid && !upvoteIds.include(uid);
        res.json(article);
    }
    else {
        res.sendStatus(404);
    }
})

app.use((req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        res.sendStatus(404);
    }
})
app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('react-blog-db');
    const { uid } = req.user;
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        const upvoteIds = article.upvoteIds || [];
        const canUpVote = uid && !upvoteIds.includes(uid);
        if (canUpVote) {
            await db.collection('articles').updateOne({ name }, {
                $inc: { upvotes: 1 },
                $push: { upvoteIds: uid }
            })
        }
        const updatedArticle = await db.collection('articles').findOne({ name });
        res.json(updatedArticle);
    }
    else {
        res.sendStatus(404);
    }

})
app.post('/api/articles/:name/comments', async (req, res) => {
    const { text } = req.body;
    const { name } = req.params;
    const { email } = req.user;

    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('react-blog-db');
    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy: email, text } }
    });
    const article = await db.collection('articles').findOne({ name })
    if (article) {
        res.json(article);
    }
    else {
        res.sendStatus(404);
    }
})


app.listen(8000, () => {
    console.log('working');
})