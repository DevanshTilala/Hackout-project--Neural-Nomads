import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./components/Register";
import Report from "./components/Report";
import ReportsList from "./components/ReportsList";

function App() {
  return (
    <Router>
      <div className="p-4">
        <h1>Mangrove Protection System</h1>
        <nav>
          <Link to="/register">Register</Link> |{" "}
          <Link to="/report">Submit Report</Link> |{" "}
          <Link to="/reports">View Reports</Link>
        </nav>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/report" element={<Report />} />
          <Route path="/reports" element={<ReportsList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
