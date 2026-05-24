function LogsPanel() {
  const logs = [
    '[10:02:01] Build Started',
    '[10:02:08] Running Tests',
    '[10:02:15] Docker Image Built',
    '[10:02:20] Deployment Successful'
  ];

  return (
    <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Deployment Logs
      </h2>

      <div className="bg-black p-4 rounded-lg text-green-400 font-mono space-y-3 h-64 overflow-y-auto">
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
}

export default LogsPanel;
