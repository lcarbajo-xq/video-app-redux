import { fromJS } from 'immutable';
import schema from '../schemas/index';

// console.log(data);
const initialState = fromJS({
    entities: schema.entities,
    categories: schema.result.categories,
    search: '',
})

function data(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_VIDEO': {
        return state.set('search', action.payload.query)
    }
    default:
      return state
  }
}

export default data;
