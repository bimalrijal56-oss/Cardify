import React from 'react';
import Dashboardnav from './Components/Dashboardnav';
import { Outlet } from 'react-router-dom';

const Dashboardbase = () => {
  return (
    <div className="dashboard-layout">
      <Dashboardnav />
      <main className="dash-main">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboardbase;


