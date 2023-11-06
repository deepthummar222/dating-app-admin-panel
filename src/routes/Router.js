import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/
const Starter = lazy(() => import("../views/Starter.js"));
const Fav = lazy(() => import("../components/dashboard/Fav.js"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Online=lazy(()=>import("../views/ui/Online.js")) 
const Login=lazy(()=>import("./Login.js")) 


/*****Routes******/

const ThemeRoutes = [
  {
    path: "/login", // Define a route for the login page
    element: <Login />, // Use the Login component as the element
  },
  { 
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/login" /> },
      { path: "/starter", element: <Starter /> },
      { path: "/favimg", element: <Fav /> },
      { path: "/data", element: <Tables /> },
      { path: "/online", element: <Online /> },
      { path: "/login", element: <Login /> },
    ],
  },
];

export default ThemeRoutes;
