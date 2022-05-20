import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function FilterList() {
  const {
    filters,
    setFilters,
  } = useContext(AppContext);
  const handleRemoveFilter = (index) => {
    const remove = filters.filter((_e, filterIndex) => index !== filterIndex);
    setFilters(remove);
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
            onClick={ () => handleRemoveFilter(index) }
          >
            X
          </button>
        </li>))}
    </ul>
  );
}

export default FilterList;
