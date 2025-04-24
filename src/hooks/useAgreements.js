"use client";

import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase/client';

export default function useAgreements() {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all agreements
  const fetchAgreements = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);

      // Build query params from filters
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      // Fetch from API
      const response = await fetch(`/api/agreements?${params.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch agreements');
      }
      
      const data = await response.json();
      setAgreements(data.agreements);
      
      return data.agreements;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get single agreement by ID
  const getAgreement = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/agreements/${id}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch agreement');
      }
      
      const data = await response.json();
      return data.agreement;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create new agreement
  const createAgreement = async (agreementData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/agreements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agreementData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create agreement');
      }
      
      const data = await response.json();
      
      // Update local state
      setAgreements((prev) => [...prev, data.agreement]);
      
      return data.agreement;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update agreement
  const updateAgreement = async (id, updates) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/agreements/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update agreement');
      }
      
      const data = await response.json();
      
      // Update local state
      setAgreements((prev) =>
        prev.map((agreement) => (agreement.id === id ? data.agreement : agreement))
      );
      
      return data.agreement;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete agreement
  const deleteAgreement = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/agreements/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete agreement');
      }
      
      // Update local state
      setAgreements((prev) => prev.filter((agreement) => agreement.id !== id));
      
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    agreements,
    loading,
    error,
    fetchAgreements,
    getAgreement,
    createAgreement,
    updateAgreement,
    deleteAgreement,
  };
}
