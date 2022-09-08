import axios from "axios";
import {} from "dotenv/config";

const config = {
  baseURL: " http://localhost:5000/",
  timeout: process.env.TIMEOUT,
  // withCredentials: true,
};

const axiosClient = () => {
  return axios.create({
    ...config,
  });
};
export { axiosClient };
