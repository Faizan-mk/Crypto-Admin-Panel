import React from 'react';
import './RecentActivity.css';

const RecentActivity = () => {
  // Sample activity data
  const activities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'Updated profile',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'Changed password',
      time: '5 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      user: 'Admin',
      action: 'Updated system settings',
      time: '1 day ago',
      status: 'completed'
    },
    {
      id: 4,
      user: 'Mike Johnson',
      action: 'Uploaded document',
      time: '2 days ago',
      status: 'completed'
    },
    {
      id: 5,
      user: 'Sarah Williams',
      action: 'Created new project',
      time: '3 days ago',
      status: 'completed'
    }
  ];

  return (
    <div className="recent-activity-container">
      <div className="section-header">
        <div className="section-title">
          <span className="material-icons-round">update</span>
          <h2>Recent Activity</h2>
        </div>
        <button className="view-all-btn">
          View All
          <span className="material-icons-round" style={{ fontSize: '1.1rem', marginLeft: '4px' }}>arrow_forward</span>
        </button>
      </div>
      
      <div className="section-content">
        <div className="table-container">
          <table className="activity-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {activities.map(activity => (
                <tr key={activity.id}>
                  <td>{activity.user}</td>
                  <td>{activity.action}</td>
                  <td>{activity.time}</td>
                  <td>
                    <span className={`status-badge status-${activity.status}`}>
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
