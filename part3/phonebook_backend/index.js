const express = require('express');
const bodyParser = require('body-parser');
const {requestLogger, unknownEndpoint} = require('./customMiddleware/middleware');
//TODO implement 'morgan' logging middleware

const app = express();
const PORT = 3001;

app.use(bodyParser.json(), requestLogger);

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Jane Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
];

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);

    if (!person) {
        return res.status(404).json({
            error: 'resource not found'
        });
    }

    res.json(person);
});

app.post('/api/persons', (req, res) => {
    const body = req.body;
    const rejectReason = '';

    if (!body.name && !body.number) {
        rejectReason = 'name and number are missing';
    } else if (!body.name) {
        rejectReason = 'name is missing';
    } else if (!body.number) {
        rejectReason = 'number is missing';
    } else {
        const isNameInPhonebook = persons.some(person => person.name === body.name);
        if (isNameInPhonebook) {
            rejectReason = 'name must be unique';
        }
    }

    if (rejectReason) {
        return res.status(400).json({
            error: rejectReason
        });
    }

    const person = {
        id: createID(),
        name: body.name,
        number: body.number
    };

    persons = [...persons, person];

    res.status(201).json(person);
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);

    if (!person) {
        return res.status(404).json({
            error: 'No person with that id exists'
        });
    } else {
        persons = persons.filter(p => p !== person);
        return res.status(204).end();
    }
});

app.get('/info', (req, res) => {
    const responseBody = `
        <div>
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date()}</p>
        </div>
    `;
    res.send(responseBody);
});

app.use(unknownEndpoint);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

function createID() {
    return Math.floor(Math.random() * 100000000);
}