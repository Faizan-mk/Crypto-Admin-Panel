import React, { useState, useMemo } from 'react';
import UserRow from './UserRow';
import './Users.css';
import './Pagination.css';

const UsersTable = ({ users = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const itemsPerPage = 10;

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        (user.walletAddress && user.walletAddress.toLowerCase().includes(term)) ||
        (user.status && user.status.toLowerCase().includes(term))
      );
    }
    
    // Sort
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return result;
  }, [users, searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredAndSortedUsers, itemsPerPage]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handler functions
  const handleView = (user) => {
    console.log('View user:', user);
    // In a real app, this would open a modal or navigate to user details
  };

  const handleEdit = (user) => {
    console.log('Edit user:', user);
    // In a real app, this would open an edit form
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      console.log('Delete user:', userId);
      // In a real app, this would call an API to delete the user
    }
  };

  const SortIcon = ({ column }) => (
    <span className="sort-icon">
      {sortConfig.key === column ? (
        sortConfig.direction === 'asc' ? '↑' : '↓'
      ) : '⇅'}
    </span>
  );

  return (
    <div className="users-container">
      

      <div className="table-responsive">
        <table className="users-table">
          <thead>
            <tr>
              <th onClick={() => requestSort('id')}>
                ID <SortIcon column="id" />
              </th>
              <th onClick={() => requestSort('name')}>
                Name <SortIcon column="name" />
              </th>
              <th onClick={() => requestSort('email')}>
                Email <SortIcon column="email" />
              </th>
              <th>Wallet Address</th>
              <th onClick={() => requestSort('balance')}>
                Balance <SortIcon column="balance" />
              </th>
              <th onClick={() => requestSort('status')}>
                Status <SortIcon column="status" />
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map(user => (
                <UserRow 
                  key={user.id} 
                  user={user} 
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-results">
                  No users found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredAndSortedUsers.length > 0 && (
        <div className="pagination-container">
          <div className="pagination-content">
            <span className="page-info">
              {Math.min((currentPage - 1) * itemsPerPage + 1, filteredAndSortedUsers.length)} - 
              {Math.min(currentPage * itemsPerPage, filteredAndSortedUsers.length)} of {filteredAndSortedUsers.length}
            </span>
            <div className="pagination-buttons">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="pagination-button"
                title="First page"
              >
                <span className="material-icons-round">keyboard_double_arrow_left</span>
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="pagination-button"
                title="Previous page"
              >
                <span className="material-icons-round">chevron_left</span>
              </button>
              
              <div className="pagination-button current-page">
                {currentPage}
              </div>
              
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="pagination-button"
                title="Next page"
              >
                <span className="material-icons-round">chevron_right</span>
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="pagination-button"
                title="Last page"
              >
                <span className="material-icons-round">keyboard_double_arrow_right</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
