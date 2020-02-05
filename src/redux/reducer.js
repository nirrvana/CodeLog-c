import { combineReducers } from 'redux';
import { SIGN_IN } from './action';

const initialSessionState = {
  token: null
};

function session(state = initialSessionState, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return {
        state,
      };
  }
}

const reducer = combineReducers({
  session,
});

export default reducer;
