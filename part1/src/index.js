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

const History = (props) => {
    if(props.allClicks.length === 0) {
        return (
            <div>
                the app is used by pressing the buttons
            </div>
        );
    }

    return (
        <div>
            button press history: {props.allClicks.join(' ')}
        </div>    
    );
};

const App = (props) => {
    const [counter, setCounter] = useState(0);
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const [allClicks, setAll] = useState([]);
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

    const handleLeftClick = () => {
        setLeft(left + 1);
        setAll([...allClicks, 'left']);
    };
    
    const handleRightClick = () => {
        setRight(right + 1);
        setAll([...allClicks, 'right']);
    };

    return (
        <div>
            <h1>Greetings</h1>
            <Hello name={name} age={age} />
            <div style={{margin: "1em 0"}}>
                <Display counter={counter} />
                <Button text='plus' onClick={setToValue(counter + 1)} />
                <Button text='minus' onClick={setToValue(counter - 1)} />
                <Button text='zero' onClick={setToValue(0)} />
            </div>
            <div style={{margin: "1em 0"}}>
                {left}
                <Button onClick={handleLeftClick} text='left' />
                <Button onClick={handleRightClick} text='right' />
                {right}
            </div>
            <History allClicks={allClicks} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
