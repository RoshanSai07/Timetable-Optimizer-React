import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { Analytics } from "@vercel/analytics/react";
import NotSupported from "./components/NotSupported";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/not-supported" element={<NotSupported />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </>
  );
}

export default App;
