import React, { createContext, useState, useContext } from "react";
import { Snackbar, Alert } from "@mui/material";

// 1. Buat Context
const AlertContext = createContext();

// 2. Provider
export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({
        open: false,
        severity: "info",
        message: "",
    });

    const showAlert = (severity, message) => {
        setAlert({ open: true, severity, message });
    };

    const closeAlert = () => {
        setAlert((prev) => ({ ...prev, open: false }));
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            <Snackbar
                open={alert.open}
                autoHideDuration={3000}
                onClose={closeAlert}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={closeAlert}
                    severity={alert.severity}
                    sx={{ width: "100%" }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    );
};

// 3. Custom Hook
export const useAlert = () => useContext(AlertContext);
