import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import FilterList from './FiltersList';
import Table from './Table';

function Planets() {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const selecOp = ['maior que', 'menor que', 'igual a'];
  const {
    arrayOption,
    setArrayOption,
    planets,
    filters,
    setFilters,
    numericValues,
    setNumericValues,
    setPlanets,
    setReturnPlanets,
    returnPlanets,
    input,
    setInput,
  } = useContext(AppContext);

  useEffect(() => {
    const obj = async () => {
      const { results } = await fetch(endpoint).then((response) => response.json());
      setPlanets(results);
      setReturnPlanets(results);
    };
    obj();
  }, []);
  const handleChange = ({ target }) => {
    setInput(target.value);
  };
  const removeAll = () => {
    setPlanets(returnPlanets);
    setFilters([]);
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
    console.log(planets);
    return newFilters.map(({ columnFilter, comparinsonFilter, valueFilter }) => {
      const newArrayOption = arrayOption.filter((e) => e !== columnFilter);
      setArrayOption(newArrayOption);
      setNumericValues({
        filterByNumericValues: [{
          column: newArrayOption[0],
          comparison: selecOp[0],
          value: '0',
        }],
      });
      switch (comparinsonFilter) {
      case 'maior que': {
        setPlanets(planets
          .filter((element) => (Number(element[columnFilter]) > Number(valueFilter))
            && (element[columnFilter] !== 'unknown')));
        break;
      }
      case 'menor que': {
        setPlanets(planets
          .filter((element) => (Number(element[columnFilter]) < Number(valueFilter))
              && (element[columnFilter] !== 'unknown')));
        break;
      }
      case 'igual a': {
        setPlanets(planets
          .filter((element) => (element[columnFilter] === valueFilter)
          && (element[columnFilter] !== 'unknown')));
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
            {arrayOption.map((e) => (
              <option key={ e } value={ e }>{e}</option>
            ))}
          </select>
        </label>

        <label htmlFor="selectOperator">
          Operator
          <select
            id="selectOperator"
            data-testid="comparison-filter"
            onChange={ handleFilter }
          >
            {selecOp.map((e) => (
              <option key={ e } value={ e }>{e}</option>
            ))}
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
          data-testid="button-remove-filters"
          onClick={ removeAll }
        >
          Remover todas filtragens
        </button>
      </section>
      <FilterList />
      <Table />
    </div>
  );
}

export default Planets;
