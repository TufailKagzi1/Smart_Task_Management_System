import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import TopBar from "./components/Dashboard/TopBar";
import Sidebar from "./components/Sidebar/Sidebar";
import LogIn from "./Pages/LogIn";
import Signup from "./Pages/Signup";
import { ProtectedRoute } from "./Services/Guard";

function App() {
  return (
    <div>
      {/* For starting point check main.jsx */}
    </div>
  );
}

export default App;
