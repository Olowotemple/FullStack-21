import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/person';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [search, setSearch] = useState('');
  const [notificationMessage, setNotificationMessage] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const persons = await personService.getPersons();
        setPersons(persons);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);
    if (
      existingPerson &&
      existingPerson.name === newName &&
      existingPerson.number !== number &&
      window.confirm(
        `${newName} already exists in the phonebook replace the old number with ${number}?`
      )
    ) {
      const personObject = { ...existingPerson, number };
      try {
        const res = await personService.updatePerson(
          existingPerson.id,
          personObject
        );
        setNotificationMessage({
          message: `The number saved for ${res.name} has been changed from ${existingPerson.number} to ${personObject.number}`,
          type: 'success',
        });
        setTimeout(() => {
          setNotificationMessage({ message: null, type: null });
        }, 5000);
        setPersons(
          persons.map((person) => (person.id === res.id ? res : person))
        );
        setNewName('');
        setNumber('');
      } catch (error) {
        setNotificationMessage({
          message: `${error.response.data.error}`,
          type: 'error',
        });
        setTimeout(() => {
          setNotificationMessage({ message: null, type: null });
        }, 5000);
      }
    }

    if (!existingPerson) {
      const personObject = {
        name: newName,
        number,
      };
      try {
        const person = await personService.createPerson(personObject);
        setNotificationMessage({
          message: `Added ${person.name}`,
          type: 'success',
        });
        setTimeout(() => {
          setNotificationMessage({ message: null, type: null });
        }, 5000);
        setPersons([...persons, person]);
        setNewName('');
        setNumber('');
      } catch (error) {
        setNotificationMessage({
          message: `${error.response.data.error}`,
          type: 'error',
        });
        setTimeout(() => {
          setNotificationMessage({ message: null, type: null });
        }, 5000);
      }
    }
  };

  const deletePerson = async (person) => {
    const { id } = person;
    if (window.confirm(`Delete ${person.name}?`)) {
      await personService.deletePerson(person.id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  const recordsToShow = search
    ? persons.filter((person) => person.name.toLowerCase().includes(search))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        notificationMessage={notificationMessage}
        successStyle={{
          color: 'green',
          background: 'lightgrey',
          fontSize: 20,
          borderStyle: 'solid',
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        }}
        errorStyle={{
          color: 'red',
          background: 'lightgrey',
          fontSize: 20,
          borderStyle: 'solid',
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <Filter search={search} setSearch={setSearch} />

      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        number={number}
        setNewName={setNewName}
        setNumber={setNumber}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Persons persons={recordsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
