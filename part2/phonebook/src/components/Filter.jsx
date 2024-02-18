const Filter = ({ value, onChange }) => (
    <div>
      filter by name: <input value={value} onChange={onChange} />
    </div>
  );
  
const Notification = ({ message, type }) => {
  if (message === null) return null;

  return <div className={`notification ${type}`}>{message}</div>;
};

const Persons = ({ persons, nameFilter, onDelete }) => {
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  
    return filteredPersons.map((person) => (
      <div key={person.name}>
        {person.name} {person.number}{' '}
        <button onClick={() => onDelete(person)}>delete</button>
      </div>
    ));
  };

  const PersonForm = ({
    onSubmit,
    valueName,
    onChangeName,
    valueNumber,
    onChangeNumber,
  }) => (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={valueName} onChange={onChangeName} />
      </div>
      <div>
        number: <input type="tel" value={valueNumber} onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );


  export default Filter; 
