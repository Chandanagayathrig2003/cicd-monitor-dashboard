import { motion } from 'framer-motion';
import { TrendingUp, Activity, Zap, Clock, Rocket } from 'lucide-react';

function HeroAnalytics({ deployments = [] }) {
  const activeCount = deployments.filter(d => d.status === 'RUNNING').length;
  const successRate = deployments.length > 0 
    ? Math.round((deployments.filter(d => d.status === 'SUCCESS').length / deployments.length) * 100)
    : 0;

  const metrics = [
    {
      icon: <Rocket className="text-blue-400" size={24} />,
      label: 'Active Deployments',
      value: activeCount,
      color: 'from-blue-500 to-cyan-500',
      glow: 'shadow-blue-500/50'
    },
    {
      icon: <Activity className="text-green-400" size={24} />,
      label: 'API Health',
      value: '99.9%',
      color: 'from-green-500 to-emerald-500',
      glow: 'shadow-green-500/50'
    },
    {
      icon: <TrendingUp className="text-purple-400" size={24} />,
      label: 'Success Rate',
      value: `${successRate}%`,
      color: 'from-purple-500 to-pink-500',
      glow: 'shadow-purple-500/50'
    },
    {
      icon: <Zap className="text-yellow-400" size={24} />,
      label: 'Uptime',
      value: '100%',
      color: 'from-yellow-500 to-orange-500',
      glow: 'shadow-yellow-500/50'
    },
    {
      icon: <Clock className="text-cyan-400" size={24} />,
      label: 'Live Pipelines',
      value: deployments.length,
      color: 'from-cyan-500 to-blue-500',
      glow: 'shadow-cyan-500/50'
    }
  ];
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 border border-white/10 p-8 mb-8">
      
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>
      {/* Content */}
      <div className="relative z-10">
        <div className="mb-6">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            System Overview
          </h2>
          <p className="text-gray-400 mt-2 text-lg">Real-time metrics and performance indicators</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300 rounded-2xl ${metric.glow}`} />
              
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-white/30 transition-all">
                <div className="flex flex-col items-center text-center">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color} mb-3`}>
                    {metric.icon}
                  </div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">{metric.label}</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {metric.value}
                  </p>
                </div>
                
                {/* Glowing indicator */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroAnalytics;
