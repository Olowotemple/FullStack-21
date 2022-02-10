import Country from './Country';

const Countries = ({ countries, handleClick }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length < 10 && countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}{' '}
            <button onClick={() => handleClick(country.name.common)}>
              show
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {countries.map((country) => (
        <Country
          key={`${country.name.common}${country.area}`}
          country={country}
        />
      ))}
    </div>
  );
};

export default Countries;
