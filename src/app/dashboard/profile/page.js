"use client";

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProfileForm from '@/components/forms/ProfileForm';

export default function Profile() {
  // Mock data for demonstration
  const [profile, setProfile] = useState({
    personal: {
      name: 'Alex Johnson',
      email: 'alex@example.com',
      phone: '(555) 123-4567',
      role: 'startup' // 'startup', 'influencer', or 'legal'
    },
    company: {
      name: 'Tech Innovations Inc.',
      website: 'https://techinnovations.example.com',
      industry: 'SaaS',
      stage: 'seed',
      foundingDate: '2024-06-01'
    },
    socialMedia: {
      instagram: 'techinnovations',
      twitter: 'techinnovations',
      linkedin: 'tech-innovations-inc',
      youtube: ''
    },
    preferences: {
      notifyNewMessages: true,
      notifyMetricsUpdates: true,
      notifyMilestoneCompletion: true,
      twoFactorAuth: false
    }
  });
  
  const handleUpdateProfile = (section, updates) => {
    setProfile({
      ...profile,
      [section]: {
        ...profile[section],
        ...updates
      }
    });
  };
  
  const handleSaveProfile = () => {
    // In a real app, this would save to the backend
    console.log('Saving profile:', profile);
    // Show success message
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <p className="text-gray-500">Manage your account information and preferences</p>
        </div>
        
        <ProfileForm 
          profile={profile} 
          onUpdateProfile={handleUpdateProfile}
          onSaveProfile={handleSaveProfile}
        />
      </div>
    </DashboardLayout>
  );
}
