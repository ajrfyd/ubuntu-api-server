import axios from "axios";
const { OAUTH_GIT_USER_URL } = process.env;

export const getUserInfoInstance = axios.create({
  baseURL: OAUTH_GIT_USER_URL,
});