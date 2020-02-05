import { createStore } from 'redux';

const ADD = 'ADD';
const SignUp = 'SignUp';

// ! 기본 state, old state
const defaulState = {
  isSignUp: false,
};

// ! 엑션 type으로 사용될 객체를 만드는 함수
const addToDo = (SignUpData) => {
  return {
    type: ADD,
    SignUpData,
  };
};
const handleRegisterBtnOnClick = (boolean) => {
  return {
    type: SignUp,
    boolean,
  };
};

// ! redux에서 setState 같은 역할
const reducer = (state = defaulState, action) => {
  switch (action.type) {
    case ADD:
      return Object.assign({}, state, {
        SignUpData: action.SignUpData,
        id: Date.now(),
      });
    case SignUp:
      return Object.assign({}, state, { isSignUp: action.boolean });
    default:
      return state;
  }
};
const store = createStore(reducer);

// ! 편의상 묶어서 export한 것
export const actionCreators = {
  addToDo,
  handleRegisterBtnOnClick,
};
export default store;
