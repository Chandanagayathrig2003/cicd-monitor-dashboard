import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Terminal, Play, Pause } from 'lucide-react';

function LogsTerminal() {
  const [logs, setLogs] = useState([
    { time: '10:02:01', message: 'Build process initiated...', type: 'info' },
    { time: '10:02:03', message: 'Installing dependencies...', type: 'info' },
    { time: '10:02:08', message: 'Running test suite...', type: 'info' },
    { time: '10:02:12', message: 'All tests passed ✓', type: 'success' },
    { time: '10:02:15', message: 'Building Docker image...', type: 'info' },
    { time: '10:02:20', message: 'Pushing to container registry...', type: 'info' },
    { time: '10:02:25', message: 'Deployment successful ✓', type: 'success' },
    { time: '10:02:27', message: 'Health checks passed ✓', type: 'success' },
    { time: '10:02:30', message: 'Service is now live at https://api.example.com', type: 'success' }
  ]);
  const [isPaused, setIsPaused] = useState(false);
  const logsEndRef = useRef(null);

  const scrollToBottom = () => {
    if (!isPaused) {
      logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  // Simulate new logs
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      const newMessages = [
        'Monitoring service health...',
        'Checking resource utilization...',
        'Running scheduled tasks...',
        'Backup completed successfully ✓',
        'Cache invalidation complete',
        'Database connection healthy'
      ];
      
      const randomMessage = newMessages[Math.floor(Math.random() * newMessages.length)];
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { hour12: false });
      
      setLogs(prev => [...prev.slice(-8), { 
        time: timeString, 
        message: randomMessage, 
        type: 'info' 
      }]);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/20 border border-green-500/30">
            <Terminal className="text-green-400" size={20} />
          </div>
          <h2 className="text-2xl font-bold text-white">Live Deployment Logs</h2>
        </div>
        
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium"
        >
          {isPaused ? <Play size={16} /> : <Pause size={16} />}
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>

      {/* Terminal */}
      <div className="relative">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-black/60 border border-green-500/20 rounded-t-2xl">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-3 text-xs text-gray-400 font-mono">deployment-pipeline.log</span>
        </div>

        {/* Terminal Body */}
        <div 
          className="bg-black border border-green-500/20 rounded-b-2xl p-6 h-[400px] overflow-y-auto font-mono text-sm space-y-2 shadow-inner"
          style={{
            boxShadow: 'inset 0 2px 20px rgba(34, 197, 94, 0.1)'
          }}
        >
          {logs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-4 items-start ${
                log.type === 'success' ? 'text-green-400' :
                log.type === 'error' ? 'text-red-400' :
                log.type === 'warning' ? 'text-yellow-400' :
                'text-gray-400'
              }`}
            >
              <span className="text-green-500 opacity-60 text-xs">[{log.time}]</span>
              <span className="flex-1">
                <span className="text-green-600">$</span> {log.message}
              </span>
            </motion.div>
          ))}
          <div ref={logsEndRef} />
          
          {/* Cursor */}
          <div className="flex items-center gap-2 mt-4">
            <span className="text-green-500">$</span>
            <span className="w-2 h-4 bg-green-400 animate-pulse" />
          </div>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 border-2 border-green-500/20 rounded-2xl pointer-events-none" />
      </div>
    </div>
  );
}

export default LogsTerminal;
