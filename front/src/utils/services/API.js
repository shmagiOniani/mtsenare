import axios from "axios";
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
});

API.defaults.timeout = 5000;

API.withCredentials = true;

API.interceptors.request.use(function (config) {
  config.headers.token = token;
  config.headers.user = user;
  return config;
}, null, {});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // console.error("Token does not match!");
          // alert("Not Allowed");
          break;
        case 404:
        default: {
        }
      }
    }
    return Promise.reject(error);
  }
);

export default API;


// API.get(`/product`)
//   .then(res => console.log(res))
//   .catch((err) => console.log(err))
  
// API.post(`/product`, formValues)
//   .then(res => console.log(res))
//   .catch((err) => console.log(err))

// API.put(`/product/${id}`, formValues)
//   .then(res => console.log(res))
//   .catch((err) => console.log(err))

// API.delete(`/product/${id}`)
//   .then(res => console.log(res))
//   .catch((err) => console.log(err))




