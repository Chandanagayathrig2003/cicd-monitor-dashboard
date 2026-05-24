import Sidebar from '../components/layout/Sidebar';

function Analytics() {
  return (
    <div className="flex bg-[#020617] min-h-screen text-white">

      <Sidebar />

      <div className="flex-1 p-10">
        <h1 className="text-5xl font-bold">
          Analytics
        </h1>

        <p className="text-gray-400 mt-4">
          Analyze deployment trends and pipeline performance.
        </p>
      </div>
    </div>
  );
}

export default Analytics;
