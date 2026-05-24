import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertTriangle, GitBranch, Calendar } from 'lucide-react';

function ActivityTimeline() {
  const activities = [
    {
      id: 1,
      type: 'success',
      title: 'Production Deployment Successful',
      project: 'payment-service',
      time: '2 minutes ago',
      user: 'John Doe',
      duration: '4m 23s'
    },
    {
      id: 2,
      type: 'running',
      title: 'Integration Tests Running',
      project: 'auth-service',
      time: '5 minutes ago',
      user: 'Jane Smith',
      duration: '2m 15s'
    },
    {
      id: 3,
      type: 'failed',
      title: 'Build Pipeline Failed',
      project: 'notification-service',
      time: '12 minutes ago',
      user: 'Mike Johnson',
      duration: '1m 45s'
    },
    {
      id: 4,
      type: 'success',
      title: 'Staging Deployment Complete',
      project: 'user-service',
      time: '18 minutes ago',
      user: 'Sarah Williams',
      duration: '3m 50s'
    }
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'success':
        return <CheckCircle2 className="text-green-400" size={24} />;
      case 'running':
        return <Clock className="text-yellow-400 animate-spin" size={24} />;
      case 'failed':
        return <AlertTriangle className="text-red-400" size={24} />;
      default:
        return <GitBranch className="text-blue-400" size={24} />;
    }
  };

  const getStatusColor = (type) => {
    switch(type) {
      case 'success': return 'border-green-500/30 bg-green-500/10';
      case 'running': return 'border-yellow-500/30 bg-yellow-500/10';
      case 'failed': return 'border-red-500/30 bg-red-500/10';
      default: return 'border-blue-500/30 bg-blue-500/10';
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Activity Timeline
        </h2>
        <span className="text-sm text-gray-400 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Live Updates
        </span>
      </div>

      <div className="space-y-6 relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-transparent" />

        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex gap-6 group"
          >
            {/* Icon */}
            <div className={`relative z-10 p-2 rounded-xl border-2 ${getStatusColor(activity.type)} backdrop-blur-xl group-hover:scale-110 transition-transform`}>
              {getIcon(activity.type)}
            </div>

            {/* Content */}
            <div className="flex-1 bg-black/20 backdrop-blur-sm border border-white/5 rounded-2xl p-5 hover:border-white/20 hover:bg-black/30 transition-all group-hover:shadow-xl">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{activity.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <GitBranch size={14} />
                      {activity.project}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {activity.time}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  {activity.duration}
                </span>
              </div>
              <p className="text-sm text-gray-500">Deployed by <span className="text-gray-300 font-medium">{activity.user}</span></p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ActivityTimeline;
