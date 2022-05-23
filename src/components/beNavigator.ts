import axios from 'axios';

const BASE_URL = 'https://stark-shore-23540.herokuapp.com';

const instance = axios.create({
  baseURL: BASE_URL,
});

export default instance;
