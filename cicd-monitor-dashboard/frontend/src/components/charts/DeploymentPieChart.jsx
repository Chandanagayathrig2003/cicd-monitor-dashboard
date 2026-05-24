import {
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';

function DeploymentPieChart({
  deployments
}) {
  const success = deployments.filter(
    (d) => d.status === 'SUCCESS'
  ).length;

  const failed = deployments.filter(
    (d) => d.status === 'FAILED'
  ).length;

  const running = deployments.filter(
    (d) => d.status === 'RUNNING'
  ).length;

  const data = [
    {
      name: 'Success',
      value: success
    },
    {
      name: 'Failed',
      value: failed
    },
    {
      name: 'Running',
      value: running
    }
  ];

  const COLORS = [
    '#22c55e',
    '#ef4444',
    '#facc15'
  ];

  return (
    <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">
      <h2 className="text-2xl font-bold mb-4">
        Pipeline Metrics
      </h2>

      <PieChart width={350} height={250}>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={90}
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index]}
            />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </div>
  );
}

export default DeploymentPieChart;
