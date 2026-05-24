import {
  LayoutDashboard,
  Activity,
  BarChart3,
  Settings,
  ServerCrash
} from 'lucide-react';

function Sidebar() {
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
      <div className="flex items-center gap-4 mb-16">
        <div
          className="
            bg-gradient-to-r
            from-blue-500
            to-purple-600
            p-3
            rounded-2xl
            shadow-xl
          "
        >
          <ServerCrash size={30} />
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            DevOps Monitor
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Enterprise Platform
          </p>
        </div>
      </div>

      <div className="space-y-5">

        <SidebarItem
          icon={<LayoutDashboard />}
          label="Dashboard"
          active
        />

        <SidebarItem
          icon={<Activity />}
          label="Deployments"
        />

        <SidebarItem
          icon={<BarChart3 />}
          label="Analytics"
        />

        <SidebarItem
          icon={<Settings />}
          label="Settings"
        />
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active
}) {
  return (
    <div
      className={`
        flex
        items-center
        gap-4
        px-5
        py-4
        rounded-2xl
        cursor-pointer
        transition-all
        ${
          active
            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/20'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }
      `}
    >
      {icon}

      <span className="font-medium">
        {label}
      </span>
    </div>
  );
}

export default Sidebar;
