// Date formatter
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Number formatter with commas
export const formatNumber = (num) => {
  if (num === undefined || num === null) return '';
  
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Currency formatter
export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === undefined || amount === null) return '';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

// Percentage formatter
export const formatPercentage = (value, decimalPlaces = 2) => {
  if (value === undefined || value === null) return '';
  
  return `${value.toFixed(decimalPlaces)}%`;
};

// Engagement rate calculator
export const calculateEngagementRate = (engagements, impressions) => {
  if (!impressions || impressions === 0) return 0;
  
  return (engagements / impressions) * 100;
};

// Truncate long text with ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};

// Status formatter
export const formatStatus = (status) => {
  if (!status) return '';
  
  // Convert from kebab-case or snake_case to Title Case
  return status
    .replace(/[-_]/g, ' ')
    .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

// Social media handle formatter
export const formatSocialHandle = (handle, platform) => {
  if (!handle) return '';
  
  switch (platform.toLowerCase()) {
    case 'instagram':
    case 'twitter':
    case 'tiktok':
      return `@${handle.replace(/^@/, '')}`;
    case 'youtube':
      return handle;
    default:
      return handle;
  }
};

// Time ago formatter
export const timeAgo = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
};
