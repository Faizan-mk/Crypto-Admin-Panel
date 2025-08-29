import React, { useState } from 'react';
import UsersTable from './UsersTable';
import './Users.css';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Sample user data with all required fields
  const [users] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      status: 'Active',
      date: '2023-10-15',
      transactions: 12,
      country: 'United States',
      balance: 2500.00,
      walletAddress: '0x1234567890abcdef',
      role: 'User'
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@example.com',
      status: 'Active',
      date: '2023-09-20',
      transactions: 8,
      country: 'Canada',
      balance: 1800.50,
      walletAddress: '0xabcdef1234567890',
      role: 'Admin'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      status: 'Inactive',
      date: '2023-11-05',
      transactions: 3,
      country: 'United Kingdom',
      balance: 500.25,
      walletAddress: '0x7890abcdef123456',
      role: 'User'
    }
  ]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-container">
      <div className="section-header">
        <h2 className="title-with-icon">
          <span className="material-icons-round">people</span>
          Users Management
        </h2>
        <div className="header-actions">
          <div className="search-bar ">
            <span className="material-icons-round">search</span>
            <input className=''
              type="text" 
              placeholder="      Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="add-user-btn">
            <span className="material-icons-round">add</span>
            Add User
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <UsersTable users={filteredUsers} />
      </div>
    </div>
  );
};

export default Users;