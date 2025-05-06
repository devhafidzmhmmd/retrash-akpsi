// Router.jsx
import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/full/shared/loadable/Loadable";
import PrivateRoute from "./PrivateRoute"; // Pisahkan komponen ini
import { UserProvider } from "../context/AppUser";

/* Layouts */
const FullLayout = Loadable(lazy(() => import("../layouts/full/FullLayout")));
const BlankLayout = Loadable(
    lazy(() => import("../layouts/blank/BlankLayout"))
);

/* Pages */
const Dashboard = Loadable(lazy(() => import("../views/dashboard/Dashboard")));
const Resident = Loadable(lazy(() => import("../views/resident/Resident")));
const Payment = Loadable(lazy(() => import("../views/payment/Payment")));
const Report = Loadable(lazy(() => import("../views/report/Report")));
const Bills = Loadable(lazy(() => import("../views/bills/Bills")));
const Users = Loadable(lazy(() => import("../views/users/Users")));
const Error = Loadable(lazy(() => import("../views/authentication/Error")));
const Register = Loadable(
    lazy(() => import("../views/authentication/Register"))
);
const Login = Loadable(lazy(() => import("../views/authentication/Login")));

const Router = [
    {
        path: "/",
        element: (
            <UserProvider>
                <PrivateRoute>
                    <FullLayout />
                </PrivateRoute>
            </UserProvider>
        ),
        children: [
            { path: "/", element: <Navigate to="/dashboard" /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/resident", element: <Resident /> },
            { path: "/payment", element: <Payment /> },
            { path: "/report", element: <Report /> },
            { path: "/bill", element: <Bills /> },
            { path: "/user", element: <Users /> },
        ],
    },
    {
        path: "/auth",
        element: <BlankLayout />,
        children: [
            { path: "404", element: <Error /> },
            { path: "register", element: <Register /> },
            { path: "login", element: <Login /> },
            { path: "*", element: <Navigate to="/auth/404" /> },
        ],
    },
];

export default Router;
