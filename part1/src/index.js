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

const App = (props) => {
    const [counter, setCounter] = useState(0);
    const name = 'Piotr';
    const age = 18;

    setTimeout(
        () => setCounter(counter + 1),
        1000
    );

    return (
        <div>
            <h1>Greetings</h1>
            <Hello name={name} age={age} />
            <div>{counter}</div>
        </div>
    );
};

let counter = 1;

ReactDOM.render(<App counter={counter} />, document.getElementById('root'));
