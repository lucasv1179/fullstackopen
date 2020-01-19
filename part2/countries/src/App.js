import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Search from './components/Search';
import Countries from './components/Countries';

function App() {
    const [countryData, setCountryData] = useState([]);
    const [weatherData, setWeatherData] = useState({});
    const [query, setQuery] = useState('');
    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(res => {
                console.log('CountryData:', res.data);
                setCountryData(res.data);
            });
    }, []);

    const handleQueryInput = (event) => {
        setQuery(event.target.value);
    };

    return (
        <div>
            <Search handleQueryInput={handleQueryInput} query={query} />
            <Countries data={countryData} query={query} setQuery={setQuery} weatherData={weatherData} setWeatherData={setWeatherData} />
        </div>
    );
}

export default App;
