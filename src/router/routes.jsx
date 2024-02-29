import { lazy } from 'react';
const AuthRegister = lazy(() => import('../pages/Authentication/Register'));
const AuthVerification= lazy(() => import('../pages/Authentication/Verification'));
const AuthLogin = lazy(() => import('../pages/Authentication/Login'));


const routes = [
    // dashboard
    {
        path: '/',
        element: <AuthLogin />,
    },
    {
        path: '/register',
        element: <AuthRegister />,
        layout: 'blank',
    },
    {
        path: '/login',
        element: <AuthLogin />,
        layout: 'blank',
    },
    {
        path: '/verification',
        element: <AuthVerification />,
        layout: 'blank',
    },
];

export { routes };
