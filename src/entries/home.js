import React from 'react';
import { render } from 'react-dom';
import Home from '../pages/containers/home';
// import Playlist from './src/playlist/components/playlist';
// import data from '../api.json';
// console.log('Hola mundo!' )
// import data from '../schemas/index.js';

import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/index';
import { Map as map } from 'immutable';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// function logger ({ getState, dispatch}) {
//   // return (metodo para despachar el siguiente middleware)
//   return (next) => {
//     return (action) => {
//       console.log('Vamos a enviar esta accion', action)
//       const value = next(action)
//       console.log('Este es mi nuevo estado', getState().toJS())
//       return value
//     }
//   }
// }
const store = createStore(
  reducer,
  map(),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  composeWithDevTools (
    applyMiddleware(logger, thunk))
);

// console.log(store.getState());

const homeContainer = document.getElementById('home-container')

// ReactDOM.render(que voy a renderizar, donde lo haré);
// const holaMundo = <h1>hola Estudiante!</h1>;

render(
  <Provider store={store}>
    <Home />
  </Provider>
, homeContainer);
