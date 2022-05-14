import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import AppContext from './AppContext';
// import apiRequest from '../services/Api';

function Provider({ children }) {
  const [stateA, setStateA] = useState('initial');
  // useEffect(() => {
  //   const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  //   apiRequest(url)
  //     .then((e) => {
  //       // stateA(e);
  //       console.log(setStateA(e));
  //     });
  // }, []);
  const contextValue = {
    stateA,
    setStateA,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

// Provider.propTypes = {
//   children: PropTypes.elementType.isRequired,
// };

export default Provider;
