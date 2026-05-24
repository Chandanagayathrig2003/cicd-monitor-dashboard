import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { motion } from 'framer-motion';

function ChartsSection({ deployments = [] }) {
  // Pie Chart Data
  const successCount = deployments.filter(d => d.status === 'SUCCESS').length;
  const failedCount = deployments.filter(d => d.status === 'FAILED').length;
  const runningCount = deployments.filter(d => d.status === 'RUNNING').length;

  const pieData = [
    { name: 'Success', value: successCount || 5, color: '#22c55e' },
    { name: 'Failed', value: failedCount || 2, color: '#ef4444' },
    { name: 'Running', value: runningCount || 3, color: '#facc15' }
  ];

  // Bar Chart Data (Deployment Trends)
  const trendData = [
    { day: 'Mon', success: 12, failed: 2, running: 3 },
    { day: 'Tue', success: 15, failed: 1, running: 4 },
    { day: 'Wed', success: 18, failed: 3, running: 2 },
    { day: 'Thu', success: 14, failed: 2, running: 5 },
    { day: 'Fri', success: 20, failed: 1, running: 3 },
    { day: 'Sat', success: 10, failed: 0, running: 2 },
    { day: 'Sun', success: 8, failed: 1, running: 1 }
  ];

  // Line Chart Data (Performance)
  const performanceData = [
    { time: '00:00', latency: 120 },
    { time: '04:00', latency: 145 },
    { time: '08:00', latency: 280 },
    { time: '12:00', latency: 320 },
    { time: '16:00', latency: 290 },
    { time: '20:00', latency: 180 },
    { time: '24:00', latency: 150 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      
      {/* Pie Chart - Deployment Status */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -5 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl hover:border-white/20 transition-all"
      >
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Deployment Status Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: 'white'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bar Chart - Weekly Trends */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        whileHover={{ y: -5 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl hover:border-white/20 transition-all"
      >
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          Weekly Deployment Trends
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: 'white'
              }}
            />
            <Bar dataKey="success" fill="#22c55e" radius={[8, 8, 0, 0]} />
            <Bar dataKey="failed" fill="#ef4444" radius={[8, 8, 0, 0]} />
            <Bar dataKey="running" fill="#facc15" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Line Chart - Performance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        whileHover={{ y: -5 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl hover:border-white/20 transition-all lg:col-span-2"
      >
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Average Deployment Latency (24h)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="time" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: 'white'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="latency" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

    </div>
  );
}

export default ChartsSection;
