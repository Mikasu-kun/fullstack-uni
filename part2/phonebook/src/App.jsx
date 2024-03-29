import { useEffect, useState } from 'react';

import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonsForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [nameFilter, setNameFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('');

  const handleNewNameChange = (event) => setNewName(event.target.value);
  const handleNewNumberChange = (event) => setNewNumber(event.target.value);

  const showNotification = (message, type = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setTimeout(() => setNotificationMessage(null), 3000);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const duplicatePerson = persons.find((person) => person.name === newName);

    if (duplicatePerson !== undefined) {
      if (duplicatePerson.number === newNumber)
        return alert(`${newName} is already present in the phonebook.`);
      }else {
      personService
        .create({ name: newName, number: newNumber })
        .then((person) => {
          setPersons(persons.concat(person));
          showNotification(`Added "${newName}".`);
        });
    }

    setNewName('');
    setNewNumber('');
  };

  const handleNameFilterChange = (event) => setNameFilter(event.target.value);

  const handleDeletePerson = (person) => {
    if (window.confirm(`Delete "${person.name}"?`))
      personService
        .destroy(person.id)
        .then(() =>
          setPersons(
            persons.filter((statePerson) => statePerson.id !== person.id)
          )
        );
  };

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} type={notificationType} />
      <Filter value={nameFilter} onChange={handleNameFilterChange} />
      <h2>Add a person</h2>
      <PersonForm
        onSubmit={addPerson}
        valueName={newName}
        onChangeName={handleNewNameChange}
        valueNumber={newNumber}
        onChangeNumber={handleNewNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        nameFilter={nameFilter}
        onDelete={handleDeletePerson}
      />
    </div>
  );
};

export default App;