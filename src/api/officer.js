// import qs from "qs";
import axios from "axios";

import { OFFICER } from "./endpoints";
import { getToken, removeToken } from "../utils/auth";

export const getOfficerList = async (filter, sort) => {
    try {
        const param = new URLSearchParams({
            filter,
            sort,
        });
        const response = await axios({
            method: OFFICER.LIST.METHOD,
            url: OFFICER.LIST.URL,
            data: param.toString(),
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        } else {
            return false;
        }
    } catch (error) {
        if (error.response.status === 403) {
            removeToken();
        }
        return false;
    }
};

export const createOfficer = async (username, password, type) => {
    try {
        const response = await axios({
            method: OFFICER.CREATE.METHOD,
            url: OFFICER.CREATE.URL,
            data: {
                username,
                password,
                type,
            },
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        } else {
            return false;
        }
    } catch (error) {
        if (error.response.status === 403) {
            removeToken();
        }
        return false;
    }
};

export const updateOfficer = async (id, username, type) => {
    try {
        const response = await axios({
            method: OFFICER.UPDATE.METHOD,
            url: OFFICER.UPDATE.URL + id,
            data: {
                id,
                username,
                type,
            },
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        } else {
            return false;
        }
    } catch (error) {
        if (error.response.status === 403) {
            removeToken();
        }
        return false;
    }
};
