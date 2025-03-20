import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Header.css';

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Function to get dashboard link based on user role
  const getDashboardLink = () => {
    if (!currentUser) return '/';
    
    switch (currentUser.role) {
      case 'admin':
        return '/admin-dashboard';
      case 'doctor':
        return '/doctor-dashboard';
      case 'patient':
        return '/patient-dashboard';
      default:
        return '/';
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>HealthCare Management</h1>
          </Link>
        </div>
        
        <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
          <span className="hamburger"></span>
        </button>
        
        <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {currentUser ? (
            <>
              <div className="user-info">
                <span className="welcome-text">Welcome, {currentUser.name}</span>
                <span className="user-role">{currentUser.role}</span>
              </div>
              <div className="nav-links">
                <Link to={getDashboardLink()} className={`nav-link ${isActive(getDashboardLink())}`}>Dashboard</Link>
                <Link to="/profile" className={`nav-link ${isActive('/profile')}`}>Profile</Link>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            </>
          ) : (
            <div className="nav-links">
              <Link to="/login" className={`nav-link ${isActive('/login')}`}>Login</Link>
              <Link to="/register" className={`nav-link ${isActive('/register')}`}>Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;