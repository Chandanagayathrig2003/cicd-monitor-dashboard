import { motion } from 'framer-motion';
import { Rocket, RotateCcw, Timer, MapPin, User } from 'lucide-react';

function DeploymentCard({ deployment, retryDeployment }) {
  const getStatusConfig = (status) => {
    switch(status) {
      case 'RUNNING':
        return {
          bg: 'bg-yellow-500/20',
          text: 'text-yellow-300',
          border: 'border-yellow-500/40',
          glow: 'shadow-yellow-500/50',
          dot: 'bg-yellow-400'
        };
      case 'SUCCESS':
        return {
          bg: 'bg-green-500/20',
          text: 'text-green-300',
          border: 'border-green-500/40',
          glow: 'shadow-green-500/50',
          dot: 'bg-green-400'
        };
      case 'FAILED':
        return {
          bg: 'bg-red-500/20',
          text: 'text-red-300',
          border: 'border-red-500/40',
          glow: 'shadow-red-500/50',
          dot: 'bg-red-400'
        };
      default:
        return {
          bg: 'bg-gray-500/20',
          text: 'text-gray-300',
          border: 'border-gray-500/40',
          glow: 'shadow-gray-500/50',
          dot: 'bg-gray-400'
        };
    }
  };

  const statusConfig = getStatusConfig(deployment.status);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className=\"relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl hover:border-white/30 hover:shadow-blue-500/20 transition-all group\"
    >
      {/* Background Gradient Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Animated Border Glow */}
      <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 ${statusConfig.glow}`} />

      {/* Content */}
      <div className=\"relative z-10\">
        
        {/* Header */}
        <div className=\"flex justify-between items-start mb-6\">
          <div className=\"flex items-start gap-4\">
            <div className=\"p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600\">
              <Rocket size={24} className=\"text-white\" />
            </div>
            
            <div>
              <h2 className=\"text-2xl font-bold text-white mb-2\">{deployment.projectName}</h2>
              <div className=\"flex items-center gap-4 text-sm text-gray-400\">
                <span className=\"flex items-center gap-1\">
                  <MapPin size={14} />
                  {deployment.environment}
                </span>
                <span className=\"flex items-center gap-1\">
                  <User size={14} />
                  John Doe
                </span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className={`${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} px-4 py-2 rounded-full text-xs font-bold border flex items-center gap-2 shadow-lg backdrop-blur-sm`}
          >
            <span className={`w-2 h-2 ${statusConfig.dot} rounded-full ${deployment.status === 'RUNNING' ? 'animate-pulse' : ''}`} />
            {deployment.status}
          </motion.div>
        </div>

        {/* Metrics */}
        <div className=\"grid grid-cols-2 gap-4 mb-6\">
          <div className=\"bg-black/20 rounded-xl p-4 border border-white/5\">
            <div className=\"flex items-center gap-2 text-gray-400 text-xs mb-1\">
              <Timer size={14} />
              <span>Duration</span>
            </div>
            <p className=\"text-white font-semibold text-lg\">4m 23s</p>
          </div>
          
          <div className=\"bg-black/20 rounded-xl p-4 border border-white/5\">
            <div className=\"flex items-center gap-2 text-gray-400 text-xs mb-1\">
              <Rocket size={14} />
              <span>Pipeline</span>
            </div>
            <p className=\"text-white font-semibold text-lg\">CI/CD</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className=\"flex items-center justify-between pt-4 border-t border-white/10\">
          <div className=\"text-xs text-gray-500\">
            Last updated: <span className=\"text-gray-400\">2 mins ago</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => retryDeployment(deployment.id)}
            className=\"flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all\"
          >
            <RotateCcw size={16} />
            Retry
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default DeploymentCard;
