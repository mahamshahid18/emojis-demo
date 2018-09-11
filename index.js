'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started');
});

app.get('/', (req, res) => {
    res.status(200);
    res.send('Why hello there. The force is strong with this one!');
});

/**
 * Chooses from 3 available emojis and sends
 * one back based on inputs or no inputs to
 * the endpoint
 *
 * @name GET/emoji
 *
 * @param {string} dialog1 - { Optional query param } - Favorite dialogue from Star Wars
 * @param {string} dialog2 - { Optional query param } - Another dialogue from Star Wars
 *
 * Returns HTTP 200 code and an emoji
 */
app.get('/emoji', (req, res) => {
    let d1 = req.query.dialog1 || '';
    let d2 = req.query.dialog2 || '';

    d1 = d1.toLowerCase();
    d2 = d2.toLowerCase();

    // '😇' => default
    // '👊' => force is strong
    // '😏' => gray side of the force
    // '😈' => dark side of the force
    const emojis = ['😇', '👊', '😏', '😈'];
    let emoji = emojis[0];

    let containsForce = d1.includes('force') || d2.includes('force');
    let containsDarkSide = d1.includes('dark side') || d2.includes('dark side');

    if (containsForce && containsDarkSide) {
        emoji = emojis[2];
    } else if (containsForce) {
        emoji = emojis[1];
    } else if (containsDarkSide) {
        emoji = emojis[3];
    }

    res.status(200);
    res.send(emoji);
    console.log(emoji + '  sent!');
});