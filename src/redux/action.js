export const SIGN_IN = 'SIGN_IN';
export const GET_MY_PAGE = 'GET_MY_PAGE';

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
    tag_count
  };
}
