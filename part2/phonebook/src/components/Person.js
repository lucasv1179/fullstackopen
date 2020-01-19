import React from 'react';

const Person = ({person, handlePersonDelete}) => {
    return (
        <li>
            {person.name} {person.number} { }
            <button onClick={handlePersonDelete(person.id)}>delete</button>
        </li>
    );
};

export default Person;