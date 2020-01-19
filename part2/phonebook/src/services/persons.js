import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
    return axios
        .get(baseURL)
        .then(response => response.data);
};

const addPerson = (person) => {
    return axios
        .post(baseURL, person)
        .then(response => response.data);
};

const updatePerson = (person) => {
    const id = person.id;
    return axios
        .put(`${baseURL}/${id}`, person)
        .then(response => response.data);
};

const deletePerson = (id) => {
    return axios
        .delete(`${baseURL}/${id}`)
        .then(response => response.status);
};

export default {getAll, addPerson, updatePerson, deletePerson};
