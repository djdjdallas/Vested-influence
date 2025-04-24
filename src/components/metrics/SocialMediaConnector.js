export default function SocialMediaConnector({ platform }) {
  // Generate appropriate button based on platform
  const getButtonStyle = () => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600';
      case 'youtube':
        return 'bg-red-600 hover:bg-red-700';
      case 'tiktok':
        return 'bg-black hover:bg-gray-900';
      case 'twitter':
        return 'bg-blue-400 hover:bg-blue-500';
      case 'facebook':
        return 'bg-blue-600 hover:bg-blue-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };
  
  const platformIcon = () => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return '📸';
      case 'youtube':
        return '🎬';
      case 'tiktok':
        return '🎵';
      case 'twitter':
        return '🐦';
      case 'facebook':
        return '��';
      default:
        return '📱';
    }
  };
  
  return (
    <div>
      <button
        className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${getButtonStyle()}`}
      >
        <span className="mr-2">{platformIcon()}</span>
        Connect {platform}
      </button>
      <p className="mt-2 text-xs text-gray-500">
        Connect your account to automatically import metrics
      </p>
    </div>
  );
}
