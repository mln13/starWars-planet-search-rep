import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
// import apiRequest from '../services/Api';
// import PropTypes from 'prop-types';
// import AppContext from '../context/AppContext';

function Table() {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

  const {
    numericValues,
    setNumericValues,
    planets,
    setPlanets,
    returnPlanets,
    input,
    setInput,
    // filterList,
    // setFilterList,
  } = useContext(AppContext);

  useEffect(() => {
    const obj = async () => {
      const { results } = await fetch(endpoint).then((response) => response.json());
      setPlanets(results);
    };
    obj();
  }, [setPlanets]);
  const handleChange = ({ target }) => {
    setInput(target.value);
  };

  const handleFilter = ({ target }) => {
    switch (target.id) {
    case 'selectColumn':
      setNumericValues({
        filterByNumericValues: [
          {
            column: target.value,
            comparison: numericValues.filterByNumericValues[0].comparison,
            value: numericValues.filterByNumericValues[0].value,
          },
        ],
      });
      setPlanets(returnPlanets);
      break;
    case 'selectOperator':
      setNumericValues({
        filterByNumericValues: [
          {
            column: numericValues.filterByNumericValues[0].column,
            comparison: target.value,
            value: numericValues.filterByNumericValues[0].value,
          },
        ],
      });
      setPlanets(returnPlanets);
      break;
    case 'selectPopulation':
      setNumericValues({
        filterByNumericValues: [
          {
            column: numericValues.filterByNumericValues[0].column,
            comparison: numericValues.filterByNumericValues[0].comparison,
            value: target.value,
          },
        ],
      });
      setPlanets(returnPlanets);
      break;
    default: console.log('error');
    }
  };
  const handleClick = () => {
    const {
      filterByNumericValues,
    } = numericValues;

    switch (filterByNumericValues[0].comparison) {
    case 'maior que': {
      setPlanets(planets
        .filter((element) => (Number(element.population) > Number(filterByNumericValues[0]
          .value))
        && (element.population !== 'unknown')));
      break;
    }
    case 'menor que': {
      setPlanets(planets
        .filter((element) => (element.population < filterByNumericValues[0]
          .value)
          && (element.population !== 'unknown')));
      break;
    }
    case 'igual a': {
      setPlanets(planets
        .filter((element) => (element.population === filterByNumericValues[0].value)
          && (element.population !== 'unknown')));
      break;
    }
    default: console.log('no filters');
    }
  };
  console.log(planets);
  console.log(returnPlanets);
  console.log(numericValues);
  // return here
  return (
    <div>
      <section>
        <label htmlFor="searchInputId">
          Planet
          <input
            id="searchInputId"
            value={ input }
            type="text"
            onChange={ (event) => handleChange(event) }
            data-testid="name-filter"
          />
        </label>

        <label htmlFor="selectColumn">
          Column
          <select
            id="selectColumn"
            data-testid="column-filter"
            onChange={ handleFilter }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>

        <label htmlFor="selectOperator">
          Operator
          <select
            id="selectOperator"
            data-testid="comparison-filter"
            onChange={ handleFilter }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <label htmlFor="selectPopulation">
          Population
          <input
            id="selectPopulation"
            type="number"
            value={ numericValues.filterByNumericValues[0].value }
            data-testid="value-filter"
            onChange={ handleFilter }
          />
        </label>
        <button
          id="buttonFilter"
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filter
        </button>
      </section>
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
