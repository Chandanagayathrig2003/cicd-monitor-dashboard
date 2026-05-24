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
      className="bg-[#111827] border border-gray-800 rounded-2xl p-7 shadow-xl"
    >
      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-2xl font-bold">
            {deployment.projectName}
          </h2>

          <p className="text-gray-400 mt-2">
            Environment:
            {' '}
            {deployment.environment}
          </p>
        </div>

        <div
          className={`px-4 py-2 rounded-full text-sm font-bold ${
            deployment.status === 'RUNNING'
              ? 'bg-yellow-500/20 text-yellow-400'
              : deployment.status === 'SUCCESS'
              ? 'bg-green-500/20 text-green-400'
              : 'bg-red-500/20 text-red-400'
          }`}
        >
          {deployment.status}
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">

        <div>
          <p className="text-gray-500 text-sm">
            Pipeline Duration
          </p>

          <p className="text-lg font-semibold mt-1">
            4m 23s
          </p>
        </div>

        <button
          onClick={() =>
            retryDeployment(
              deployment.id
            )
          }
          className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-xl font-medium"
        >
          Retry
        </button>

      </div>
    </motion.div>
  );
}

export default DeploymentCard;
