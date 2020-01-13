import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';

const Country = ({data}) => {
    const [weatherData, setWeatherData] = useState({});
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=1cb2852294c9f0bc20bf6c0876892298&query=${data[0].capital}`)
            .then(res => {
                setWeatherData(res.data);
            });
    }, [data]);

    const renderCountry = () => {
        return (
            data.map(country => {
                return (
                    <Fragment key={country.numericCode}>
                        <h2>{country.name}</h2>
                        <p>
                            capital {country.capital}
                            population {country.population}
                        </p>
                        <h3>languages</h3>
                        <ul>
                            {
                                country.languages
                                    .map(language => 
                                            <li key={language.iso639_2}>
                                                {language.name}
                                            </li>
                                        )
                            }
                        </ul>
                        <img
                            className="country-flag"
                            alt={`flag of ${country.name}`}
                            src={country.flag}
                        />
                        {
                            weatherData.current
                            && (
                                    <div>
                                        <h3>Weather in {country.capital}</h3>
                                        <p>
                                            temperature: {weatherData.current.temperature} Celsius
                                        </p>
                                        <img alt="weather icon" src={weatherData.current.weather_icons[0]} />
                                        <p>
                                            wind: {weatherData.current.wind_speed} kph direction {weatherData.current.wind_dir}
                                        </p>
                                    </div>
                                )
                        }
                    </Fragment>
                );
            })
        );
    };

    return (
        <div>
            {renderCountry()}
        </div>
    );
};

export default Country;