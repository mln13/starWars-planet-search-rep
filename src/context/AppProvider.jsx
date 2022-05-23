import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [returnPlanets, setReturnPlanets] = useState([]);
  const [input, setInput] = useState('');
  const [waitPlanets, setWaitPlanets] = useState(1);
  const [arrayOption, setArrayOption] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [sortBy, setSortBy] = useState({ order: { column: 'population', sort: 'ASC' } });
  const [numericValues, setNumericValues] = useState({
    filterByNumericValues: [
      {
        column: 'population',
        comparison: 'maior que',
        value: '0',
      },
    ],
  });
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const obj = async () => {
      const { results } = await fetch(endpoint).then((response) => response.json());
      function sortArray(a, b) {
        const minusOne = -1;
        if (a.name < b.name) { return minusOne; }
        if (a.name > b.name) { return 1; }
        return 0;
      }
      const sortedResults = results.sort(sortArray);
      setPlanets(sortedResults);
      setReturnPlanets(sortedResults);
    };
    obj();
  }, []);

  const contextValue = {
    waitPlanets,
    setWaitPlanets,
    sortBy,
    setSortBy,
    arrayOption,
    setArrayOption,
    filters,
    setFilters,
    returnPlanets,
    setReturnPlanets,
    numericValues,
    setNumericValues,
    planets,
    setPlanets,
    input,
    setInput,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
