import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';
import Users from './components/Users/Users';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="content">
            <Dashboard />
          <Users/>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;