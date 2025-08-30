import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Report from "./components/Report";
import ReportsList from "./components/ReportsList";

function App() {
  const NavLink = ({ to, children, className }) => (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${className}`}
    >
      {children}
    </Link>
  );

  const HomeView = () => (
    <div className="max-w-4xl mx-auto text-center">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg shadow-xl p-12 mb-8">
        <h1 className="text-4xl font-bold mb-4">🌿 Mangrove Protection System</h1>
        <p className="text-xl opacity-90 mb-6">
          Safeguarding coastal ecosystems through community vigilance
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="font-semibold">Community Driven</h3>
            <p className="text-sm opacity-90">Powered by local guardians</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-3xl mb-2">📱</div>
            <h3 className="font-semibold">Real-time Reporting</h3>
            <p className="text-sm opacity-90">Instant threat documentation</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-3xl mb-2">🌍</div>
            <h3 className="font-semibold">Ecosystem Protection</h3>
            <p className="text-sm opacity-90">Preserving biodiversity</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link 
          to="/register"
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-green-300 block"
        >
          <div className="text-4xl mb-4">👤</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Join Network</h3>
          <p className="text-gray-600">Register as a mangrove guardian</p>
        </Link>
        
        <Link 
          to="/report"
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-red-300 block"
        >
          <div className="text-4xl mb-4">🚨</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Report Threat</h3>
          <p className="text-gray-600">Document ecosystem threats</p>
        </Link>
        
        <Link 
          to="/reports"
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-purple-300 block"
        >
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">View Reports</h3>
          <p className="text-gray-600">Monitor threat status</p>
        </Link>
      </div>
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        {/* Navigation */}
        <nav className="bg-white shadow-lg border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-2xl">🌿</span>
                <span className="text-xl font-bold text-gray-800">Mangrove Guard</span>
              </Link>
              
              <div className="flex space-x-4">
                <NavLink to="/register" className="text-green-600 hover:bg-green-50 border border-green-200">
                  👤 Register
                </NavLink>
                <NavLink to="/report" className="text-red-600 hover:bg-red-50 border border-red-200">
                  🚨 Report
                </NavLink>
                <NavLink to="/reports" className="text-purple-600 hover:bg-purple-50 border border-purple-200">
                  📊 Reports
                </NavLink>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="py-8 px-6">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/register" element={<Register />} />
            <Route path="/report" element={<Report />} />
            <Route path="/reports" element={<ReportsList />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;