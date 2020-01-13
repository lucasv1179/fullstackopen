import React from 'react';
import Country from './Country';

const Countries = ({ data, query, setQuery }) => {
    const handleClick = (event) => {
        setQuery(event.target.name);
    };

    const renderData = () => {
        const filteredData = data
            .filter(country => country.name.toLowerCase().includes(query.toLowerCase()));

        if (filteredData.length > 10) {
            return (
                <p>
                    Too many matches, be more specific
                </p>
            );
        } else if (filteredData.length > 1) {
            return (
                <ul>
                    {
                        filteredData.map(country => {
                            return <li key={country.name}>{country.name}<button name={country.name} onClick={handleClick}>show</button></li>
                        })
                    }
                </ul>
            );
        } else if (filteredData.length > 0){
            return (
                <Country data={filteredData} />
            );
        }
    };

    return (
        <div>
            {renderData()}
        </div>
    );
};

export default Countries;