import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import LogIn from "./Pages/LogIn.jsx";
import Signup from "./Pages/Signup.jsx";
import MyTasks from "./Pages/MyTasks.jsx";
import Task from "./Pages/Task.jsx";
import CreateTask from "./Pages/CreateTask.jsx";
import User from "./Pages/User.jsx";
import { ProtectedRoute } from "./Services/Guard.jsx";
import { UserProvider } from "./context/user.jsx";
import Notes from "./Pages/Notes.jsx";
import Analytics from "./Pages/Analytics.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute element={Home} />,
  },
  {
    path: '/login',
    element: <LogIn />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/mytask',
    element: <ProtectedRoute element={MyTasks}/>
  },
  {
    path: "/task/:taskID",
    element: <ProtectedRoute element={Task}/>
  },
  {
    path: '/notes',
    element: <ProtectedRoute element={Notes}/>
  },
  {
    path: '/analytics',
    element: <ProtectedRoute element={Analytics}/>
  },
  {
    path: "/user",
    element: <ProtectedRoute element={User} />
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
