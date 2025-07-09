import axios from "axios";

const snakeAPI = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default snakeAPI;
