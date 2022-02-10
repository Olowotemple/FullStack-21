const Search = ({ search, setSearch }) => {
  return (
    <div>
      find countries{' '}
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  );
};

export default Search;
