import axios from "axios";

import { INVOICE } from "./endpoints";
import { getToken, removeToken } from "../utils/auth";

export const getInvoiceList = async (filter, sort) => {
    try {
        const param = new URLSearchParams({
            filter,
            sort,
        });
        const response = await axios({
            method: INVOICE.LIST.METHOD,
            url: INVOICE.LIST.URL,
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
