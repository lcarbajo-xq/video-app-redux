import { fromJS } from 'immutable';
import schema from '../schemas/index';

// console.log(data);
const initialState = fromJS({
    visibility: false,
    mediaId: null,
})


function modal(state = initialState, action) {
  switch (action.tyoe) {
    case 'OPEN_MODAL':
      return state.merge({
                          visibility: true,
                          mediaId: action.payload.mediaId,
                          })
    case 'CLOSE_MODAL':
      return state
    default:
      return state
  }
}

export default modal;
