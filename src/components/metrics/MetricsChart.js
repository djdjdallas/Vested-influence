"use client";

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function MetricsChart({ data }) {
  const [metrics, setMetrics] = useState(['views']);
  
  const toggleMetric = (metric) => {
    if (metrics.includes(metric)) {
      setMetrics(metrics.filter(m => m !== metric));
    } else {
      setMetrics([...metrics, metric]);
    }
  };
  
  // Format dates for better readability
  const formattedData = data.map(item => {
    const date = new Date(item.date);
    return {
      ...item,
      displayDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  });
  
  const metricColors = {
    views: '#8884d8',
    likes: '#82ca9d',
    comments: '#ffc658',
    shares: '#ff8042'
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => toggleMetric('views')}
          className={`px-3 py-1 text-sm rounded-full ${
            metrics.includes('views') 
              ? 'bg-indigo-100 text-indigo-800' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Views
        </button>
        <button
          onClick={() => toggleMetric('likes')}
          className={`px-3 py-1 text-sm rounded-full ${
            metrics.includes('likes') 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Likes
        </button>
        <button
          onClick={() => toggleMetric('comments')}
          className={`px-3 py-1 text-sm rounded-full ${
            metrics.includes('comments') 
              ? 'bg-yellow-100 text-yellow-800' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Comments
        </button>
        <button
          onClick={() => toggleMetric('shares')}
          className={`px-3 py-1 text-sm rounded-full ${
            metrics.includes('shares') 
              ? 'bg-orange-100 text-orange-800' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Shares
        </button>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="displayDate" />
          <YAxis />
          <Tooltip />
          <Legend />
          {metrics.includes('views') && (
            <Line 
              type="monotone" 
              dataKey="views" 
              stroke={metricColors.views} 
              activeDot={{ r: 8 }} 
            />
          )}
          {metrics.includes('likes') && (
            <Line 
              type="monotone" 
              dataKey="likes" 
              stroke={metricColors.likes} 
            />
          )}
          {metrics.includes('comments') && (
            <Line 
              type="monotone" 
              dataKey="comments" 
              stroke={metricColors.comments} 
            />
          )}
          {metrics.includes('shares') && (
            <Line 
              type="monotone" 
              dataKey="shares" 
              stroke={metricColors.shares} 
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
