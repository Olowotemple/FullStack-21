import Weather from './Weather';

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((language, idx) => (
          <li key={`${language}${idx}`}>{language}</li>
        ))}
      </ul>

      <img
        src={country.flags.svg}
        alt={`${country.name.official}'s flag`}
        width="150"
      />

      <Weather name={country.capital.join()} />
    </div>
  );
};

export default Country;
