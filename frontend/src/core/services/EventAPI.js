/* eslint-disable no-console */
import { axiosClient } from "../plugins/interceptors/AxiosClient";

class EventAPI {
    static getOne = async (id) => {
        try {
            const response = await axiosClient().get(`/api/event/get/${id}`);
            console.log("API ~ Event ~ getOne ", response);
            return response;
        } catch (error) {
            console.log("ERROR-API ~ Event ~ getOne ", error);
            return error;
        }
    };

    static getAll = async () => {
        try {
            const response = await axiosClient().get("/api/event/getAll");
            console.log("API ~ Event ~ getAll ", response);
            return response;
        } catch (error) {
            console.log("ERROR-API ~ Event ~ getAll ", error);
            return error;
        }
    };

    static create = async (payload) => {
        try {
            const response = await axiosClient().post(
                "/api/event/create",
                payload
            );
            console.log("API ~ Event ~ create ", response);
            return response;
        } catch (error) {
            console.log("ERROR-API ~ Event ~ create ", error);
            return error;
        }
    };

    static update = async ({ eventId, payload }) => {
        try {
            const response = await axiosClient().put(
                `/api/event/update/${eventId}`,
                payload
            );
            console.log("API ~ Event ~ update ", response);
            return response;
        } catch (error) {
            console.log("ERROR-API ~ Event ~ update ", error);
            return error;
        }
    };

    static delete = async (emailId) => {
        try {
            const response = await axiosClient().delete(
                `/api/event/delete/${emailId}`
            );
            console.log("API ~ Event ~ delete ", response);
            return response;
        } catch (error) {
            console.log("ERROR-API ~ Event ~ delete ", error);
            return error;
        }
    };

    static getMyEvents = async (eventId) => {
        try {
            const response = await axiosClient().get(`/api/event/getMy/${eventId}`);
            console.log("API ~ Event ~ getMy ", response);
            return response;
        } catch (error) {
            console.log("ERROR-API ~ Event ~ getMy ", error);
            return error;
        }
    };
}
export default EventAPI;
