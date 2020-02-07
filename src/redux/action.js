export const SIGN_IN = 'SIGN_IN';
export const GET_MY_PAGE = 'GET_MY_PAGE';
export const Edit = 'Edit';
export const CLICK = 'CLICK';
export const ClikPost = 'ClikPost';

export function signin(token) {
  return {
    type: SIGN_IN,
    token,
  };
}

export function mypage(post_count, tag_count) {
  return {
    type: GET_MY_PAGE,
    post_count,
    tag_count,
  };
}
export function EditState(boolean) {
  return {
    type: Edit,
    boolean,
  };
}
export function ClikedComponent(string) {
  return {
    type: CLICK,
    string,
  };
}
export function ClikedPost(title, contents) {
  return {
    type: ClikPost,
    title,
    contents,
  };
}
/** 디스패치가 실행되면 EditState의 리턴 객체가 리듀서로 전달된다. */
