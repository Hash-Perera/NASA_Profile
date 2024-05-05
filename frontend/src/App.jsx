import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";
import MarsRover from "./pages/mars-rover";
import { useEffect, useState } from "react";
import EarthImagery from "./pages/earth-imagery";
import DetailView from "./pages/detail.view";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [executed, setExecuted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    setExecuted(true);
  }, []);

  return (
    <>
      {executed && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/marsrover" element={<MarsRover />} />
            <Route path="/earth" element={<EarthImagery />} />
            <Route path="/detail" element={<DetailView />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
