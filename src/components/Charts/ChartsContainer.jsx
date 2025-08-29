import React from 'react';
import TransactionVolumeChart from './TransactionVolumeChart';
import UserDistributionChart from './UserDistributionChart';
import './Charts.css';

const ChartsContainer = () => {
  return (
    <div className="charts-grid">
      <div className="chart-item">
        <TransactionVolumeChart />
      </div>
      <div className="chart-item">
        <UserDistributionChart />
      </div>
    </div>
  );
};

export default ChartsContainer;
