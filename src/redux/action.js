export const SIGN_IN = 'SIGN_IN';
export const GET_MY_PAGE = 'GET_MY_PAGE';
export const POST_SELECT = 'POST_SELECT';
export const PAGE_SELECT = 'PAGE_SELECT';

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
export function currentPost(theme, title, contents) {
  return {
    type: POST_SELECT,
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
