import axios from 'axios';

const HOST = 'http://localhost:3001';

export function postSignInData(email, password) {
  return axios.post(`${HOST}/signin`, {
    email,
    password,
  });
}

export function postCodeData(code) {
  return axios.post(`${HOST}/github_code`, {
    code,
  });
}

export function getMyPageData(token) {
  return axios.get(`${HOST}/mypage`, {
    token,
  });
}

export function getHashTagList() {
  return axios.get(`${HOST}/hashtag`);
}

export function postPlainPost(theme, title, content, selected_tags) {
  return axios.post(`${HOST}/plainpost`, {
    theme,
    title,
    content,
    selected_tags,
  });
}

export function postDevPost(
  title,
  ProjectConcept,
  CodingStrategy,
  CodingDifficulty,
  Reference,
  Lesson,
  selected_tag_list,
) {
  return axios.post(`${HOST}/devpost`, {
    title,
    ProjectConcept,
    CodingStrategy,
    CodingDifficulty,
    Reference,
    Lesson,
    selected_tag_list,
  });
}
