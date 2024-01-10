import axios from "axios";
const { OAUTH_GIT_URL } = process.env;

export const oauthUserInstance = axios.create({
  baseURL: OAUTH_GIT_URL,
  headers: {
    Accept: "application/json"
  }
});
