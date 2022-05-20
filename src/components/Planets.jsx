import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import FilterList from './FiltersList';
import Table from './Table';

function Planets() {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const {
    planets,
    filters,
    setFilters,
    numericValues,
    setNumericValues,
    setPlanets,
    // setReturnPlanets,
    // returnPlanets,
    input,
    setInput,
  } = useContext(AppContext);

  useEffect(() => {
    const obj = async () => {
      const { results } = await fetch(endpoint).then((response) => response.json());
      setPlanets(results);
    };
    // setReturnPlanets(planets);
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
      break;
    default: console.log('error');
    }
  };
  const handleClick = () => {
    const {
      filterByNumericValues,
    } = numericValues;
    const newFilters = [
      ...filters,
      { columnFilter: filterByNumericValues[0].column,
        comparinsonFilter: filterByNumericValues[0].comparison,
        valueFilter: filterByNumericValues[0].value,
      }];
    setFilters(newFilters);
    return newFilters.map(({ columnFilter, comparinsonFilter, valueFilter }) => {
      const selecCol = document.getElementById('selectColumn');
      const selecOp = document.getElementById('selectOperator');
      for (let i = 0; i < selecCol.length; i += 1) {
        if (selecCol.options[i].value === columnFilter) {
          selecCol.options.remove(i);
          setNumericValues({
            filterByNumericValues: [{
              column: selecCol.options[0].value,
              comparison: selecOp.options[0].value,
              value: '0',
            }],
          });
        }
      }
      switch (comparinsonFilter) {
      case 'maior que': {
        setPlanets(planets
          .filter((element) => (Number(element[columnFilter]) > Number(valueFilter))
            && (element.population !== 'unknown')));
        break;
      }
      case 'menor que': {
        setPlanets(planets
          .filter((element) => (Number(element[columnFilter]) < Number(valueFilter))
              && (element.population !== 'unknown')));
        break;
      }
      case 'igual a': {
        setPlanets(planets
          .filter((element) => (element[columnFilter] === valueFilter)
              && (element.population !== 'unknown')));
        break;
      }
      default: console.log('no filters');
      }
      return console.log('a');
    });
  };
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
        <button
          type="button"
        >
          Remove all filters
        </button>
      </section>
      <FilterList />
      <Table />
    </div>
  );
}

export default Planets;
