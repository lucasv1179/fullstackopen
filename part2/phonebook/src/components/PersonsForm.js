import React from 'react';

const PersonsForm = ({handleFormSubmit, handleNameInput, handleNumberInput, newName, newNumber}) => {
    return (

    <form onSubmit={handleFormSubmit}>
        <div>
            name: <input value={newName} onChange={handleNameInput} />
            number: <input value={newNumber} onChange={handleNumberInput} />
        </div>
        <div>
            <button type='submit'>add</button>
        </div>
    </form>
    );
};

export default PersonsForm;
