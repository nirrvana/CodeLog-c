import axios from 'axios';
axios.defaults.withCredentials = true;

const HOST = 'http://localhost:3001';

// ? Sign up
export function postSignUpData(
  email,
  password,
  username,
  certificate,
  personal_homepage,
) {
  return axios.post(`${HOST}/signup`, {
    email,
    password,
    username,
    certificate,
    personal_homepage,
  });
}

export function postCompanySignUpData(
  company_name,
  business_name,
  eid,
  company_homepage,
  member,
  partner,
  company_code,
) {
  return axios.post(`${HOST}/signup/company`, {
    company_name,
    business_name,
    eid,
    company_homepage,
    member,
    partner,
    company_code,
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

export function postCompanySignInData(company_code, username, password) {
  return axios.post(`${HOST}/signin/company`, {
    company_code,
    username,
    password,
  });
}

// ? Sign out
export function postSignOut() {
  return axios.post(`${HOST}/signout`);
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

export function getMyPageCompany() {
  return axios.get(`${HOST}/mypage/company`);
}

// ? Company my page
export function getCompanyMyPageData() {
  return axios.get(`${HOST}/mypage`);
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
export function PostEditPost(id, title, content, tags) {
  return axios.post(`${HOST}/post/update`, { id, title, content, tags });
}
// ? Delete post
export function PostDeletePost(id) {
  return axios.post(`${HOST}/post/delete`, { id });
}
