import React, { useEffect, useState } from 'react';
// import apiRequest from '../services/Api';
// import PropTypes from 'prop-types';
// import AppContext from '../context/AppContext';

function Table() {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [planets, setPlanets] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const obj = async () => {
      const { results } = await fetch(endpoint).then((response) => response.json());
      setPlanets(results);
    };
    obj();
  }, []);
  const handleChange = ({ target: { value } }) => {
    setInput(value);
  };
  return (
    <div>
      <label htmlFor="inputId">
        Planet
        <input
          id="inputId"
          value={ input }
          type="text"
          onChange={ (event) => handleChange(event) }
          data-testid="name-filter"
        />
      </label>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            (input === '')
              ? planets.map((
                { name,
                  rotation_period: rotationPeriod,
                  orbital_period: orbitalPeriod,
                  diameter,
                  climate,
                  gravity,
                  terrain,
                  surface_water: surfaceWater,
                  population,
                  films,
                  created,
                  edited,
                  url },
              ) => (
                <tr key={ name }>
                  <td>{name}</td>
                  <td>{rotationPeriod}</td>
                  <td>{orbitalPeriod}</td>
                  <td>{diameter}</td>
                  <td>{climate}</td>
                  <td>{gravity}</td>
                  <td>{terrain}</td>
                  <td>{surfaceWater}</td>
                  <td>{population}</td>
                  <td>{films}</td>
                  <td>{created}</td>
                  <td>{edited}</td>
                  <td>{url}</td>
                </tr>
              ))
              : planets.map(({ name }) => name
                .includes(input) && <tr key={ name }>{name}</tr>)
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
