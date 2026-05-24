import { useState, useEffect } from 'react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

function TopNavbar() {
  const [time, setTime] = useState(new Date());
  const [environment, setEnvironment] = useState('production');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10 px-8 py-4">
      <div className="flex items-center justify-between">
         {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search deployments, logs, metrics..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
          </div>
        </div>
        {/* Right Section */}
        <div className="flex items-center gap-6 ml-8">
          
          {/* Live Clock */}
          <div className="hidden md:flex items-center gap-2 text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="font-mono text-sm">
              {time.toLocaleTimeString('en-US', { hour12: false })}
            </span>
          </div>
          {/* Environment Selector */}
          <div className="relative">
            <select
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
              className="appearance-none bg-white/5 border border-white/10 rounded-lg px-4 py-2 pr-10 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer hover:bg-white/10 transition-all"
            >
              <option value="production">🚀 Production</option>
              <option value="staging">🔧 Staging</option>
              <option value="development">💻 Development</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">3</span>
          </motion.button>
          {/* User Avatar */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 hover:from-blue-500/30 hover:to-purple-500/30 transition-all"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <User size={18} />
            </div>
            <span className="hidden lg:block font-medium text-sm">Admin</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;
