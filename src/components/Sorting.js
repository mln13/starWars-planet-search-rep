import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

function Sorting() {
  const { arrayOption, sortBy, setSortBy, planets, setPlanets } = useContext(AppContext);
  const [radio, setRadio] = useState('ASC');
  const [submitSort, setSubmitSort] = useState(1);
  function changeSort({ target: { name, value } }) {
    setSortBy({ order: { ...sortBy.order, [name]: value } });
  }
  function clickSort({ target: { name, value } }) {
    setSortBy({ order: { ...sortBy.order, [name]: value } });
    const sub = submitSort + 1;
    setSubmitSort(sub);
  }

  useEffect(() => {
    const { order: { column, sort } } = sortBy;
    const filterUnk = planets.filter((e) => e[column] !== 'unknown');
    const arrayUnk = planets.filter((e) => e[column] === 'unknown');
    switch (sort) {
    case 'DESC': {
      filterUnk.sort((a, b) => b[column] - a[column]);
      break;
    }
    default: {
      filterUnk.sort((a, b) => a[column] - b[column]);
    }
    }
    return setPlanets([...filterUnk, ...arrayUnk]);
  }, [submitSort]);

  return (
    <section>
      <select
        name="column"
        data-testid="column-sort"
        onChange={ changeSort }
      >
        {arrayOption.map((e) => (
          <option key={ e } value={ e }>{e}</option>
        ))}
      </select>
      <label htmlFor="sortId1">
        <input
          name="sortInput"
          id="sortId1"
          value="ASC"
          data-testid="column-sort-input-asc"
          type="radio"
          onChange={ (e) => setRadio(e.target.value) }
        />
        ASC
      </label>
      <label htmlFor="sortId2">
        <input
          data-testid="column-sort-input-desc"
          value="DESC"
          name="sortInput"
          id="sortId2"
          type="radio"
          onChange={ (e) => setRadio(e.target.value) }
        />
        DESC
      </label>
      <button
        data-testid="column-sort-button"
        name="sort"
        type="button"
        value={ radio }
        onClick={ clickSort }
      >
        Order
      </button>
    </section>
  );
}

export default Sorting;
