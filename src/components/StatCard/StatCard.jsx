import React from 'react';
import { FiUsers, FiDollarSign, FiCreditCard, FiTrendingUp } from 'react-icons/fi';
import './StatCard.css';

const iconMap = {
  users: <FiUsers className="stat-icon" />,
  transactions: <FiDollarSign className="stat-icon" />,
  wallets: <FiCreditCard className="stat-icon" />,
  volume: <FiTrendingUp className="stat-icon" />
};

const StatCard = ({ title, value, change, isPositive, icon, type }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon-container">
        {icon || iconMap[type]}
      </div>
      <div className="stat-content">
        <span className="stat-title">{title}</span>
        <div className="stat-value">{value}</div>
        <div className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(change)}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
