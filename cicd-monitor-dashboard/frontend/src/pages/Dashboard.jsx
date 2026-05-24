import { useEffect, useState } from 'react';
import axios from 'axios';

import Sidebar from '../components/layout/Sidebar';
import TopNavbar from '../components/layout/TopNavbar';
import BackgroundEffects from '../components/dashboard/BackgroundEffects';
import HeroAnalytics from '../components/dashboard/HeroAnalytics';
import MetricsGrid from '../components/dashboard/MetricsGrid';
import DeploymentCard from '../components/dashboard/DeploymentCard';
import LogsTerminal from '../components/dashboard/LogsTerminal';
import ChartsSection from '../components/charts/ChartsSection';
import ActivityTimeline from '../components/dashboard/ActivityTimeline';

function Dashboard() {
  const [deployments, setDeployments] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchDeployments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/deployments`
      );
      setDeployments(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDeployments();
    const interval = setInterval(fetchDeployments, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredDeployments = deployments.filter((deployment) => {
    const matchesSearch = deployment.projectName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'ALL' || deployment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const retryDeployment = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/deployments/${id}/retry`
      );
      fetchDeployments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=\"flex bg-[#0B1120] text-white min-h-screen relative\">
      {/* Background Effects */}
      <BackgroundEffects />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className=\"flex-1 flex flex-col relative z-10\">
        {/* Top Navbar */}
        <TopNavbar />

        {/* Main Content Area */}
        <div className=\"flex-1 p-8 overflow-x-hidden\">
          
          {/* Hero Analytics Section */}
          <HeroAnalytics deployments={deployments} />

          {/* Metrics Grid */}
          <MetricsGrid deployments={deployments} />

          {/* Filters */}
          <div className=\"flex flex-col md:flex-row gap-4 mb-8\">
            <input
              type=\"text\"
              placeholder=\"Search deployments...\"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=\"bg-white/5 backdrop-blur-sm border border-white/10 px-5 py-3 rounded-xl w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all\"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className=\"bg-white/5 backdrop-blur-sm border border-white/10 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer\"
            >
              <option value=\"ALL\">All Status</option>
              <option value=\"RUNNING\">Running</option>
              <option value=\"SUCCESS\">Success</option>
              <option value=\"FAILED\">Failed</option>
            </select>
          </div>

          {/* Deployment Grid */}
          <div className=\"mb-8\">
            <h2 className=\"text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent\">
              Active Deployments
            </h2>
            <div className=\"grid grid-cols-1 xl:grid-cols-2 gap-6\">
              {filteredDeployments.map((deployment) => (
                <DeploymentCard
                  key={deployment.id}
                  deployment={deployment}
                  retryDeployment={retryDeployment}
                />
              ))}
            </div>
          </div>

          {/* Charts Section */}
          <ChartsSection deployments={deployments} />

          {/* Bottom Section - Logs & Timeline */}
          <div className=\"grid grid-cols-1 2xl:grid-cols-2 gap-8\">
            <LogsTerminal />
            <ActivityTimeline />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
