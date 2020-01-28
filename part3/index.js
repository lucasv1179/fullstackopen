//const http = require('http');
const express = require('express'); //Replaced Node's built-in http module with express
const bodyParser = require('body-parser'); //Express library
const requestLogger = (request, response, next) => { //Custom middleware
    console.log('Method:', request.method);
    console.log('Path:', request.path);
    console.log('Body:', request.body);
    console.log('---');
    next();
};
const cors = require('cors');

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }
];

/* const app = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(notes));
}); */
const app = express();
app.use(express.static('build'), bodyParser.json(), requestLogger, cors());

app.get('/', (req, res) => {
    res.send('<h1>Hello Node.js!</h1>');
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const note = notes.find(note => note.id === id);
    if (note) {
        res.json(note);
    } else {
        res.status(404).end();
    }
});

app.post('/api/notes', (req, res) => {
    const body = req.body;
    console.log(body);

    if (!body.content) {
        return res.status(400).json({
            error: 'content missing'
        });
    }

    const note = {
        id: generateId(),
        date: new Date(),
        content: body.content,
        important: body.important || false
    };

    notes = [...notes, note];

    res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter(note => note.id !== id);
    res.status(204).end();
});

const unknownEndpoint = (request, response, next) => { //Custom middleware
    response.status(404).send({
        error: 'unknown endpoint'
    })
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

function generateId() {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0;
    return maxId + 1;
};
