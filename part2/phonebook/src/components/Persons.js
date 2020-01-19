import React from 'react';
import Person from './Person';

const Persons = ({ persons, filter, handlePersonDelete }) => {
    const renderPersons = () => {
        return persons
            .filter(person =>
                person.name
                    .toLowerCase()
                    .includes(filter.toLowerCase())
            )
            .map(person =>
                <Person key={person.name} handlePersonDelete={handlePersonDelete} person={person} />
            );
    };

    return (
        <ul>
            {renderPersons()}
        </ul>
    );
};

export default Persons;