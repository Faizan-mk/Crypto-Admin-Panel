import React from 'react';
import { format } from 'date-fns';
import './Transactions.css';

const statusIcons = {
  completed: { icon: 'check_circle', color: 'text-green-600' },
  pending: { icon: 'pending', color: 'text-yellow-600' },
  failed: { icon: 'error', color: 'text-red-600' },
};

const typeIcons = {
  deposit: { icon: 'account_balance_wallet', color: 'text-blue-600' },
  withdrawal: { icon: 'payments', color: 'text-purple-600' },
  payment: { icon: 'credit_card', color: 'text-indigo-600' },
  transfer: { icon: 'swap_horiz', color: 'text-cyan-600' },
};

const TransactionRow = ({ transaction }) => {
  const { 
    id, 
    user, 
    type, 
    amount, 
    currency, 
    status, 
    date, 
    description 
  } = transaction;

  const statusConfig = statusIcons[status.toLowerCase()] || { icon: 'circle', color: 'text-gray-400' };
  const typeConfig = typeIcons[type.toLowerCase()] || { icon: 'receipt', color: 'text-gray-600' };

  const handleView = (e) => {
    e.stopPropagation();
    // Handle view action
    console.log('View transaction:', id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    // Handle edit action
    console.log('Edit transaction:', id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    // Handle delete action
    console.log('Delete transaction:', id);
  };

  return (
    <tr className="transaction-row">
      <td className="font-medium text-gray-900">
        #{id.slice(0, 8)}
      </td>
      <td>
        <div className="flex items-center">
          <div className="transaction-avatar">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name}
              />
            ) : (
              <span>
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      </td>
      <td>
        <div className="flex items-center">
          <span className={`material-icons-round mr-2 ${typeConfig.color}`}>
            {typeConfig.icon}
          </span>
          <span className="capitalize">{type}</span>
        </div>
      </td>
      <td>
        <div className={`font-medium ${amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
          {amount >= 0 ? '+' : ''}{amount.toLocaleString()} {currency}
        </div>
        {description && (
          <div className="text-xs text-gray-500 truncate max-w-xs">{description}</div>
        )}
      </td>
      <td>
        <div className="flex items-center">
          <span className={`material-icons-round mr-1 text-sm ${statusConfig.color}`}>
            {statusConfig.icon}
          </span>
          <span className={`status-badge status-${status.toLowerCase()}`}>
            {status}
          </span>
        </div>
      </td>
      <td className="text-gray-500">
        {format(new Date(date), 'MMM d, yyyy h:mm a')}
      </td>
      <td>
        <div className="action-buttons">
          <button 
            onClick={handleView}
            className="action-btn view"
            title="View details"
            aria-label="View transaction details"
          >
            <span className="material-icons-round">visibility</span>
          </button>
          <button 
            onClick={handleEdit}
            className="action-btn edit"
            title="Edit transaction"
            aria-label="Edit transaction"
          >
            <span className="material-icons-round">edit_note</span>
          </button>
          <button 
            onClick={handleDelete}
            className="action-btn delete"
            title="Delete transaction"
            aria-label="Delete transaction"
          >
            <span className="material-icons-round">delete_forever</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TransactionRow;
