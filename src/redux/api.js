import axios from 'axios';
axios.defaults.withCredentials = true;

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

export function getTags() {
  return axios.get(`${HOST}/tags`);
}

export function postPlainPost(theme, title, content, selected_tags) {
  return axios.post(`${HOST}/post`, {
    theme,
    title,
    content,
    selected_tags,
  });
}

export function postDevPost(theme, title, content, selected_tags) {
  return axios.post(`${HOST}/post`, {
    theme,
    title,
    content,
    selected_tags,
  });
}
