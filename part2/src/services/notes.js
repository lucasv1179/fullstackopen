import axios from 'axios';
const baseURL = '/api/notes'; //'/notes'; //'https://calm-reaches-23102.herokuapp.com/notes'//'http://localhost:3001/notes';

const getAll = () => {
    return axios
        .get(baseURL)
        .then(response => response.data);
};

const create = (note) => {
    return axios
        .post(baseURL, note)
        .then(response => response.data);
};

const update = (note) => {
    const id = note.id;
    return axios
        .put(`${baseURL}/${id}`, note)
        .then(response => response.data);
};

export default {
    getAll,
    create,
    update
};