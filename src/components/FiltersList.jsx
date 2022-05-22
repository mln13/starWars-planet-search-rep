import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

function FilterList() {
  const [count, setCount] = useState(1);
  const {
    // arrayOption,
    // setArrayOption,
    filters,
    setFilters,
    returnPlanets,
    // setReturnPlanets,
    // planets,
    setPlanets,
  } = useContext(AppContext);
  useEffect(() => {
    if (filters.length === 0) {
      setPlanets(returnPlanets);
    } else {
      filters.map(({ columnFilter, comparinsonFilter, valueFilter }) => {
        switch (comparinsonFilter) {
        case 'maior que': {
          setPlanets(returnPlanets
            .filter((element) => (Number(element[columnFilter]) > Number(valueFilter))
            && (element[columnFilter] !== 'unknown')));
          break;
        }
        case 'menor que': {
          setPlanets(returnPlanets
            .filter((element) => (Number(element[columnFilter]) < Number(valueFilter))
              && (element[columnFilter] !== 'unknown')));
          break;
        }
        case 'igual a': {
          setPlanets(returnPlanets
            .filter((element) => (element[columnFilter] === valueFilter)
                && (element[columnFilter] !== 'unknown')));
          break;
        }
        default: {
          console.log('default');
          setPlanets(returnPlanets);
        }
        }
        return console.log('removido');
      });
    }
  }, [count]);

  const handleRemoveFilter = (index) => {
    const remove = filters.filter((_e, filterIndex) => index !== filterIndex);
    setFilters(remove);
    const newCount = count + 1;
    setCount(newCount);
  };

  return (
    <ul>
      {filters.map((e, index) => (
        <li key={ index }>
          {e.columnFilter }
          {e.comparinsonFilter }
          {e.valueFilter}
          <button
            type="button"
            data-testid="filter"
            onClick={ () => handleRemoveFilter(index) }
          >
            X
          </button>
        </li>))}
    </ul>
  );
}

export default FilterList;
