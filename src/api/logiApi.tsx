import axios from 'axios';

const baseURL = process.env.REACT_APP_DOCKER_API_URL;
console.log(baseURL); // 환경변수 로그 출력

export default axios.create({
  baseURL: baseURL
});