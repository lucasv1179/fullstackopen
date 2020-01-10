import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = ({anecdotes}) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
    
    const handleClick = () => {
        var anecdote = Math.floor(Math.random() * (anecdotes.length));
        setSelected(anecdote);
    };

    const handleVote = () => {
        const newVotes = [...votes];
        newVotes[selected] += 1;
        setVotes(newVotes);
    };

    return(
        <div>
            <h2>Anecdote of the Day</h2>
            <p>{anecdotes[selected]}</p>
            <p><i>has {votes[selected]} votes</i></p>
            <button onClick={handleVote}>Vote up</button>
            <button onClick={handleClick}>next anecdote</button>
            <h2>Most voted anecdote</h2>
            <p>
                {
                    anecdotes[
                        votes.reduce(
                            (maxIndex, vote, index, votes) => vote > votes[maxIndex] ? index : maxIndex
                            , 0
                        )
                    ]
                }
            </p>
        </div>
    );
};

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
);
