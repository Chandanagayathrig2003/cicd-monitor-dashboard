import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Activity, PieChart } from 'lucide-react';

function MetricsGrid({ deployments = [] }) {
  const successCount = deployments.filter(d => d.status === 'SUCCESS').length;
  const failedCount = deployments.filter(d => d.status === 'FAILED').length;
  const runningCount = deployments.filter(d => d.status === 'RUNNING').length;
  const successRate = deployments.length > 0 
    ? ((successCount / deployments.length) * 100).toFixed(1)
    : 0;

  const metrics = [
    {
      icon: <TrendingUp size={24} />,
      title: 'Success Rate',
      value: `${successRate}%`,
      change: '+5.2%',
      changeType: 'positive',
      color: 'from-green-500 to-emerald-600',
      bgGlow: 'bg-green-500/10',
      iconColor: 'text-green-400'
    },
    {
      icon: <Activity size={24} />,
      title: 'Running Pipelines',
      value: runningCount,
      change: `${runningCount} active`,
      changeType: 'neutral',
      color: 'from-yellow-500 to-orange-600',
      bgGlow: 'bg-yellow-500/10',
      iconColor: 'text-yellow-400'
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Failed Deployments',
      value: failedCount,
      change: '-2.1%',
      changeType: 'positive',
      color: 'from-red-500 to-rose-600',
      bgGlow: 'bg-red-500/10',
      iconColor: 'text-red-400'
    },
    {
      icon: <PieChart size={24} />,
      title: 'Avg Latency',
      value: '234ms',
      change: '-12ms',
      changeType: 'positive',
      color: 'from-blue-500 to-cyan-600',
      bgGlow: 'bg-blue-500/10',
      iconColor: 'text-blue-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="relative group"
        >
          {/* Glow Effect */}
          <div className={`absolute inset-0 ${metric.bgGlow} opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300 rounded-3xl`} />
          
          {/* Card */}
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-white/30 transition-all shadow-2xl overflow-hidden">
            
            {/* Gradient Overlay */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${metric.color} opacity-10 blur-2xl`} />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color} ${metric.iconColor}`}>
                  {metric.icon}
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  metric.changeType === 'positive' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }`}>
                  {metric.change}
                </span>
              </div>
              
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">{metric.title}</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {metric.value}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default MetricsGrid;
