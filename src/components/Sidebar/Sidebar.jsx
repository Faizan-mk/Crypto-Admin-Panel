import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const menuItems = [
    { name: 'Dashboard', icon: 'grid_view', path: '/dashboard' },
    { name: 'Users', icon: 'people', path: '/users' },
    { name: 'Wallets', icon: 'account_balance_wallet', path: '/wallets' },
    { name: 'Transactions', icon: 'receipt_long', path: '/transactions' },
    { name: 'Exchange', icon: 'currency_exchange', path: '/exchange' },
    { name: 'Settings', icon: 'settings', path: '/settings' },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  const closeSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
      document.body.style.overflow = 'auto';
    }
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const sidebar = document.querySelector('.sidebar');
      const hamburger = document.querySelector('.hamburger-menu');
      
      if (isOpen && 
          !sidebar.contains(e.target) && 
          (!hamburger || !hamburger.contains(e.target))) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
        document.body.style.overflow = 'auto';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Hamburger Menu */}
      <div 
        className={`hamburger-menu ${isOpen ? 'open' : ''}`} 
        onClick={toggleSidebar}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Overlay */}
      {isOpen && <div className="overlay active" onClick={closeSidebar} />}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="logo">
          <span className="material-icons logo-icon">currency_bitcoin</span>
          <h2>CryptoWallet</h2>
        </div>
        
        <nav className="menu">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path} 
                  className="menu-item"
                  onClick={closeSidebar}
                >
                  <span className="material-icons">{item.icon}</span>
                  <span className="menu-text">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="logout">
          <Link to="/logout" className="menu-item" onClick={closeSidebar}>
            <span className="material-icons">logout</span>
            <span className="menu-text">Logout</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;