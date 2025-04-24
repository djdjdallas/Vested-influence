"use client";

export default function ProfileForm({ profile, onUpdateProfile, onSaveProfile }) {
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    onUpdateProfile('personal', { [name]: value });
  };
  
  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    onUpdateProfile('company', { [name]: value });
  };
  
  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    onUpdateProfile('socialMedia', { [name]: value });
  };
  
  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    onUpdateProfile('preferences', { [name]: checked });
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <h2 className="text-lg font-medium mb-4">Personal Information</h2>
          
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={profile.personal.name}
                onChange={handlePersonalChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={profile.personal.email}
                onChange={handlePersonalChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={profile.personal.phone}
                onChange={handlePersonalChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <select
                id="role"
                name="role"
                value={profile.personal.role}
                onChange={handlePersonalChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="startup">Startup Founder/Team</option>
                <option value="influencer">Influencer</option>
                <option value="legal">Legal Advisor</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {profile.personal.role === 'startup' && (
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-medium mb-4">Company Information</h2>
            
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  name="name"
                  id="company-name"
                  value={profile.company.name}
                  onChange={handleCompanyChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
                <input
                  type="url"
                  name="website"
                  id="website"
                  value={profile.company.website}
                  onChange={handleCompanyChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
                <input
                  type="text"
                  name="industry"
                  id="industry"
                  value={profile.company.industry}
                  onChange={handleCompanyChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="stage" className="block text-sm font-medium text-gray-700">Company Stage</label>
                <select
                  id="stage"
                  name="stage"
                  value={profile.company.stage}
                  onChange={handleCompanyChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="pre-seed">Pre-Seed</option>
                  <option value="seed">Seed</option>
                  <option value="series-a">Series A</option>
                  <option value="series-b">Series B+</option>
                  <option value="profitable">Profitable</option>
                </select>
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="foundingDate" className="block text-sm font-medium text-gray-700">Founding Date</label>
                <input
                  type="date"
                  name="foundingDate"
                  id="foundingDate"
                  value={profile.company.foundingDate}
                  onChange={handleCompanyChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <h2 className="text-lg font-medium mb-4">Social Media</h2>
          
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">Instagram Handle</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">@</span>
                <input
                  type="text"
                  name="instagram"
                  id="instagram"
                  value={profile.socialMedia.instagram}
                  onChange={handleSocialMediaChange}
                  className="flex-1 min-w-0 block w-full rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">Twitter Handle</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">@</span>
                <input
                  type="text"
                  name="twitter"
                  id="twitter"
                  value={profile.socialMedia.twitter}
                  onChange={handleSocialMediaChange}
                  className="flex-1 min-w-0 block w-full rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn</label>
              <input
                type="text"
                name="linkedin"
                id="linkedin"
                value={profile.socialMedia.linkedin}
                onChange={handleSocialMediaChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="youtube" className="block text-sm font-medium text-gray-700">YouTube Channel</label>
              <input
                type="text"
                name="youtube"
                id="youtube"
                value={profile.socialMedia.youtube}
                onChange={handleSocialMediaChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <h2 className="text-lg font-medium mb-4">Notification Preferences</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="notifyNewMessages"
                  name="notifyNewMessages"
                  type="checkbox"
                  checked={profile.preferences.notifyNewMessages}
                  onChange={handlePreferenceChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="notifyNewMessages" className="font-medium text-gray-700">New Messages</label>
                <p className="text-gray-500">Receive notifications when you get new messages</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="notifyMetricsUpdates"
                  name="notifyMetricsUpdates"
                  type="checkbox"
                  checked={profile.preferences.notifyMetricsUpdates}
                  onChange={handlePreferenceChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="notifyMetricsUpdates" className="font-medium text-gray-700">Metrics Updates</label>
                <p className="text-gray-500">Receive notifications when metrics are updated</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="notifyMilestoneCompletion"
                  name="notifyMilestoneCompletion"
                  type="checkbox"
                  checked={profile.preferences.notifyMilestoneCompletion}
                  onChange={handlePreferenceChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="notifyMilestoneCompletion" className="font-medium text-gray-700">Milestone Completion</label>
                <p className="text-gray-500">Receive notifications when milestones are completed</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="twoFactorAuth"
                  name="twoFactorAuth"
                  type="checkbox"
                  checked={profile.preferences.twoFactorAuth}
                  onChange={handlePreferenceChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="twoFactorAuth" className="font-medium text-gray-700">Two-Factor Authentication</label>
                <p className="text-gray-500">Enable two-factor authentication for your account</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onSaveProfile}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
