import api from '../api.json';

import { normalize, schema } from 'normalizr';


/*

SCHEMA.Entity

Primer dato: nombre para el objeto normalizado
Segundo dato: Definición de mi esquema (si queremos heredar un esquema dentro de éste)
Tercer datos: Opciones de personlaizacion

*/

/*processStrategy: Funcion que devuelve lo que queremos buscar en el padre
  - Value: Contiene el objeto que le pasamos a la funcion que queremos tratar -> Todos los valores de Media
  - Parent: Que será category
  - Key: Id del objeto Media que hemos asignado en idAttribute

  La funcion le pasamos {...value}, es decir, todo el contenido de Media (title, author, src etc.)
  y además le metemos un valor adicional que es 'category' = parent.id es decir le añadimos el valor id de su padre (categoria)
  */

const media = new schema.Entity('media', {}, {
  //idAttribute es el nombre que le ponemos al key de cada elemento del esquema
  idAttribute: 'id',

  processStrategy: (value, parent, key) => ({...value, category: parent.id})
})

const category = new schema.Entity('categories', {
  playlist: new schema.Array(media)
})

const categories =  { categories: new schema.Array(category)}


// A normalize le paso mis datos (api) y mi esquema
const normalizedData = normalize(api, categories);

export default normalizedData;
