import axios from "axios";

export const API_URL = "http://185.244.172.108:8081/";

export const eID = 30023;

const $api = axios.create({
  baseURL: API_URL,
});

export default $api;
