import axios from "axios";

export const LOGIN_URL = "https://bancow.finseiz.com/api/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "api/me";

export function login(username, password) {
  const config = {
    headers: {            
        Accept: 'application/json',
        ContentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    }
};
  return axios.post(LOGIN_URL, { username:username, password:password }, config);
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
