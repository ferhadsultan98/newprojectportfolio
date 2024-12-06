import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import MainOne from './components/Main/MainOne';
import Layout from './components/Layout/Layout';
import Projects from './components/Projects/Projects';
import AboutSection from './components/About/About';
import AdminLogin from './components/AdminLogin/AdminLogin';
// import AdminPanel from './components/AdminLogin/AdminPanel';
import ErrorPage from './components/ErrorPage/ErrorPage';

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const location = useLocation(); // Get the current location/path

  // Check if the current path is either '/admin' or '/admin-panel'
  const isAdminPage = location.pathname === '/admin' || location.pathname === '/admin-panel';

  return (
    <>
      {/* Conditionally render Layout (with header) only if it's not the Admin pages */}
      {!isAdminPage ? (
        <Layout>
          <Routes>
            <Route path="/" element={<MainOne />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/admin" element={<AdminLogin />} />
/
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Layout>
      ) : (
        // Render Routes without Layout (no header)
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          {/* <Route path="/admin-panel" element={<AdminPanel />} /> */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
