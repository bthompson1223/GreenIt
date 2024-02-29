import { Outlet, createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import SplashPage from "../components/SplashPage/SplashPage";
import CommunityDetail from "../components/Community/CommunityDetail/CommunityDetail";
import CreateCommunity from "../components/Community/CreateCommunity/CreateCommunity";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SplashPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "communities",
        element: <Outlet />,
        children: [
          {
            path: ":community",
            element: <CommunityDetail />,
          },
          {
            path: "new",
            element: <CreateCommunity />,
          },
        ],
      },
    ],
  },
]);
