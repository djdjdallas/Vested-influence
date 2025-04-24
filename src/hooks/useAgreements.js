"use client";

import { useState, useEffect } from 'react';

export default function useAgreements(options = {}) {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { status } = options;
  
  useEffect(() => {
    async function fetchAgreements() {
      try {
        setLoading(true);
        setError(null);
        
        // Build query params
        let url = '/api/agreements';
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        if (params.toString()) url += `?${params.toString()}`;
        
        // In a real app, this would fetch from the API
        // const response = await fetch(url);
        // if (!response.ok) throw new Error('Failed to fetch agreements');
        // const data = await response.json();
        // setAgreements(data.agreements);
        
        // For demo purposes, return mock data
        const mockAgreements = [
          { 
            id: '1', 
            title: 'Fitness Product Campaign', 
            influencer: 'Alex Fitness', 
            status: 'active', 
            equityOffered: '1.0%', 
            milestones: { completed: 2, total: 5 },
            createdAt: '2025-03-15',
          },
          { 
            id: '2', 
            title: 'Tech Review Series', 
            influencer: 'Jordan Smith', 
            status: 'active', 
            equityOffered: '0.5%', 
            milestones: { completed: 1, total: 3 },
            createdAt: '2025-03-20',
          },
          { 
            id: '3', 
            title: 'Fashion Collection Promotion', 
            influencer: 'Mia Johnson', 
            status: 'pending', 
            equityOffered: '0.75%', 
            milestones: { completed: 0, total: 4 },
            createdAt: '2025-04-01',
          },
          { 
            id: '4', 
            title: 'Cooking Show Integration', 
            influencer: 'Chef Taylor', 
            status: 'completed', 
            equityOffered: '0.25%', 
            milestones: { completed: 3, total: 3 },
            createdAt: '2025-02-10',
          }
        ];
        
        // Filter by status if provided
        const filteredAgreements = status
          ? mockAgreements.filter(a => a.status === status)
          : mockAgreements;
        
        setAgreements(filteredAgreements);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAgreements();
  }, [status]);
  
  const createAgreement = async (agreementData) => {
    try {
      setError(null);
      
      // In a real app, this would POST to the API
      // const response = await fetch('/api/agreements', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(agreementData)
      // });
      // if (!response.ok) throw new Error('Failed to create agreement');
      // const data = await response.json();
      // const newAgreement = data.agreement;
      
      // For demo purposes, mock creation
      const newAgreement = {
        id: String(agreements.length + 1),
        ...agreementData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
      
      setAgreements(prev => [...prev, newAgreement]);
      return newAgreement;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  
  const getAgreement = async (id) => {
    try {
      setError(null);
      
      // In a real app, this would GET from the API
      // const response = await fetch(`/api/agreements/${id}`);
      // if (!response.ok) throw new Error('Failed to fetch agreement');
      // const data = await response.json();
      // return data.agreement;
      
      // For demo purposes, find in current state
      const agreement = agreements.find(a => a.id === id);
      if (!agreement) throw new Error('Agreement not found');
      return agreement;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  
  const updateAgreement = async (id, updates) => {
    try {
      setError(null);
      
      // In a real app, this would PUT to the API
      // const response = await fetch(`/api/agreements/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates)
      // });
      // if (!response.ok) throw new Error('Failed to update agreement');
      // const data = await response.json();
      // const updatedAgreement = data.agreement;
      
      // For demo purposes, update in current state
      const updatedAgreements = agreements.map(a => 
        a.id === id ? { ...a, ...updates } : a
      );
      
      setAgreements(updatedAgreements);
      return updatedAgreements.find(a => a.id === id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  
  const deleteAgreement = async (id) => {
    try {
      setError(null);
      
      // In a real app, this would DELETE to the API
      // const response = await fetch(`/api/agreements/${id}`, { method: 'DELETE' });
      // if (!response.ok) throw new Error('Failed to delete agreement');
      
      // For demo purposes, remove from current state
      setAgreements(prev => prev.filter(a => a.id !== id));
      return { success: true };
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  
  return {
    agreements,
    loading,
    error,
    createAgreement,
    getAgreement,
    updateAgreement,
    deleteAgreement
  };
}
