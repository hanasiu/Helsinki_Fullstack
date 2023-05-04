const Filter = ({searchName, persons, handleNameSearch}) => {

  return (
    <div>
      <div>filter shown with {" "}
      <input value={searchName} onChange={handleNameSearch} />
      {persons
        .filter(
          (person) => searchName.toLowerCase() === person.name.toLowerCase()
        )
        .map((search) => (
          <li key={search.id}>
            {search.name} {search.number}
          </li>
        ))}
        </div>
    </div>
  );
};

export default Filter;
