/* eslint-disable no-console */
import { axiosClient } from "../plugins/interceptors/AxiosClient";

class EventCommentAPI {
    static getOne = async (id) => {
        try {
            const response = await axiosClient().get(`/api/eventComment/get/${id}`);
            console.log("API ~ event Comment ~ getOne ", response);
            return response;
        } catch (error) {
            console.log("ERROR-API ~ event Comment ~ getOne ", error);
            return error;
        }
    };

    static getAll = async () => {
        try {
            const response = await axiosClient().get("/api/eventComment/getAll");
            console.log("API ~ event Comment ~ getAll ", response);
            return response;
        } catch (error) {
            console.log("ERROR-API ~ event Comment ~ getAll ", error);
            return error;
        }
    };

    static create = async (payload) => {
        try {
            const response = await axiosClient().post(
                "/api/eventComment/create",
                payload
            );
            console.log("API ~ event Comment ~ create ", response);
            return response;
        } catch (error) {
            console.log("ERROR-API ~ event Comment ~ create ", error);
            return error;
        }
    };

    static update = async ({ commentId, payload }) => {
        try {
            const response = await axiosClient().put(
                `/api/eventComment/update/${commentId}`,
                payload
            );
            console.log("API ~ event Comment ~ update ", response);
            return response;
        } catch (error) {
            console.log("ERROR-API ~ event Comment ~ update ", error);
            return error;
        }
    };

    static delete = async ({ deleteId, payload }) => {
        try {
            const response = await axiosClient().put(
                `/api/eventComment/delete/${deleteId}`,
                payload
            );
            console.log("API ~ event Comment ~ delete ", response);
            return response;
        } catch (error) {
            console.log("ERROR-API ~ event Comment ~ delete ", error);
            return error;
        }
    };
}
export default EventCommentAPI;
