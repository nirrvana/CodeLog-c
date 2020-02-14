import { combineReducers } from 'redux';
import { SIGN_IN, GET_MY_PAGE, POST_SELECT, PAGE_SELECT } from './action';

const sessionInitialState = {
  isLogin: false,
};

function session(state = sessionInitialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        isLogin: true,
      };
    default:
      return state;
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
      return state;
  }
}
const PostInitialState = {
  currentPost: {
    id: null,
    theme: null,
    title: null,
    contents: null,
  },
  currentPage: null,
};

function PostState(state = PostInitialState, action) {
  switch (action.type) {
    case POST_SELECT:
      return Object.assign({}, state, {
        currentPost: {
          id: action.id,
          theme: action.theme,
          title: action.title,
          contents: action.contents,
        },
      });
    case PAGE_SELECT:
      return Object.assign({}, state, {
        currentPage: action.page,
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
