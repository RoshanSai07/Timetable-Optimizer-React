import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./features/landing/Landing";
import { Dashboard } from "./features/dashboard/Dashboard";
import { Analytics } from "@vercel/analytics/react";
import NotSupported from "./shared/components/NotSupported";
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
