import Link from 'next/link';

export default function AgreementCard({ agreement }) {
  // Function to get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-medium text-gray-900">
            <Link href={`/dashboard/agreements/${agreement.id}`} className="hover:underline">
              {agreement.title}
            </Link>
          </h2>
          <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span>Influencer: {agreement.influencer}</span>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span>Equity: {agreement.equityOffered}</span>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span>Created: {agreement.createdAt}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(agreement.status)}`}>
            {agreement.status.charAt(0).toUpperCase() + agreement.status.slice(1)}
          </span>
          <div className="text-sm text-gray-500">
            Milestones: {agreement.milestones.completed}/{agreement.milestones.total}
          </div>
        </div>
      </div>
    </div>
  );
}
