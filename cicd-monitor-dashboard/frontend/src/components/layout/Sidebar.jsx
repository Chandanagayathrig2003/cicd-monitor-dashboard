import {
  LayoutDashboard,
  Activity,
  BarChart3,
  Settings,
  ServerCrash
} from 'lucide-react';

import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  return (
    <div
      className="
        hidden
        lg:flex
        flex-col
        w-72
        bg-black/30
        backdrop-blur-xl
        border-r border-white/10
        min-h-screen
        p-8
        sticky
        top-0
      "
    >
      {/* Logo */}
      <div className="flex items-center gap-4 mb-16">

        <div
          className="
            bg-gradient-to-r
            from-blue-500
            to-purple-600
            p-3
            rounded-2xl
          "
        >
          <ServerCrash size={30} />
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            DevOps Monitor
          </h1>

          <p className="text-gray-400 text-sm">
            Enterprise Platform
          </p>
        </div>
      </div>

      {/* Nav */}
      <div className="space-y-5">

        <SidebarItem
          to="/"
          icon={<LayoutDashboard />}
          label="Dashboard"
          active={location.pathname === '/'}
        />

        <SidebarItem
          to="/deployments"
          icon={<Activity />}
          label="Deployments"
          active={
            location.pathname === '/deployments'
          }
        />

        <SidebarItem
          to="/analytics"
          icon={<BarChart3 />}
          label="Analytics"
          active={
            location.pathname === '/analytics'
          }
        />

        <SidebarItem
          to="/settings"
          icon={<Settings />}
          label="Settings"
          active={
            location.pathname === '/settings'
          }
        />

      </div>
    </div>
  );
}

function SidebarItem({
  to,
  icon,
  label,
  active
}) {
  return (
    <Link to={to}>
      <div
        className={`
          flex
          items-center
          gap-4
          px-5
          py-4
          rounded-2xl
          transition-all
          ${
            active
              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/20 text-white'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }
        `}
      >
        {icon}

        <span className="font-medium">
          {label}
        </span>
      </div>
    </Link>
  );
}

export default Sidebar;
