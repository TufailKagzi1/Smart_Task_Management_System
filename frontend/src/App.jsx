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
    <div></div>
    // <BrowserRouter>
    //   <div className="App">
    //     {/* Main Layout Structure */}
    //     <Routes>
    //       {/* Public Route for Login */}
    //       <Route path="/login" element={<LogIn />} />
    //       <Route path="/signup" element={<Signup />} />
        
    //       <Route path="/" element={ <ProtectedRoute element={Home} /> } />
    //       </Routes>
    //   </div>
    // </BrowserRouter>
  );
}

export default App;
