import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import { isAuth } from "../utils/auth";

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import("../layouts/full/FullLayout")));
const BlankLayout = Loadable(
    lazy(() => import("../layouts/blank/BlankLayout"))
);

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import("../views/dashboard/Dashboard")));
const Resident = Loadable(lazy(() => import("../views/resident/Resident")));
const Payment = Loadable(lazy(() => import("../views/payment/Payment")));
const Report = Loadable(lazy(() => import("../views/report/Report")));
const Bills = Loadable(lazy(() => import("../views/bills/Bills")));
const Users = Loadable(lazy(() => import("../views/users/Users")));
// const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')))
// const Icons = Loadable(lazy(() => import('../views/icons/Icons')))
// const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')))
// const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')))
const Error = Loadable(lazy(() => import("../views/authentication/Error")));
const Register = Loadable(
    lazy(() => import("../views/authentication/Register"))
);
const Login = Loadable(lazy(() => import("../views/authentication/Login")));

function PrivateRoute({ children }) {
    return isAuth() ? children : <Navigate to="/auth/login" />;
}

const Router = [
    {
        path: "/",
        element: (
            <PrivateRoute>
                <FullLayout />
            </PrivateRoute>
        ),
        children: [
            { path: "/", element: <Navigate to="/dashboard" /> },
            { path: "/dashboard", exact: true, element: <Dashboard /> },
            { path: "/resident", exact: true, element: <Resident /> },
            { path: "/payment", exact: true, element: <Payment /> },
            { path: "/report", exact: true, element: <Report /> },
            { path: "/bill", exact: true, element: <Bills /> },
            { path: "/user", exact: true, element: <Users /> },
            // { path: '/sample-page', exact: true, element: <SamplePage /> },
            // { path: '/icons', exact: true, element: <Icons /> },
            // { path: '/ui/typography', exact: true, element: <TypographyPage /> },
            // { path: '/ui/shadow', exact: true, element: <Shadow /> },
            // { path: '*', element: <Navigate to="/auth/404" /> },
        ],
    },
    {
        path: "/auth",
        element: <BlankLayout />,
        children: [
            { path: "404", element: <Error /> },
            { path: "/auth/register", element: <Register /> },
            { path: "/auth/login", element: <Login /> },
            { path: "*", element: <Navigate to="/auth/404" /> },
        ],
    },
];

export default Router;
