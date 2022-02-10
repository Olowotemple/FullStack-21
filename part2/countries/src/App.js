import { useEffect, useState } from 'react';
import axios from 'axios';

import Search from './components/Search';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get('https://restcountries.com/v3.1/all');
      const countries = res.data;
      setCountries(countries);
    })();
  }, []);

  useEffect(() => {
    if (search) {
      setCountriesToShow(
        countries.filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, countries]);

  const handleClick = (name) => {
    const countryToShow = countries.find(
      (country) => country.name.common.toLowerCase() === name.toLowerCase()
    );
    setCountriesToShow([countryToShow]);
    setSearch(countryToShow.name.common.toLowerCase());
  };

  return (
    <div>
      <Search search={search} setSearch={setSearch} />

      {search && (
        <Countries countries={countriesToShow} handleClick={handleClick} />
      )}
    </div>
  );
};

export default App;
