import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
  timeout: 1000,
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  console.log("ooooooo")
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  console.log("------------------------")
  return response;
}, function (error) {



  return Promise.reject(error);
});
export {instance};