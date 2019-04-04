const redis = require('redis');
const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const {promisify} = require('util');

const client = redis.createClient();
const asyncLpush = promisify(client.lpush).bind(client);
const asyncLrange = promisify(client.lrange).bind(client);
const app = express();
app.use(bp.json());
app.use(cors({origin: '*'}));
const PORT = 3000;
const EVENTS = {
    LOGIN: 'login',
    ADD_DATA: 'add_data'
}
const LOGS = 'logs';
const DATA = 'data';

app.post('/event/:name', async (req, res) => {
    const {params: {name}, body} = req;
    const date = Date.now();
    switch (name) {
        case EVENTS.LOGIN:
            const reply = await asyncLpush(LOGS, date, name);
            redis.print(reply);
            res.json({reply});
            break;
        case EVENTS.ADD_DATA:
            const {title, text} = body;
            if (!title || !text) {
                next(new Error('Request body must have "title" and "text" fields'));
            }
            const logsReply = await asyncLpush(LOGS, date, name);
            redis.print(logsReply);
            const dataReply = await asyncLpush(DATA, text, title);
            redis.print(dataReply);
            res.json({dataReply});
            break;
        default:
            next(new Error('Event has not been found'));
    }
});

app.get('/logs', async (req, res) => {
    const {query: {start = 0, stop = -1}} = req;
    const rawReply = await asyncLrange(LOGS, start * 2, stop * 2 + 1);
    const reply = [];
    for (let i = 0; i < rawReply.length; i+=2) {
        reply.push({
            event: rawReply[i],
            date: rawReply[i + 1]
        })
    }
    redis.print(rawReply);
    res.json({reply});
});

app.get('/data', async (req, res) => {
    const {query: {start = 0, stop = -1}} = req;
    const rawReply = await asyncLrange(DATA, start * 2, stop * 2 + 1);
    const reply = [];
    for (let i = 0; i < rawReply.length; i+=2) {
        reply.push({
            title: rawReply[i],
            text: rawReply[i + 1]
        })
    }
    redis.print(rawReply);
    res.json({reply});
});

app.use((err, req, res, next) => {
    res.json({message: err.message});
});

app.listen(PORT, '0.0.0.0', () => console.log(`listening on port ${PORT}`));
