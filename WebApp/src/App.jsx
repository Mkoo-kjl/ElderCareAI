import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import HowItWorks from './components/HowItWorks';
import Objectives from './components/Objectives';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [view, setView] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setView('admin-dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    setView('landing');
  };

  if (view === 'admin-login') {
    return (
      <AdminLogin 
        onLogin={handleLoginSuccess} 
        onCancel={() => setView('landing')} 
      />
    );
  }

  if (view === 'admin-dashboard') {
    return (
      <AdminDashboard 
        onLogout={handleLogout} 
      />
    );
  }

  return (
    <>
      <Navbar 
        isAuthenticated={isAuthenticated}
        onNavigateAdmin={() => {
          if (isAuthenticated) {
            setView('admin-dashboard');
          } else {
            setView('admin-login');
          }
        }}
      />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Objectives />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
