import axios from "axios";

const API_URL = "http://localhost:3900/api/v1/";

const login = (email, password) => {
    return axios
      .post(API_URL + "auth/login", {
        email,
        password,
      })
      .then((response) => {
          console.log(response.data.data, "response")
        if (response.data.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }
  
        return response.data;
      });
  };
  
const logout = () => {
    localStorage.removeItem("user");
  };
  
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  
  export default {
    login,
    logout,
    getCurrentUser
  };