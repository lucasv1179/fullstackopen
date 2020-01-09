import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Hello = ({name, age}) => {
    
    const bornYear = () => {
        const yearNow = new Date().getFullYear();
        return yearNow - age;
    };
    
    return (
        <div>
            <p>
                Hello. My name is {name}, and I am {age} years old.
            </p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    );
};

const Display = ({counter}) => <div>{counter}</div>;

const Button = ({text, onClick}) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    );
};

const App = (props) => {
    const [counter, setCounter] = useState(0);
    const name = 'Piotr';
    const age = 18;

    const setToValue = (v) => () => setCounter(v);

    /* const increaseByOne = () => {
        setCounter(counter + 1);
    };

    const setToZero = () => {
        setCounter(0);
    }; */

    /* setTimeout(
        () => setCounter(counter + 1),
        1000
    ); */

    return (
        <div>
            <h1>Greetings</h1>
            <Hello name={name} age={age} />
            <Display counter={counter} />
            <Button text='plus' onClick={setToValue(counter + 1)} />
            <Button text='minus' onClick={setToValue(counter - 1)} />
            <Button text='zero' onClick={setToValue(0)} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
