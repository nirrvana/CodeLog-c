import axios from 'axios';

// const HOST = "http://localhost:3000";

export function postSignInData(username, password) {
  return axios.post('', {
    username,
    password,
  });
}

export function getMyPageData(token) {
  return axios.get('', {
    token,
  });
}
