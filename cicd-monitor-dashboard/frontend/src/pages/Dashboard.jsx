import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [deployments, setDeployments] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    const fetchDeployments = () => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/deployments`)
        .then((res) => setDeployments(res.data))
        .catch((err) => console.error(err));
    };

    fetchDeployments();

    // Auto refresh every 5 seconds
    const interval = setInterval(fetchDeployments, 5000);

    return () => clearInterval(interval);
  }, []);

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

      alert('Deployment restarted');
    } catch (error) {
      console.error(error);
      alert('Retry failed');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        CI/CD Deployment Dashboard
      </h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search project..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none"
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
            className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800"
          >
            <h2 className="text-2xl font-semibold mb-4">
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
              className="mt-5 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
            >
              Retry Deployment
            </button>
          </div>
        ))}
      </div>

      {/* Logs Viewer */}
      <div className="bg-gray-900 p-6 rounded-2xl mt-10 border border-gray-800">
        <h2 className="text-2xl font-bold mb-4">
          Deployment Logs
        </h2>

        <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm space-y-2">
          <p>[10:02:01] Build Started</p>
          <p>[10:02:08] Running Tests</p>
          <p>[10:02:15] Deployment Successful</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
