import axios from 'axios';

const HOST = 'http://localhost:3000';

export function postSignInData(username, password) {
  return axios.post('', {
    username,
    password,
  });
}

export function postCodeData(code) {
  return axios.post('', {
    code,
  });
}

export function getMyPageData(token) {
  return axios.get('', {
    token,
  });
}

export function getHashTagList() {
  return axios.get('');
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
  return axios.post('', {
    title,
    ProjectConcept,
    CodingStrategy,
    CodingDifficulty,
    Reference,
    Lesson,
    selected_tag_list,
  });
}
