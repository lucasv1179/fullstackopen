import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, onClick}) => {
    return (
        <button name={text} onClick={onClick}>{text}</button>
    );
};

const Stats = ({good, neutral, bad}) => {
    if(good+neutral+bad !== 0)
        return (
            <table>
                <tbody>
                    <Stat stat='good' value={good} />
                    <Stat stat='neutral' value={neutral} />
                    <Stat stat='bad' value={bad} />
                    <Stat stat='average' value={(good-bad)/(good+neutral+bad) || 0} />
                    <Stat stat='positive' value={(good*100)/(good+neutral+bad) || 0} />
                </tbody>
            </table>
        );
    else
        return (
            <p>
                No feedback given
            </p>
        );
};

const Stat = ({stat, value}) => {
    return (
        <tr>
            <td>{stat}</td>
            <td>{value}</td>
        </tr>
    );
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleClick = (e) => {
        switch(e.target.name) {
            case 'good':
                setGood(good + 1);
                break;
            case 'neutral':
                setNeutral(neutral + 1);
                break;
            case 'bad':
                setBad(bad + 1);
                break;
            default:
        }
    };

    return (
        <div>
            <h2>Give Feedback</h2>
            <Button text='good' onClick={handleClick} />
            <Button text='neutral' onClick={handleClick} />
            <Button text='bad' onClick={handleClick} />
            <h2>Statistics</h2>
            <Stats good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
