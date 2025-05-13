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

export const updateInvoiceStatus = async (id, status) => {
    try {
        const response = await axios({
            method: INVOICE.UPDATE.METHOD,
            url: INVOICE.UPDATE.URL + id,
            data: {
                status
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

export const resendInvoice = async (id) => {
    try {
        const response = await axios({
            method: INVOICE.RESEND.METHOD,
            url: INVOICE.RESEND.URL(id),
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
