import React, { useState, useMemo } from 'react';
import TransactionRow from './TransactionRow';
import './Transactions.css';
import './Pagination.css';

// Mock data - in a real app, this would come from an API
const generateMockTransactions = (count = 10) => {
  const types = ['Deposit', 'Withdrawal', 'Payment', 'Transfer'];
  const statuses = ['Completed', 'Pending', 'Failed'];
  const currencies = ['USD', 'EUR', 'GBP'];
  const users = [
    { 
      name: 'John Doe', 
      email: 'john@example.com',
      avatar: '/icons/pic.jpg'
    },
    { 
      name: 'Jane Smith', 
      email: 'jane@example.com',
      avatar: '/icons/pic.jpg'
    },
    { 
      name: 'Robert Johnson', 
      email: 'robert@example.com',
      avatar: '/icons/pic.jpg'
    },
    { 
      name: 'Emily Davis', 
      email: 'emily@example.com',
      avatar: '/icons/pic.jpg'
    },
    { 
      name: 'Michael Wilson', 
      email: 'michael@example.com',
      avatar: '/icons/pic.jpg'
    },
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `tx_${Math.random().toString(36).substr(2, 9)}`,
    user: users[Math.floor(Math.random() * users.length)],
    type: types[Math.floor(Math.random() * types.length)],
    amount: (Math.random() * 10000 - 2000).toFixed(2) * 1,
    currency: currencies[Math.floor(Math.random() * currencies.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    description: ['Payment for service', 'Monthly subscription', 'Refund', 'Transfer to bank', 'Deposit from card'][Math.floor(Math.random() * 5)],
  }));
};

const TransactionsTable = () => {
  const [transactions] = useState(generateMockTransactions(15));
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => 
      Object.values(tx).some(
        val => 
          (typeof val === 'string' && val.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (typeof val === 'object' && val !== null && 
            Object.values(val).some(prop => 
              typeof prop === 'string' && prop.toLowerCase().includes(searchTerm.toLowerCase())
            )
          )
      )
    );
  }, [transactions, searchTerm]);

  const sortedTransactions = useMemo(() => {
    const sortableItems = [...filteredTransactions];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        // Handle nested properties (e.g., user.name)
        if (sortConfig.key.includes('.')) {
          const keys = sortConfig.key.split('.');
          aValue = keys.reduce((obj, key) => obj?.[key], a);
          bValue = keys.reduce((obj, key) => obj?.[key], b);
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredTransactions, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Pagination logic
  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const currentItems = sortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const SortableHeader = ({ columnKey, children }) => {
    const isSorted = sortConfig.key === columnKey;
    const isAsc = sortConfig.direction === 'asc';
    
    return (
      <th 
        scope="col" 
        className={`${isSorted ? 'sorted-' + sortConfig.direction : ''} group`}
        onClick={() => requestSort(columnKey)}
      >
        <div className="flex items-center cursor-pointer hover:bg-gray-50 px-6 py-3">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {children}
          </span>
          <span className="sort-icon">
            {isSorted ? (
              isAsc ? (
                <span className="material-icons-round text-base">arrow_upward</span>
              ) : (
                <span className="material-icons-round text-base">arrow_downward</span>
              )
            ) : (
              <span className="material-icons-round text-base opacity-0 group-hover:opacity-100">unfold_more</span>
            )}
          </span>
        </div>
      </th>
    );
  };

  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <h3>
          <span className="material-icons-round">receipt</span>
          Recent Transactions
        </h3>
        <div className="transactions-actions">
          <button 
            onClick={() => setItemsPerPage(prev => prev === 5 ? 1000 : 5)}
            className="view-all-btn"
          >
            <span className="material-icons-round">
              {itemsPerPage === 5 ? 'unfold_more' : 'unfold_less'}
            </span>
            {itemsPerPage === 5 ? 'View All' : 'View Less'}
          </button>
          <div className="search-container">
            <input
              type="text"
              placeholder="      Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="material-icons-round">search</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="transactions-table">
          <thead>
            <tr>
              <SortableHeader columnKey="id">ID</SortableHeader>
              <SortableHeader columnKey="user.name">User</SortableHeader>
              <SortableHeader columnKey="type">Type</SortableHeader>
              <SortableHeader columnKey="amount">Amount</SortableHeader>
              <SortableHeader columnKey="status">Status</SortableHeader>
              <SortableHeader columnKey="date">Date</SortableHeader>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((transaction) => (
                <TransactionRow key={transaction.id} transaction={transaction} />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-content">
          <span className="page-info">
            {Math.min((currentPage - 1) * itemsPerPage + 1, sortedTransactions.length)} - 
            {Math.min(currentPage * itemsPerPage, sortedTransactions.length)} of {sortedTransactions.length}
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
     
    </div>
    
  );
};

export default TransactionsTable;
