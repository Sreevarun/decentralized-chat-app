import "./App.css";
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Messenger from "./Pages/Messenger";
import Auth from "./Pages/Auth";
import CreateUser from "./Pages/CreateUser";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CreateUser/>,
    },
    {
      path: "/auth",
      element: <Auth/>,
    },
    {
      path: "/chat",
      element: <Messenger/>,
    },
  ]);
  return (
    <>
     <RouterProvider router={router} />
    </>
  );
}

export default App;
