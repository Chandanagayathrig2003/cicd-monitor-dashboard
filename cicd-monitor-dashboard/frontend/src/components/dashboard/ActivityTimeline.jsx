import {
  CheckCircle2,
  Clock3,
  AlertTriangle
} from 'lucide-react';

function ActivityTimeline() {
  const activities = [
    {
      type: 'success',
      text: 'Deployment Successful',
      time: '2 mins ago'
    },
    {
      type: 'running',
      text: 'Integration Tests Running',
      time: '5 mins ago'
    },
    {
      type: 'failed',
      text: 'Pipeline Failed',
      time: '12 mins ago'
    }
  ];

  return (
    <div
      className="
        bg-white/5
        border border-white/10
        rounded-3xl
        p-8
        mt-10
        backdrop-blur-xl
      "
    >
      <h2 className="text-3xl font-bold mb-8">
        Deployment Activity
      </h2>

      <div className="space-y-8">

        {activities.map(
          (activity, index) => (
            <div
              key={index}
              className="flex gap-5"
            >
              <div>
                {activity.type ===
                'success' ? (
                  <CheckCircle2 className="text-green-400" />
                ) : activity.type ===
                  'running' ? (
                  <Clock3 className="text-yellow-400" />
                ) : (
                  <AlertTriangle className="text-red-400" />
                )}
              </div>

              <div>
                <p className="font-semibold">
                  {activity.text}
                </p>

                <p className="text-gray-400 text-sm mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          )
        )}

      </div>
    </div>
  );
}

export default ActivityTimeline;
