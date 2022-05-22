import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [returnPlanets, setReturnPlanets] = useState([]);
  const [input, setInput] = useState('');
  const [arrayOption, setArrayOption] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
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

  // useEffect(() => {
  //   const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  //   const obj = async () => {
  //     const { results } = await fetch(endpoint).then((response) => response.json());
  //     setPlanets(results);
  //     setReturnPlanets(results);
  //   };
  //   obj();
  // }, [setPlanets]);

  const contextValue = {
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
