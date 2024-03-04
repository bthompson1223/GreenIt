import { Outlet, createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import SplashPage from "../components/SplashPage/SplashPage";
import CommunityDetail from "../components/Community/CommunityDetail/CommunityDetail";
import CreateCommunity from "../components/Community/CreateCommunity/CreateCommunity";
import EditCommunity from "../components/Community/EditCommunity/EditCommunity";
import PostDetail from "../components/Posts/PostDetail/PostDetail";
import CreatePost from "../components/Posts/CreatePost/CreatePost";

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
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <CommunityDetail />,
              },
              {
                path: "edit",
                element: <EditCommunity />,
              },
            ],
          },
          {
            path: "new",
            element: <CreateCommunity />,
          },
        ],
      },
      {
        path: "posts",
        children: [
          {
            path: ":postId",
            element: <PostDetail />,
          },
          {
            path: "new",
            element: <CreatePost />,
          },
        ],
      },
    ],
  },
]);
