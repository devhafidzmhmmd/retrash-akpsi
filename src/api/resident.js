import axios from "axios";

import { RESIDENT } from "./endpoints";
import { getToken, removeToken } from "../utils/auth";

export const getResidentList = async (filter, sort) => {
    try {
        const param = new URLSearchParams({
            filter,
            sort,
        });
        const response = await axios({
            method: RESIDENT.LIST.METHOD,
            url: RESIDENT.LIST.URL,
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

export const createResident = async (name, phoneNumber) => {
    try {
        const response = await axios({
            method: RESIDENT.CREATE.METHOD,
            url: RESIDENT.CREATE.URL,
            data: {
                name,
                phoneNumber,
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
