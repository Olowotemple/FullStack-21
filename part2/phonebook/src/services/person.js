import axios from 'axios';
const baseURL = '/api/persons';

const getPersons = async () => {
  const res = await axios.get(baseURL);
  return res.data;
};

const createPerson = async (person) => {
  const res = await axios.post(baseURL, person);
  return res.data;
};

const updatePerson = async (id, person) => {
  const res = await axios.put(`${baseURL}/${id}`, person);
  return res.data;
};

const deletePerson = async (id) => {
  await axios.delete(`${baseURL}/${id}`);
};

const personService = { getPersons, createPerson, updatePerson, deletePerson };

export default personService;
