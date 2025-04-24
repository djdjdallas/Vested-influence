"use client";

import { useState } from 'react';

export default function useMetrics() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch metrics for an agreement
  const fetchMetrics = async (agreementId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/metrics?agreementId=${agreementId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch metrics');
      }
      
      const data = await response.json();
      setMetrics(data.metrics);
      
      return data.metrics;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Add new metrics
  const addMetrics = async (metricsData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metricsData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add metrics');
      }
      
      const data = await response.json();
      
      // Update local state
      setMetrics((prev) => [data.metric, ...prev]);
      
      return data.metric;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch metrics from social platforms
  const fetchSocialMetrics = async (platform, handle, dateRange) => {
    try {
      setLoading(true);
      setError(null);

      // In a real app, this would call your API to fetch from social platforms
      // Using mock data for demonstration
      console.log(`Fetching ${platform} metrics for ${handle} in range ${dateRange}`);
      
      // Mock data based on platform
      let mockData = [];
      
      const endDate = new Date();
      const startDate = new Date();
      
      // Determine date range
      if (dateRange === '7d') {
        startDate.setDate(endDate.getDate() - 7);
      } else if (dateRange === '30d') {
        startDate.setDate(endDate.getDate() - 30);
      } else if (dateRange === '90d') {
        startDate.setDate(endDate.getDate() - 90);
      }
      
      // Generate mock data for each day in the range
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        
        // Base metrics with some randomization
        const baseViews = platform === 'Instagram' ? 5000 : 
                          platform === 'TikTok' ? 20000 : 
                          platform === 'YouTube' ? 10000 : 3000;
        
        const views = baseViews + Math.floor(Math.random() * baseViews * 0.5);
        const likes = Math.floor(views * (0.05 + Math.random() * 0.05));
        const comments = Math.floor(likes * (0.1 + Math.random() * 0.1));
        const shares = Math.floor(likes * (0.05 + Math.random() * 0.05));
        
        mockData.push({
          date: dateStr,
          views,
          likes,
          comments,
          shares
        });
        
        // Move to next day
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      return mockData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    metrics,
    loading,
    error,
    fetchMetrics,
    addMetrics,
    fetchSocialMetrics,
  };
}
