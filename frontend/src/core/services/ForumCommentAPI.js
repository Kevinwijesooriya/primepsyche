/* eslint-disable no-console */
import { axiosClient } from "../plugins/interceptors/AxiosClient";

class ForumCommentAPI {
  static getOne = async (id) => {
    try {
      const response = await axiosClient().get(`/api/forumComment/get/${id}`);
      console.log("API ~ ForUm Comment ~ getOne ", response);
      return response;
    } catch (error) {
      console.log("ERROR-API ~ Forum Comment ~ getOne ", error);
      return error;
    }
  };

  static getAll = async () => {
    try {
      const response = await axiosClient().get("/api/forumComment/getAll");
      console.log("API ~ Forum Comment ~ getAll ", response);
      return response;
    } catch (error) {
      console.log("ERROR-API ~ Forum Comment ~ getAll ", error);
      return error;
    }
  };

  static create = async (payload) => {
    try {
      const response = await axiosClient().post(
        "/api/forumComment/create",
        payload
      );
      console.log("API ~ Forum Comment ~ create ", response);
      return response;
    } catch (error) {
      console.log("ERROR-API ~ Forum Comment ~ create ", error);
      return error;
    }
  };

  static update = async ({ commentId, payload }) => {
    try {
      const response = await axiosClient().put(
        `/api/forumComment/update/${commentId}`,
        payload
      );
      console.log("API ~ Forum Comment ~ update ", response);
      return response;
    } catch (error) {
      console.log("ERROR-API ~ Forum Comment ~ update ", error);
      return error;
    }
  };

  static delete = async ({ deleteId, payload }) => {
    try {
      const response = await axiosClient().put(
        `/api/forumComment/delete/${deleteId}`,
        payload
      );
      console.log("API ~ Forum Comment ~ delete ", response);
      return response;
    } catch (error) {
      console.log("ERROR-API ~ Forum Comment ~ delete ", error);
      return error;
    }
  };
}
export default ForumCommentAPI;
