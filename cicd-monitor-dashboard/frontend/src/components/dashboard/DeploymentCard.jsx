import { motion } from 'framer-motion';

function DeploymentCard({
  deployment,
  retryDeployment
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -5
      }}
      className="bg-[#111827] p-6 rounded-2xl border border-gray-800 shadow-lg"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          {deployment.projectName}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm font-bold ${
            deployment.status === 'RUNNING'
              ? 'bg-yellow-500/20 text-yellow-400'
              : deployment.status === 'SUCCESS'
              ? 'bg-green-500/20 text-green-400'
              : 'bg-red-500/20 text-red-400'
          }`}
        >
          {deployment.status}
        </span>
      </div>

      <p className="text-gray-400 mt-4">
        Environment: {deployment.environment}
      </p>

      <button
        onClick={() =>
          retryDeployment(deployment.id)
        }
        className="mt-6 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg"
      >
        Retry Deployment
      </button>
    </motion.div>
  );
}

export default DeploymentCard;
