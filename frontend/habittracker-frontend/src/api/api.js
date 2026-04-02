import axios from "axios";

const API = axios.create({
  baseURL: "https://habittracker-backend-yqel.onrender.com"
});

export default API;