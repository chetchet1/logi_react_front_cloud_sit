// //2023-10-28(토) Hoyeon
// //Router 적용을 위한 파일 생성

// import { lazy } from 'react';

// // project imports
// import GuestGuard from 'utils/route-guard/GuestGuard';
// import MinimalLayout from 'layout/MinimalLayout';
// import NavMotion from 'layout/NavMotion';
// import Loadable from 'ui-component/Loadable';

// // login routing
// const AuthLogin = Loadable(lazy(() => import('components/authentication/auth-forms/AuthLogin')));
// const AuthRegister = Loadable(lazy(() => import('components/authentication/auth-forms/AuthRegister')));
// const AuthForgotPassword = Loadable(lazy(() => import('components/authentication/auth-forms/AuthForgotPassword')));

// // ==============================|| AUTH ROUTING ||============================== //

// const LoginRoutes = {
//   path: '/',
//   element: (
//     <NavMotion>
//       <GuestGuard>
//         <MinimalLayout />
//       </GuestGuard>
//     </NavMotion>
//   ),
//   children: [
//     {
//       path: '/',
//       element: <AuthLogin />
//     },
//     {
//       path: '/login',
//       element: <AuthLogin />
//     },
//     {
//       path: '/register',
//       element: <AuthRegister />
//     },
//     {
//       path: '/forgot',
//       element: <AuthForgotPassword />
//     }
//   ]
// };

// export default LoginRoutes;
