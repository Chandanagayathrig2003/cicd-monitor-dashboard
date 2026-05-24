import { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL);

function Dashboard() {
  const [deployments, setDeployments] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    fetchDeployments();

    socket.on('deploymentUpdated', (updatedDeployment) => {
      setDeployments((prevDeployments) =>
        prevDeployments.map((deployment) =>
          deployment.id === updatedDeployment.id
            ? {
                ...deployment,
                status: updatedDeployment.status
              }
            : deployment
        )
      );
    });

    return () => {
      socket.off('deploymentUpdated');
    };
  }, []);

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

  const filteredDeployments = deployments.filter((deployment) => {
    const matchesSearch = deployment.projectName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' ||
      deployment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const retryDeployment = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/deployments/${id}/retry`
      );

      fetchDeployments();

      alert('Deployment restarted');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-5xl font-bold mb-8">
        CI/CD Deployment Dashboard
      </h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search project..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-800 px-4 py-2 rounded-lg"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-800 px-4 py-2 rounded-lg"
        >
          <option value="ALL">All</option>
          <option value="RUNNING">Running</option>
          <option value="SUCCESS">Success</option>
          <option value="FAILED">Failed</option>
        </select>
      </div>

      {/* Deployment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeployments.map((deployment) => (
          <div
            key={deployment.id}
            className="bg-gray-900 p-6 rounded-2xl border border-gray-700"
          >
            <h2 className="text-2xl font-bold mb-3">
              {deployment.projectName}
            </h2>

            <p className="text-gray-300">
              Environment: {deployment.environment}
            </p>

            <p
              className={`mt-3 font-bold text-lg ${
                deployment.status === 'RUNNING'
                  ? 'text-yellow-400'
                  : deployment.status === 'SUCCESS'
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}
            >
              Status: {deployment.status}
            </p>

            <button
              onClick={() => retryDeployment(deployment.id)}
              className="mt-5 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
            >
              Retry Deployment
            </button>
          </div>
        ))}
      </div>

      {/* Logs */}
      <div className="bg-gray-900 p-6 rounded-2xl mt-10">
        <h2 className="text-2xl font-bold mb-4">
          Deployment Logs
        </h2>

        <div className="bg-black text-green-400 p-4 rounded-lg font-mono">
          <p>[10:02:01] Build Started</p>
          <p>[10:02:08] Running Tests</p>
          <p>[10:02:15] Deployment Successful</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
