import api from '../api.json';

import { normalize, schema } from 'normalizr';


/*
Primer dato: nombre para el objeto normalizado
Definición de mi esquema

*/
const media = new schema.Entity('media', {}, {
  idAttribute: 'id',
  processStrategy: (value, parent, key) => ({...value, category: parent.id})
})

const category = new schema.Entity('categories', {
  playlist: new schema.Array(media)
})

const categories =  { categories: new schema.Array(category)}

const normalizedData = normalize(api, categories);

export default normalizedData;
