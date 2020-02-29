export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const USER_TYPE = 'USER_TYPE';
export const GET_MY_PAGE = 'GET_MY_PAGE';
export const POST_SELECT = 'POST_SELECT';
export const PAGE_SELECT = 'PAGE_SELECT';

export function signin() {
  return {
    type: SIGN_IN,
  };
}

export function signout() {
  return {
    type: SIGN_OUT,
  };
}
export function isCompanyUser() {
  return {
    type: USER_TYPE,
  };
}

export function mypage(post_count, tag_count) {
  return {
    type: GET_MY_PAGE,
    post_count,
    tag_count,
  };
}

export function currentPost(id, theme, title, contents) {
  return {
    type: POST_SELECT,
    id,
    theme,
    title,
    contents,
  };
}

export function currentPage(page) {
  return {
    type: PAGE_SELECT,
    page,
  };
}
