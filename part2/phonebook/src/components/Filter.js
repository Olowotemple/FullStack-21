const Filter = ({ search, setSearch }) => (
  <div>
    filter shown with{' '}
    <input value={search} onChange={(event) => setSearch(event.target.value)} />
  </div>
);

export default Filter;
