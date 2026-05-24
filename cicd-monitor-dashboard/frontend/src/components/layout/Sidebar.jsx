import {
  LayoutDashboard,
  Activity,
  BarChart3,
  Settings
} from 'lucide-react';

function Sidebar() {
  return (
    <div className="w-64 bg-[#111827] border-r border-gray-800 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-white mb-10">
        DevOps Monitor
      </h1>

      <div className="space-y-6">
        <div className="flex items-center gap-3 text-blue-400 cursor-pointer">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </div>

        <div className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer">
          <Activity size={20} />
          <span>Deployments</span>
        </div>

        <div className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer">
          <BarChart3 size={20} />
          <span>Analytics</span>
        </div>

        <div className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer">
          <Settings size={20} />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
