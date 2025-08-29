import React from 'react';
import './Users.css';

const UserRow = ({ user, onView, onEdit, onDelete }) => {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'status-active';
      case 'inactive':
        return 'status-inactive';
      case 'suspended':
        return 'status-suspended';
      default:
        return '';
    }
  };

  const getCountryFlag = (country) => {
    const flags = {
      'united states': '🇺🇸',
      'canada': '🇨🇦',
      'united kingdom': '🇬🇧',
      'australia': '🇦🇺',
      'germany': '🇩🇪'
    };
    return flags[country.toLowerCase()] || '🌍';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <tr className="user-row">
      <td className="user-info">
        <div className="user-avatar">
          <img 
            src="/icons/pic.jpg" 
            alt={user.name}
            className="profile-pic"
          />
        </div>
        <div className="user-details">
          <div className="user-name">{user.name}</div>
          <div className="user-email">{user.email}</div>
        </div>
      </td>
      <td>
        <div className="country">
          <span className="flag-icon">{getCountryFlag(user.country)}</span>
          {user.country}
        </div>
      </td>
      <td>
        <span className={`status-badge ${getStatusClass(user.status)}`}>
          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        </span>
      </td>
      <td className="date">{formatDate(user.date)}</td>
      <td className="transactions">{user.transactions}</td>
      <td className="balance">${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
      <td className="actions">
        <div className="action-buttons">
          <button 
            onClick={() => onView?.(user)} 
            className="action-btn view-btn"
            title="View User"
          >
            <span className="material-icons-round">visibility</span>
          </button>
          <button 
            onClick={() => onEdit?.(user)} 
            className="action-btn edit-btn"
            title="Edit User"
          >
            <span className="material-icons-round">edit</span>
          </button>
          <button 
            onClick={() => onDelete?.(user.id)} 
            className="action-btn delete-btn"
            title="Delete User"
          >
            <span className="material-icons-round">delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
