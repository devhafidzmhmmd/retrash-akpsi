import axios from "axios";

const API_URL = "https://api.wizz.biz.id/v1";

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            username,
            password,
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
