// PrivateRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/AppUser";
import { me } from "../api/auth";
import { getToken } from "../utils/auth";

function PrivateRoute({ children }) {
    const { user, setUser } = useUser();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = getToken();
            const userData = await me(token);

            if (userData) {
                setUser(userData);
            } else {
                setUser(null);
            }
            setLoading(false);
        };

        if (!user) {
            checkAuth();
        } else {
            setLoading(false);
        }
    }, [user, setUser]);

    if (loading) return <div>Loading...</div>;

    return user ? children : <Navigate to="/auth/login" />;
}

export default PrivateRoute;
