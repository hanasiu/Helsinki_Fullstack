const Persons = ({ persons, handleRemove }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <div key={person.id}>
            {person.name} {person.number} 
            <button type="button" value={person.id} onClick={handleRemove}>delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Persons;
