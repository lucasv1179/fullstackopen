import React from 'react';

const Note = ({note, handleToggleImportance}) => {
    const label = note.important
        ? 'make not important'
        : 'make important';

    return (
        <li className='note'>
            {note.content}
            <button style={{margin: "0 .5rem"}} onClick={handleToggleImportance}>{label}</button>    
        </li>
    );
}

export default Note;