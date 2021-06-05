import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3900/api/v1/";

  const getUserBoard = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
  };
  
  
  
  export default {
  
    getUserBoard
    
  };