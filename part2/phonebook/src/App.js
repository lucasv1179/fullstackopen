import React, {useState, useEffect} from 'react';
import personsService from './services/persons';
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
        personsService
            .getAll('http://localhost:3001/persons')
            .then(savedPersons => {
                setPersons(savedPersons);
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
            personsService
                .addPerson(newPerson)
                .then(addedPerson => {
                    setPersons([...persons, addedPerson]);
                });
        } else {
            const repeatedPerson = persons.find(person => person.name === newName);
            if (repeatedPerson && repeatedPerson.number !== newNumber) {
                if (window.confirm(`${newName} is already in the phonebook. Replace the old number with the new one?`)) {
                    const newPerson = {...repeatedPerson, number: newNumber};
                    personsService
                        .updatePerson(newPerson)
                        .then(updatedPerson => {
                            const updatedPersons = persons
                                .map(person => {
                                    return person.id !== updatedPerson.id
                                    ? person
                                    : updatedPerson;
                                });
                            setPersons(updatedPersons);
                        });
                }
            } else {
                alert(`${newName} is already in the phonebook.`);
            }
        }
        setNewName('');
        setNewNumber('');
    };

    const handlePersonDelete = (id) => () => {
        if (window.confirm('Delete person?')) {
            personsService
                .deletePerson(id)
                .then(status => {
                    if (status === 200) {
                        const modifiedPersons = persons
                            .filter(person => person.id !== id);
                        setPersons(modifiedPersons);
                        console.log('Successfully deleted person')
                    } else {
                        console.log('Could not delete person');
                    }
                });
        }
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
            <Persons persons={persons} handlePersonDelete={handlePersonDelete} filter={filter} />
        </div>
    );
};

export default App;
