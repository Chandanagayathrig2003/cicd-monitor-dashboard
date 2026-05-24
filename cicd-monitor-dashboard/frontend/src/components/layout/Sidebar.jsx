import {
  LayoutDashboard,
  Activity,
  BarChart3,
  Settings,
  ServerCrash,
  Zap
} from 'lucide-react';

import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function Sidebar() {
  const location = useLocation();

  return (
    <div className=\"hidden lg:flex flex-col w-72 bg-black/40 backdrop-blur-xl border-r border-white/10 min-h-screen p-8 sticky top-0\">
      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className=\"flex items-center gap-4 mb-16\"
      >
        <div className=\"relative\">
          <div className=\"absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-xl opacity-50 rounded-2xl\" />
          <div className=\"relative bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl\">
            <ServerCrash size={30} />
          </div>
        </div>

        <div>
          <h1 className=\"text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent\">
            DevOps Monitor
          </h1>
          <p className=\"text-gray-400 text-xs flex items-center gap-1 mt-1\">
            <Zap size={12} className=\"text-yellow-400\" />
            Enterprise Platform
          </p>
        </div>
      </motion.div>

      {/* Nav */}
      <nav className=\"space-y-3 flex-1\">
        <SidebarItem
          to=\"/\"
          icon={<LayoutDashboard size={20} />}
          label=\"Dashboard\"
          active={location.pathname === '/'}
        />

        <SidebarItem
          to=\"/deployments\"
          icon={<Activity size={20} />}
          label=\"Deployments\"
          active={location.pathname === '/deployments'}
        />

        <SidebarItem
          to=\"/analytics\"
          icon={<BarChart3 size={20} />}
          label=\"Analytics\"
          active={location.pathname === '/analytics'}
        />

        <SidebarItem
          to=\"/settings\"
          icon={<Settings size={20} />}
          label=\"Settings\"
          active={location.pathname === '/settings'}
        />
      </nav>

      {/* Footer Status */}
      <div className=\"mt-auto pt-6 border-t border-white/10\">
        <div className=\"bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10\">
          <div className=\"flex items-center justify-between mb-2\">
            <span className=\"text-sm text-gray-400\">System Status</span>
            <span className=\"flex items-center gap-2 text-xs text-green-400\">
              <span className=\"w-2 h-2 bg-green-400 rounded-full animate-pulse\" />
              Healthy
            </span>
          </div>
          <div className=\"text-xs text-gray-500\">
            All services operational
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ to, icon, label, active }) {
  return (
    <Link to={to}>
      <motion.div
        whileHover={{ x: 5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          flex items-center gap-4 px-5 py-4 rounded-xl transition-all cursor-pointer group relative overflow-hidden
          ${active
            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white shadow-lg shadow-blue-500/20'
            : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
          }
        `}
      >
        {active && (
          <motion.div
            layoutId=\"activeTab\"
            className=\"absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10\"
            transition={{ type: \"spring\", bounce: 0.2, duration: 0.6 }}
          />
        )}
        
        <span className=\"relative z-10\">{icon}</span>
        <span className=\"font-medium relative z-10\">{label}</span>
        
        {active && (
          <span className=\"ml-auto relative z-10\">
            <span className=\"w-2 h-2 bg-blue-400 rounded-full block animate-pulse\" />
          </span>
        )}
      </motion.div>
    </Link>
  );
}

export default Sidebar;
