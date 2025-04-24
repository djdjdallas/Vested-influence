"use client";

import { useState, useEffect } from 'react';

export default function useMetrics(agreementId) {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!agreementId) return;
    
    async function fetchMetrics() {
      try {
        setLoading(true);
        setError(null);
        
        // In a real app, this would fetch from the API
        // const response = await fetch(`/api/metrics?agreementId=${agreementId}`);
        // if (!response.ok) throw new Error('Failed to fetch metrics');
        // const data = await response.json();
        // setMetrics(data.metrics);
        
        // Mock data for demonstration
        const mockMetricsData = {
          '1': [
            { date: '2025-03-01', views: 15000, likes: 1200, comments: 300, shares: 150 },
            { date: '2025-03-08', views: 18000, likes: 1500, comments: 350, shares: 180 },
            { date: '2025-03-15', views: 21000, likes: 1800, comments: 420, shares: 210 },
            { date: '2025-03-22', views: 19000, likes: 1600, comments: 380, shares: 190 },
            { date: '2025-03-29', views: 22000, likes: 1900, comments: 450, shares: 230 },
            { date: '2025-04-05', views: 24000, likes: 2100, comments: 480, shares: 250 },
            { date: '2025-04-12', views: 28000, likes: 2400, comments: 520, shares: 280 },
          ],
          '2': [
            { date: '2025-03-10', views: 45000, likes: 3200, comments: 850, shares: 1200 },
            { date: '2025-03-24', views: 52000, likes: 3800, comments: 920, shares: 1400 },
            { date: '2025-04-07', views: 58000, likes: 4200, comments: 980, shares: 1600 },
          ],
          '3': [
            { date: '2025-04-01', views: 120000, likes: 15000, comments: 3200, shares: 8500 },
            { date: '2025-04-08', views: 180000, likes: 22000, comments: 4500, shares: 12000 },
            { date: '2025-04-15', views: 210000, likes: 26000, comments: 5300, shares: 14000 },
          ]
        };
        
        setMetrics(mockMetricsData[agreementId] || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchMetrics();
  }, [agreementId]);
  
  const addMetric = async (metricData) => {
    try {
      setError(null);
      
      // In a real app, this would POST to the API
      // const response = await fetch('/api/metrics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...metricData, agreementId })
      // });
      // if (!response.ok) throw new Error('Failed to add metric');
      // const data = await response.json();
      // const newMetric = data.metric;
      
      // For demo purposes, add to current state
      const newMetric = { ...metricData, date: new Date().toISOString() };
      setMetrics(prev => [newMetric, ...prev]);
      return newMetric;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  
  const refreshMetrics = async () => {
    if (!agreementId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would re-fetch from the API
      // Similar to the initial fetch, but we can add a timestamp to force a refresh
      // const response = await fetch(`/api/metrics?agreementId=${agreementId}&t=${Date.now()}`);
      // if (!response.ok) throw new Error('Failed to refresh metrics');
      // const data = await response.json();
      // setMetrics(data.metrics);
      
      // For demo purposes, simulate adding a new data point
      if (metrics.length > 0) {
        const latestMetric = metrics[0];
        const newMetric = {
          date: new Date().toISOString(),
          views: latestMetric.views * 1.05, // 5% increase
          likes: latestMetric.likes * 1.05,
          comments: latestMetric.comments * 1.05,
          shares: latestMetric.shares * 1.05
        };
        setMetrics(prev => [newMetric, ...prev]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return { metrics, loading, error, addMetric, refreshMetrics };
}
