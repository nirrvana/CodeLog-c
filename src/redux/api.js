import axios from 'axios';
axios.defaults.withCredentials = true;

const HOST = 'http://localhost:3001';

// ? Sign up
export function postSignUpData(
  email,
  password,
  username,
  companyid,
  rank,
  completion,
  website,
) {
  return axios.post(`${HOST}/signup`, {
    email,
    password,
    username,
    companyid,
    rank,
    completion,
    website,
  });
}
export function postCompanySignUpData(
  Corporate,
  company,
  website,
  isPartner,
  AccessCode,
  agreement,
) {
  return axios.post(`${HOST}/signup`, {
    Corporate,
    company,
    website,
    isPartner,
    AccessCode,
    agreement,
  });
}
export function postEmailDuplicate(email) {
  return axios.post(`${HOST}/duplicate`, {
    email,
  });
}

// ? Sign in
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

// ? Home
export function getHomeData() {
  return axios.get(`${HOST}/home`);
}

// ? My page
export function getMyPageData(token) {
  return axios.get(`${HOST}/mypage`, {
    token,
  });
}

export function getTags() {
  return axios.get(`${HOST}/tags`);
}

// ? Write post
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

export function postTechPost(theme, title, content, selected_tags) {
  return axios.post(`${HOST}/post`, {
    theme,
    title,
    content,
    selected_tags,
  });
}

export function postTILPost(theme, title, content, selected_tags) {
  return axios.post(`${HOST}/post`, {
    theme,
    title,
    content,
    selected_tags,
  });
}

// ? Get post
export function getBlogPost() {
  return axios.get(`${HOST}/blog`);
}
export function getSelectPost(id) {
  return axios.get(`${HOST}/post/${id}`);
}

// ? Edit post
export function PostEditPost(id, title, content) {
  return axios.post(`${HOST}/post/update`, { id, title, content });
}
// ? Delete post
export function PostDeletePost(id) {
  return axios.post(`${HOST}/post/delete`, { id });
}
