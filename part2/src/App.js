import React, {useState, useEffect} from 'react';
import noteService from './services/notes';
import Note from './components/Note';

const App = () => {

    const [notes, setNotes] = useState([]);
    const [noteInput, setNoteInput] = useState('');
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        console.log('effect');
        const fakenote = {
            "content": "I'm fake",
            "date": "2020-01-17T18:22:13.090Z",
            "important": false,
            "id": 1000
          }
        noteService
            .getAll()
            .then(notes => {
                console.log('promise fulfilled');
                setNotes([...notes, fakenote]);
            });
    }, []);
    console.log('render', notes.length, 'notes');

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important);
    
    const rows = () => notesToShow.map(note =>
            <Note
                key={note.id}
                note={note}
                handleToggleImportance={handleToggleImportance(note.id)}
            />
        );

    const addNote = (event) => {
        const note = {
            content: noteInput,
            date: new Date(),
            important: Math.random() > 0.5
        };

        event.preventDefault();

        noteService
            .create(note)
            .then(addedNote => {
                setNotes([...notes, addedNote]);
                setNoteInput('');
            });
        // setNotes([...notes, note]);
        // setNoteInput('');
        // console.log('button clicked', event.target);
    };

    const handleToggleImportance = (id) => () => {
        const noteToUpdate = notes.find(note => note.id === id);

        noteService
            .update({...noteToUpdate, important: !noteToUpdate.important})
            .then(updatedNote => {
                setNotes(notes.map(n => n.id === id ? updatedNote : n));
            })
            .catch(error => {
                alert(`the note '${noteToUpdate.content}' was already deleted from the server`);
                setNotes(notes.filter(n => n.id !== id));
            });
    };

    const handleNoteChange = (event) => {
        console.log(event.target.value);
        setNoteInput(event.target.value);
    };

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {rows()}
            </ul>
            <form onSubmit={addNote}>
                <input value={noteInput} onChange={handleNoteChange} />
                <button type='submit'>save</button>
            </form>
        </div>
    );
};

export default App;