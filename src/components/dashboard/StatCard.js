export default function StatCard({ stat }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="text-sm font-medium text-gray-500 truncate">
              {stat.title}
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">
              {stat.value}
            </div>
          </div>
          <div className="ml-auto">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                stat.changeType === 'increase'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {stat.change}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
