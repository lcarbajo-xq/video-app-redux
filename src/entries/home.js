import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../pages/containers/home';
import data from '../api.json';
import { createStore } from 'redux';
import normalizedData from '../schemas/index';
import { Provider } from 'react-redux';
import reducer from '../reducers/data';

console.log(normalizedData);
const initialState = {
  data: {
    ...data
  },
  search: []
}

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


console.log(store.getState());

//PROVIDER ES UN CONTENEDOR UTILIZADO PARA CREAR SUBCOMPONENTES Y MANDARLES UN STORE HEREDADO

//ReactDOM render(que voy a renderizar, donde lo voy a renderizar)
const homeContainer = document.getElementById('home-container');
ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider> ,
  homeContainer);
