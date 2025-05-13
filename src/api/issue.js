import axios from "axios";

import { ISSUE } from "./endpoints";
import { getToken, removeToken } from "../utils/auth";

export const issueList = async (filter, sort) => {
    try {
        const param = new URLSearchParams({
            filter,
            sort,
        });
        const response = await axios({
            method: ISSUE.LIST.METHOD,
            url: ISSUE.LIST.URL,
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

export const createIssue = async (description) => {
    try {
        const response = await axios({
            method: ISSUE.CREATE.METHOD,
            url: ISSUE.CREATE.URL,
            data: {
                description,
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
