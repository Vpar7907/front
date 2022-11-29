import axios from "axios";

export const API_URL = "185.244.172.108:8081";

export const eID = 1;

const $api = axios.create({
  baseURL: API_URL,
});

export default $api;
