import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [deployments, setDeployments] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/deployments')
      .then((res) => setDeployments(res.data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        CI/CD Deployment Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deployments.map((deployment) => (
          <div
            key={deployment.id}
            className="bg-gray-900 p-6 rounded-xl"
          >
            <h2 className="text-2xl font-semibold">
              {deployment.projectName}
            </h2>

            <p className="mt-2">
              Environment: {deployment.environment}
            </p>

            <p className="mt-2">
              Status: {deployment.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;