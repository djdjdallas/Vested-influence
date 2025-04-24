export default function ActivityFeed({ activities }) {
  // Function to get icon based on activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'agreement_created':
        return '📝';
      case 'agreement_signed':
        return '✅';
      case 'milestone_completed':
        return '🏆';
      default:
        return '📣';
    }
  };

  // Function to get description based on activity type
  const getActivityDescription = (activity) => {
    switch (activity.type) {
      case 'agreement_created':
        return `${activity.user} created a new agreement: ${activity.target}`;
      case 'agreement_signed':
        return `${activity.user} signed the agreement: ${activity.target}`;
      case 'milestone_completed':
        return `${activity.user} completed a milestone for: ${activity.target}`;
      default:
        return `${activity.user} performed an action on ${activity.target}`;
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {activities.map((activity, activityIdx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {activityIdx !== activities.length - 1 ? (
                <span
                  className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                    <span className="text-lg">{getActivityIcon(activity.type)}</span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">
                        {getActivityDescription(activity)}
                      </p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">{activity.date}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
