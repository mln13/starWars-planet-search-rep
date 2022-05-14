import React from 'react';
import './App.css';
import Provider from './context/AppProvider';
// import AppContext from './context/AppContext';
import Table from './components/Table';

function App() {
  // const { } = useContext(AppContext);
  return (
    <Provider>
      <span>Hello, App!</span>
      <Table />
    </Provider>
  );
}

export default App;
