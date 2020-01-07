import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
    console.log(props);
    return (
        <div>
            <p>
                Hello. My name is {props.name}, and I am {props.age} years old.
            </p>
        </div>
    );
};

const App = () => {
    const name = 'Peter';
    const age = 18;

    return (
        <div>
            <h1>Greetings</h1>
            <Hello name={name} age={age} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
