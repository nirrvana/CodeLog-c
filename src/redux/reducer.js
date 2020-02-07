import { combineReducers } from 'redux';
import { SIGN_IN, GET_MY_PAGE, POST_SELECT } from './action';

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
const PostInitialState = {
  currentPost: {
    theme: null,
    title: null,
    contents: null,
  },
};

function PostState(state = PostInitialState, action) {
  switch (action.type) {
    case POST_SELECT:
      return Object.assign({}, state, {
        currentPost: {
          theme: action.theme,
          title: action.title,
          contents: action.contents,
        },
      });

    default:
      return state;
  }
}

const reducer = combineReducers({
  session,
  mypage,
  PostState,
});

export default reducer;
