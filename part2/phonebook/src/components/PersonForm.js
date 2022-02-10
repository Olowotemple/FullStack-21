const PersonForm = ({
  newName,
  number,
  setNewName,
  setNumber,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name:{' '}
      <input
        value={newName}
        onChange={(event) => setNewName(event.target.value)}
      />
    </div>
    <div>
      number:{' '}
      <input
        value={number}
        onChange={(event) => setNumber(event.target.value)}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
