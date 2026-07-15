import { BrowserRouter, Routes, Route } from "react-router-dom";

import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Result from "./pages/Result";
import CameraPage from "./pages/Camera";
import Voice from "./pages/Voice";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Splash />} />

        <Route path="/home" element={<Home />} />

        <Route path="/upload" element={<Upload />} />

        <Route path="/result" element={<Result />} />

        <Route path="/camera" element={<CameraPage />} />

        <Route path="/voice" element={<Voice />} />


        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;