import { combineReducers } from 'redux';
import { SIGN_IN, GET_MY_PAGE } from './action';

const sessionInitialState = {
  token: null,
};

function session(state = sessionInitialState, action) {
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

const mypageInitialState = {
  post_count: null,
  tag_count: null,
};

function mypage(state = mypageInitialState, action) {
  switch (action.type) {
    case GET_MY_PAGE:
      return {
        ...state,
        post_count: action.post_count,
        tag_count: action.tag_count,
      };
    default:
      return {
        state,
      };
  }
}

const reducer = combineReducers({
  session,
  mypage
});

export default reducer;
