import { useEffect, useState } from 'react';
import axios from 'axios';

import Sidebar from '../components/layout/Sidebar';
import MetricsCard from '../components/dashboard/MetricsCard';
import DeploymentCard from '../components/dashboard/DeploymentCard';
import LogsPanel from '../components/dashboard/LogsPanel';
import DeploymentPieChart from '../components/charts/DeploymentPieChart';

function Dashboard() {
  const [deployments, setDeployments] =
    useState([]);

  const [search, setSearch] =
    useState('');

  const [statusFilter, setStatusFilter] =
    useState('ALL');

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

    const interval = setInterval(
      fetchDeployments,
      5000
    );

    return () => clearInterval(interval);
  }, []);

  const filteredDeployments =
    deployments.filter((deployment) => {
      const matchesSearch =
        deployment.projectName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === 'ALL' ||
        deployment.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  const retryDeployment =
    async (id) => {
      try {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/deployments/${id}/retry`
        );

        fetchDeployments();
      } catch (error) {
        console.error(error);
      }
    };

  const successCount =
    deployments.filter(
      (d) => d.status === 'SUCCESS'
    ).length;

  const failedCount =
    deployments.filter(
      (d) => d.status === 'FAILED'
    ).length;

  const runningCount =
    deployments.filter(
      (d) => d.status === 'RUNNING'
    ).length;

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-5xl font-bold mb-10">
          CI/CD Deployment Dashboard
        </h1>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <MetricsCard
            title="Successful Deployments"
            value={successCount}
            color="text-green-400"
          />

          <MetricsCard
            title="Failed Pipelines"
            value={failedCount}
            color="text-red-400"
          />

          <MetricsCard
            title="Running Jobs"
            value={runningCount}
            color="text-yellow-400"
          />
        </div>

        {/* Search */}
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Search project..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="bg-[#111827] border border-gray-700 px-4 py-3 rounded-lg w-72"
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="bg-[#111827] border border-gray-700 px-4 py-3 rounded-lg"
          >
            <option value="ALL">
              All
            </option>

            <option value="RUNNING">
              Running
            </option>

            <option value="SUCCESS">
              Success
            </option>

            <option value="FAILED">
              Failed
            </option>
          </select>
        </div>

        {/* Deployment Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDeployments.map(
            (deployment) => (
              <DeploymentCard
                key={deployment.id}
                deployment={
                  deployment
                }
                retryDeployment={
                  retryDeployment
                }
              />
            )
          )}
        </div>

        {/* Charts + Logs */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">
          <DeploymentPieChart
            deployments={
              deployments
            }
          />

          <LogsPanel />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
