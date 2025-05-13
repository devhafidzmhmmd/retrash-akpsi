const BASE_URL = "https://api.wizz.biz.id/v1";

const AUTH = {
    LOGIN: {
        URL: `${BASE_URL}/auth/login`,
        METHOD: "POST",
    },
    ME: {
        URL: `${BASE_URL}/auth/me`,
        METHOD: "GET",
    },
};

const OFFICER = {
    LIST: {
        URL: `${BASE_URL}/officers`,
        METHOD: "GET",
    },
    CREATE: {
        URL: `${BASE_URL}/officers/register`,
        METHOD: "POST",
    },
    UPDATE: {
        URL: `${BASE_URL}/officers/`,
        METHOD: "PATCH",
    },
};

const ISSUE = {
    LIST: {
        URL: `${BASE_URL}/issues`,
    },
};

const RESIDENT = {
    LIST: {
        URL: `${BASE_URL}/residents`,
        METHOD: "GET",
    },
    CREATE: {
        URL: `${BASE_URL}/residents`,
        METHOD: "POST",
    },
    UPDATE: {
        URL: `${BASE_URL}/residents/`,
        METHOD: "PATCH",
    },
};

const TRANSACTION = {
    LIST: {
        URL: `${BASE_URL}/transactions`,
        METHOD: "GET",
    },
};

const INVOICE = {
    LIST: {
        URL: `${BASE_URL}/invoices`,
        METHOD: "GET",
    },
    UPDATE: {
        URL: `${BASE_URL}/invoices/`,
        METHOD: "PATCH",
    },
    RESEND: {
        URL: (id) => `${BASE_URL}/invoices/${id}/resend`,
        METHOD: "POST",
    },
};

export { AUTH, OFFICER, ISSUE, RESIDENT, TRANSACTION, INVOICE };
