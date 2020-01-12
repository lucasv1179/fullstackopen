import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

const Header = ({course}) => {
    return (
        <h1>
            {course.name}
        </h1>
    );
};

const Part = ({part}) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    );
};

const Content = ({course}) => {

    const parts = () => course.parts.map(
        part => <Part key={part.id} part={part} />
    );

    return (
        <Fragment>
            {parts()}
        </Fragment>
    );
};

const Total = ({course: {parts}}) => {
    return (
        <p>Number of exercises {}
            {
                parts.reduce(
                    (sumExercises, part) => 
                        sumExercises + part.exercises,
                    0
                )
            }
        </p>
    );
};

const Course = ({course}) => {

    return (
        <Fragment>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </Fragment>
    );
};

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
              {
                name: 'Routing',
                exercises: 3,
                id: 1
              },
              {
                name: 'Middlewares',
                exercises: 7,
                id: 2
              }
            ]
          }
    ];

    const course = () => courses
        .map(course => <Course key={course.id} course={course} />);

    return (
        <div>
            {course()}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
