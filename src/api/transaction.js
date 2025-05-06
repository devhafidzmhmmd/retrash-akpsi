import axios from "axios";

import { TRANSACTION } from "./endpoints";
import { getToken, removeToken } from "../utils/auth";

export const getTransactionList = async (filter, sort) => {
    try {
        const param = new URLSearchParams({
            filter,
            sort,
        });
        const response = await axios({
            method: TRANSACTION.LIST.METHOD,
            url: TRANSACTION.LIST.URL,
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
