function LogsPanel() {
  const logs = [
    '[10:02:01] Build Started',
    '[10:02:08] Running Tests',
    '[10:02:15] Docker Image Built',
    '[10:02:20] Deployment Successful',
    '[10:02:25] Health Checks Passed'
  ];

  return (
    <div
      className="
        bg-black/40
        backdrop-blur-xl
        border border-white/10
        rounded-3xl
        p-7
        shadow-2xl
      "
    >
      <h2 className="text-3xl font-bold mb-6">
        Live Deployment Logs
      </h2>

      <div
        className="
          bg-black
          rounded-2xl
          p-5
          h-[350px]
          overflow-y-auto
          font-mono
          text-green-400
          space-y-4
          border border-green-500/20
        "
      >
        {logs.map((log, index) => (
          <div
            key={index}
            className="animate-pulse"
          >
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogsPanel;
