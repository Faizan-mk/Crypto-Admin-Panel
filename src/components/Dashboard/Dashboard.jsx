import React from 'react';
import ChartsContainer from '../Charts/ChartsContainer';
import StatCard from '../StatCard/StatCard';
import TransactionsTable from '../Transactions/TransactionsTable';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
      </div>
      <div className="stats-grid">
        <StatCard 
          title="Total Users" 
          value="12,345" 
          change="+12.3%" 
          isPositive={true} 
          icon="👥"
        />
        <StatCard 
          title="Total Revenue" 
          value="$48,234" 
          change="+8.2%" 
          isPositive={true} 
          icon="💰"
        />
        <StatCard 
          title="Active Sessions" 
          value="1,234" 
          change="-2.1%" 
          isPositive={false} 
          icon="👀"
        />
        <StatCard 
          title="Conversion Rate" 
          value="3.42%" 
          change="+0.8%" 
          isPositive={true} 
          icon="📈"
        />
      </div>
      
      <ChartsContainer />
      
      <div className="mt-8">
        <TransactionsTable />
      </div>
    </div>
  );
};

export default Dashboard;
