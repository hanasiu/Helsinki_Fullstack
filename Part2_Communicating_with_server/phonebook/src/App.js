import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const baseUrl = "http://localhost:3001/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearch] = useState("");
  const [notification, setNotification] = useState({
    notifiedName: "nothing",
    updated: false,
  });

  useEffect(() => {
    console.log("effect");
    personService.getAll(baseUrl).then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: new Date().toISOString()
    };
    const test = persons.find((object) => object.name === newName);
    if (test !== undefined) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(test.id, personObject)
          .then((updated) => {
            setNotification({ notifiedName: newName, updated: true });
            setPersons(
              persons.map((person) => {
                if (person.name !== updated.name) return person;
                else return updated;
              })
            );
            setNewName("");
            setNewNumber("");
            return;
          })
          .catch((error) => {
            alert(
              `the note '${personObject.name}' was already deleted from server`
            );
            setNotification({ notifiedName: "deletedAlready", updated: false });
          });
      }
      setNewName("");
      setNewNumber("");
      setNotification({ notifiedName: "nobody", updated: false });
      return;
    }

    personService.create(personObject).then((returnedPerson) => {
      setNotification({ notifiedName: returnedPerson.name, updated: false });
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleNameSearch = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  const handleRemove = (event) => {
    event.preventDefault();
    const id = event.target.value;
    const foundName = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${foundName.name}?`)) {
      personService.remove(id).then((returnedPersons) => {
        setPersons(returnedPersons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter
        searchName={searchName}
        persons={persons}
        handleNameSearch={handleNameSearch}
      />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Persons persons={persons} handleRemove={handleRemove} />
    </div>
  );
};

export default App;
