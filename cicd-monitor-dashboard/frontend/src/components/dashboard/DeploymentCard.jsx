import { motion } from 'framer-motion';
import {
  Rocket,
  RotateCcw,
  Timer
} from 'lucide-react';

function DeploymentCard({
  deployment,
  retryDeployment
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02
      }}
      transition={{
        duration: 0.2
      }}
      className="
        relative
        overflow-hidden
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        rounded-3xl
        p-7
        shadow-2xl
        hover:border-blue-500/40
        transition-all
      "
    >
      {/* Glow Effect */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-blue-500/10
          to-purple-500/10
          opacity-0
          hover:opacity-100
          transition
        "
      />

      {/* Top */}
      <div className="flex justify-between items-start relative z-10">

        <div>
          <div className="flex items-center gap-3">
            <Rocket
              className="text-blue-400"
              size={24}
            />

            <h2 className="text-2xl font-bold">
              {deployment.projectName}
            </h2>
          </div>

          <p className="text-gray-400 mt-4">
            Environment:
            {' '}
            <span className="text-white font-medium">
              {deployment.environment}
            </span>
          </p>
        </div>

        {/* Status Badge */}
        <div
          className={`
            px-4
            py-2
            rounded-full
            text-sm
            font-bold
            shadow-lg
            ${
              deployment.status === 'RUNNING'
                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                : deployment.status === 'SUCCESS'
                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                : 'bg-red-500/20 text-red-300 border border-red-500/30'
            }
          `}
        >
          {deployment.status}
        </div>
      </div>

      {/* Bottom */}
      <div className="flex justify-between items-center mt-10 relative z-10">

        <div className="flex items-center gap-3">
          <Timer
            className="text-purple-400"
            size={18}
          />

          <div>
            <p className="text-gray-500 text-sm">
              Pipeline Duration
            </p>

            <p className="font-semibold mt-1">
              4m 23s
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            retryDeployment(
              deployment.id
            )
          }
          className="
            flex
            items-center
            gap-2
            bg-gradient-to-r
            from-blue-500
            to-purple-600
            hover:scale-105
            transition
            px-5
            py-3
            rounded-xl
            font-semibold
            shadow-lg
          "
        >
          <RotateCcw size={18} />
          Retry
        </button>
      </div>
    </motion.div>
  );
}

export default DeploymentCard;
