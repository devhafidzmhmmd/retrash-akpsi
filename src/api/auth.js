import axios from "axios";
import { AUTH } from "./endpoints";

export const login = async (username, password) => {
    try {
        const response = await axios({
            method: AUTH.LOGIN.METHOD,
            url: AUTH.LOGIN.URL,
            data: {
                username,
                password,
            },
        });
        if (response.status === 200) {
            return response.data;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

export const me = async (token) => {
    try {
        const response = await axios({
            method: AUTH.ME.METHOD,
            url: AUTH.ME.URL,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};
