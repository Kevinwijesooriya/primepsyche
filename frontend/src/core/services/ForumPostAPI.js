/* eslint-disable no-console */
import { axiosClient } from "../plugins/interceptors/AxiosClient";

class ForumPostAPI {
  static getOne = async (id) => {
    try {
      const response = await axiosClient().get(`/api/forumPost/get/${id}`);
      console.log("API ~ ForUm Post ~ getOne ", response);
      return response;
    } catch (error) {
      console.log("ERROR-API ~ Forum Post ~ getOne ", error);
      return error;
    }
  };

  static getAll = async () => {
    try {
      const response = await axiosClient().get("/api/forumPost/getAll");
      console.log("API ~ Forum Post ~ getAll ", response);
      return response;
    } catch (error) {
      console.log("ERROR-API ~ Forum Post ~ getAll ", error);
      return error;
    }
  };

  static create = async (payload) => {
    try {
      const response = await axiosClient().post(
        "/api/forumPost/create",
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
        `/api/forumPost/update/${postId}`,
        payload
      );
      console.log("API ~ Forum Post ~ update ", response);
      return response;
    } catch (error) {
      console.log("ERROR-API ~ Forum Post ~ update ", error);
      return error;
    }
  };

  static delete = async (emailId) => {
    try {
      const response = await axiosClient().delete(
        `/api/forumPost/delete/${emailId}`
      );
      console.log("API ~ Forum Post ~ delete ", response);
      return response;
    } catch (error) {
      console.log("ERROR-API ~ Forum Post ~ delete ", error);
      return error;
    }
  };
}
export default ForumPostAPI;
