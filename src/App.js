import React from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import AuthContextProvider from "./Components/AuthContext/AuthContextProvider";
import NoteContextProvider from "./Components/NoteContextProvider/NoteContextProvider";

export default function App() {
  let routers = createHashRouter([
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <AuthContextProvider>
        <NoteContextProvider>
          <RouterProvider router={routers} />
        </NoteContextProvider>
      </AuthContextProvider>
    </>
  );
}
