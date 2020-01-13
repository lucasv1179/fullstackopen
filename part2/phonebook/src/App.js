import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Persons from './components/Persons';
import PersonsForm from './components/PersonsForm';
import Filter from './components/Filter';
import './App.css';

const App = () => {

    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(res => {
                setPersons(res.data);
            });
    }, []);

    const handleNameInput = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberInput = (event) => {
        setNewNumber(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const isNameRepeated = persons.some(person => person.name === newName);
        if (!isNameRepeated) {
            const newPerson = { name: newName, number: newNumber };
            setPersons([...persons, newPerson]);
        } else {
            alert(`${newName} is already in the phonebook.`);
        }
        setNewName('');
        setNewNumber('');
    };

    const handleFilterInput = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilterInput={handleFilterInput} />
            <h2>Add new</h2>
            <PersonsForm
                newName={newName}
                newNumber={newNumber}
                handleNameInput={handleNameInput}
                handleNumberInput={handleNumberInput}
                handleFormSubmit={handleFormSubmit}
            />
            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter} />
        </div>
    );
};

export default App;
