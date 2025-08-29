import React from 'react';
import { FiBell, FiChevronDown } from 'react-icons/fi';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="page-title">Admin Dashboard</h1>
      </div>
      <div className="header-right">
        <button className="notification-btn">
          <FiBell size={20} />
          <span className="notification-badge">3</span>
        </button>
        <div className="user-profile">
          <div className="user-avatar">
            <img 
              src="/icons/pic.jpg" 
              alt="User Avatar"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%'
              }}
            />
          </div>
          <div className="user-info">
            <span className="user-name">John Smith</span>
            <span className="user-role">Administrator</span>
          </div>
          <button className="dropdown-btn">
            <FiChevronDown size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;