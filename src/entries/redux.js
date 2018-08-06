import { createStore } from 'redux';

const $form = document.getElementById('form');
$form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault(); //Evitar que se recargue la pagina (accion por defecto)
  const data = new FormData($form);
  const title = data.get('title');
  console.log(title);
  store.dispatch({
    type: 'ADD_SONG',
    payload: { //Mejor enviar un objeto por si la entrada es de varios datos en el futuro
        title,
    }
  })
}

const initialState = [
  {
    "title": "One more thing",
  },
  {
    "title": "No me sé más",
  },
  {
    "title": "Holita vecino",
  }
]

const reducer = function (state, action) {
  switch (action.type) {
    case 'ADD_SONG':
      return [...state, action.payload]
    default:
      return state
  }
}

const store = createStore (
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


function render () {
  const $container = document.getElementById('playlist'); //Creo un "container" en el div de redux.html "playlist"
  const playlist = store.getState(); //Meto en la constante playlist mi store
  $container.innerHTML =''; //Inicializa container a una cadena vacia
  playlist.forEach ((item) => { //Store tiene tres elementos, y hago un bucle por cada uno
    const template = document.createElement ('p'); //Creo un elemento html parrafo
    template.textContent = item.title; //Dentro del parrafo introduzco la etiqueta "title" de mi elemento del store
    $container.appendChild(template);//Agrego el parrafo a mi container
  })
}

/* EXPLICACION DEL PROCESO REDUX EN NUESTRA PAGINA

CUANDO CARGO LA PAGINA POR PRIMERA VEZ, EJECUTA RENDER() Y NOS MUESTRA EL STORE INICIAL.
SI HACEMOS UN SUBMIT EN EL FORMULARIO (TRIGGER) => HACE UN DISPATCH (DEFINIR UN ACTION, QUE ES ENVIADO A REDUCER) Y EJECUTA LA ACCION
ADD_SONG QUE EN EL REDUCER SE DEFINE COMO AÑADIR EL PAYLOAD AL STATE ANTERIOR
EL STORE DETECTA EL DISPATCH Y LANZA EL SUBSCRIBE QUE RE-RENDERIZA LA PAGINA LLAMANDO A handleChange => RENDER ()
CON LO CUAL VUELVE A IMPRIMIR EL STORE EN PANTALLA.

*/

render();

function handleChange () {
  render();
}

store.subscribe(handleChange) //sOLO ES LLAMADO SI HAY CAMBIO EN EL STORE

console.log(store.getState())
