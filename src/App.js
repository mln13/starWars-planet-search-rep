import React from 'react';
import './App.css';
import Provider from './context/AppProvider';
// import AppContext from './context/AppContext';
import Planets from './components/Planets';

function App() {
  // const { } = useContext(AppContext);
  return (
    <Provider>
      <Planets />
    </Provider>
  );
}

export default App;
