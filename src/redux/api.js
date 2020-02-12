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

// ? My page
export function getMyPageData(token) {
  return axios.get(`${HOST}/mypage`, {
    token,
  });
}

export function getHashTagList() {
  return axios.get(`${HOST}/hashtag`);
}

// ? Write post
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

// ? Get post
export function getBlogPost() {
  return axios.get(`${HOST}/blog/main`);
}
export function getSelectPost(id) {
  return axios.get(`${HOST}/post/${id}`);
}
