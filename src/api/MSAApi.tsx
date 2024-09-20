import axios from 'axios';

export default axios.create({
  baseURL: `${process.env.REACT_APP_DOCKER_API_URL}`
});
