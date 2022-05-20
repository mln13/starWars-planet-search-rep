// import { useContext } from 'react';
// import AppContext from '../context/AppContext';

// function Filter() {
//   const {
//     planets,
//     filters,
//     setPlanets,
//   } = useContext(AppContext);
//   return (
//     filters.map(({ comparinsonFilter, valueFilter }) => {
//       switch (comparinsonFilter) {
//       case 'maior que': {
//         setPlanets(planets
//           .filter((element) => (Number(element.population) > Number(valueFilter))
//           && (element.population !== 'unknown')));
//         break;
//       }
//       case 'menor que': {
//         setPlanets(planets
//           .filter((element) => (element.population < valueFilter)
//             && (element.population !== 'unknown')));
//         break;
//       }
//       case 'igual a': {
//         setPlanets(planets
//           .filter((element) => (element.population === valueFilter)
//             && (element.population !== 'unknown')));
//         break;
//       }
//       default: console.log('no filters');
//       }
//       return console.log('filtered');
//     })
//   );
// }

// export default Filter;
