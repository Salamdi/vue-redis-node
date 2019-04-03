const redis = require('redis');
const express = require('express');
const bp = require('body-parser');

const client = redis.createClient();
const app = express();
app.use(bp.json());
const PORT = 3000;
const EVENTS = {
    LOGIN: 'login',
    ADD_DATA: 'add_data'
}
const LOGS = 'logs';
const DATA = 'data';
const handleError = (err, reply, res) => {
    redis.print(err, reply);
    if (res) {
        res.status(400).json({message: err.message});
    }
}
handleResponse = (err, reply, res) => {
    redis.print(err, reply);
    res.json({reply});
}
const createClientCallback = res => (err, reply) => {
    if (err) handleError(err, reply, res);
    else handleResponse(err, reply, res);
}

app.post('/event/:name', (req, res) => {
    const {params: {name}, body} = req;
    const clientCallback = createClientCallback(res);
    const date = Date.now();
    const log = JSON.stringify({event: name, date});
    switch (name) {
        case EVENTS.LOGIN:
            client.lpush(LOGS, log, clientCallback);
            break;
        case EVENTS.ADD_DATA:
            const {title, text} = body;
            if (!title || !text) {
                return handleError({message: 'Request body must have "title" and "text" fields'}, null, res);
            }
            const data = JSON.stringify({title, text});
            client.lpush(LOGS, log, handleError);
            client.lpush(DATA, data, clientCallback);
            break;
        default:
            clientCallback(new Error('Event not found'));
    }
});

app.get('/logs', (req, res) => {
    const {query: {start = 0, stop = -1}} = req;
    const clientCallback = createClientCallback(res);
    client.lrange(LOGS, start, stop, clientCallback);
});

app.get('/data', (req, res) => {
    const {query: {start = 0, stop = -1}} = req;
    const clientCallback = createClientCallback(res);
    client.lrange(DATA, start, stop, clientCallback);
});

app.listen(PORT, '0.0.0.0', () => console.log(`listening on port ${PORT}`));

