/* eslint-disable no-console */
import { axiosClient } from "../plugins/interceptors/AxiosClient";

class HelpPostAPI {
  static getOne = async (id) => {
    try {
      const response = await axiosClient().get(`/api/HelpPost/get/${id}`);
      console.log("API ~ Help Post ~ getOne ", response);
      return response;
    } catch (error) {
      console.log("ERROR-API ~ Help Post ~ getOne ", error);
      return error;
    }
  };
  static getMyPost = async (id) => {
    try {
      const response = await axiosClient().get(`/api/HelpPost/getMy/${id}`);
      console.log("API ~ Help Post ~ getOne ", response);
      return response;
    } catch (error) {
      console.log("ERROR-API ~ Help Post ~ getOne ", error);
      return error;
    }
  };

  static getAll = async () => {
    try {
      const response = await axiosClient().get("/api/HelpPost/getAll");
      console.log("API ~ Help Post ~ getAll ", response);
      return response;
    } catch (error) {
      console.log("ERROR-API ~ Help Post ~ getAll ", error);
      return error;
    }
  };

  static create = async (payload) => {
    try {
      const response = await axiosClient().post(
        "/api/HelpPost/create",
        payload
      );
      console.log("API ~ Forum Post ~ create ", response);
      return response;
    } catch (error) {
      console.log("ERROR-API ~ Forum Post ~ create ", error);
      return error;
    }
  };

  static update = async ({ postId, payload }) => {
    try {
      const response = await axiosClient().put(
        `/api/HelpPost/update/${postId}`,
        payload
      );
      console.log("API ~ Help Post ~ update ", response);
      return response;
    } catch (error) {
      console.log("ERROR-API ~ Help Post ~ update ", error);
      return error;
    }
  };

  static delete = async (emailId) => {
    try {
      const response = await axiosClient().delete(
        `/api/HelpPost/delete/${emailId}`
      );
      console.log("API ~ Help Post ~ delete ", response);
      return response;
    } catch (error) {
      console.log("ERROR-API ~ Help Post ~ delete ", error);
      return error;
    }
  };
}
export default HelpPostAPI;
