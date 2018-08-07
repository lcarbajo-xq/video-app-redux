import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../pages/containers/home';
// import data from '../api.json';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers/index';
import { Map as map} from 'immutable';


// console.log(data);
// const initialState = {
//   data: { // PARTE DE MANEJO DE DATOS
//     entities: data.entities,
//     categories: data.result.categories,
//     search: [],
//   }, //PARTE DE UI
//   modal: {
//     visibility: false,
//     mediaId: null,
//   }
// }

const store = createStore(
  reducer,
  map(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


// console.log(store.getState());

//PROVIDER ES UN CONTENEDOR UTILIZADO PARA CREAR SUBCOMPONENTES Y MANDARLES UN STORE HEREDADO

//ReactDOM render(que voy a renderizar, donde lo voy a renderizar)
const homeContainer = document.getElementById('home-container');
ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider> ,
  homeContainer);
