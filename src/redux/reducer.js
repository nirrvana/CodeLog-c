import { combineReducers } from 'redux';
import { SIGN_IN, GET_MY_PAGE, Edit, CLICK, ClikPost } from './action';

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
const isEditInitialState = {
  isEdit: false,
  clickedComponent: null,
  ClikedPost: {
    title: 'What is Dev post ?',
    contents: ['concept', 'Strategy', 'error', 'reference', 'lesson'],
  },
};

function isEdit(state = isEditInitialState, action) {
  /**
   * 전달된 엑션의 타입이 에딧이면 스테이트를 변경하는데
   * 이즈에딧 스테이트를 엑션의 불린으로 변경된 객체를 반환한다.
   * */
  switch (action.type) {
    case Edit:
      return Object.assign({}, state, {
        isEdit: action.boolean,
      });
    case CLICK:
      return Object.assign({}, state, {
        clickedComponent: action.string,
      });
    case ClikPost:
      return Object.assign({}, state, {
        ClikedPost: { title: action.title, contents: action.contents },
      });

    default:
      return {
        state,
      };
  }
}

const reducer = combineReducers({
  session,
  mypage,
  isEdit,
});

export default reducer;
