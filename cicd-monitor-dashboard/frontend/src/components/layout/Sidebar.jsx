import {
  LayoutDashboard,
  Activity,
  BarChart3,
  Settings,
  ServerCrash
} from 'lucide-react';

function Sidebar() {
  return (
    <div className="hidden lg:flex flex-col w-72 bg-[#111827] border-r border-gray-800 min-h-screen p-8 sticky top-0">

      <div className="flex items-center gap-3 mb-14">
        <ServerCrash
          className="text-blue-500"
          size={34}
        />

        <h1 className="text-3xl font-bold text-white">
          DevOps Monitor
        </h1>
      </div>

      <div className="space-y-4">

        <div className="flex items-center gap-4 bg-blue-500/20 text-blue-400 px-5 py-4 rounded-xl cursor-pointer">
          <LayoutDashboard size={22} />
          <span className="font-medium">
            Dashboard
          </span>
        </div>

        <div className="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-gray-800 px-5 py-4 rounded-xl cursor-pointer transition">
          <Activity size={22} />
          <span>
            Deployments
          </span>
        </div>

        <div className="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-gray-800 px-5 py-4 rounded-xl cursor-pointer transition">
          <BarChart3 size={22} />
          <span>
            Analytics
          </span>
        </div>

        <div className="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-gray-800 px-5 py-4 rounded-xl cursor-pointer transition">
          <Settings size={22} />
          <span>
            Settings
          </span>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;
