const redis = require('redis');
const express = require('express');
const bp = require('body-parser');

const client = redis.createClient();
const app = express();
app.use(bp.json());
const PORT = 3000;
const EVENTS = [
    'login'
]
const LOGS = 'logs';

app.post('/event/:name', (req, res) => {
    const {params: {name}} = req;
    if (!EVENTS.includes(name)) {
        res.status(400).json({message: 'Event not found'});
    }
    const dateTime = Date.now();
    client.lpush(LOGS, `${name}: ${dateTime}`, (err, reply) => {
        if (err) {
            redis.print(err, reply);
            res.json(err);
        }
        redis.print(err, reply);
        res.json({reply});
    });
});

app.get('/logs', (req, res) => {
    const {body} = req;
    const {range = [0, -1]} = body || {};
    client.lrange(LOGS, range, (err, reply) => {
        if (err) {
            redis.print(err, reply);
            res.json(err);
        }
        redis.print(err, reply);
        res.json({reply});
    });
});

app.listen(PORT, 'localhost', () => console.log(`listening on port ${PORT}`));

