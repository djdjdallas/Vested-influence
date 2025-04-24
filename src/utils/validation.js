/**
 * Validate email address format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} - Validation result with isValid flag and message
 */
export function validatePassword(password) {
  if (!password || password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long'
    };
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number'
    };
  }
  
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter'
    };
  }
  
  return {
    isValid: true,
    message: 'Password is strong'
  };
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Validate social media handle format
 * @param {string} handle - Social media handle to validate
 * @param {string} platform - Platform name (e.g., 'instagram')
 * @returns {boolean} - True if valid, false otherwise
 */
export function isValidSocialHandle(handle, platform) {
  if (!handle) return false;
  
  switch (platform.toLowerCase()) {
    case 'instagram':
    case 'twitter':
    case 'tiktok':
      // Simple validation - no spaces or special characters except underscore
      return /^[a-zA-Z0-9_]+$/.test(handle);
    case 'youtube':
      // YouTube channels can have spaces and some special characters
      return handle.length > 0;
    default:
      return handle.length > 0;
  }
}

/**
 * Validate equity percentage (between 0.01% and 100%)
 * @param {number} percentage - Equity percentage to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function isValidEquityPercentage(percentage) {
  return !isNaN(percentage) && percentage >= 0.01 && percentage <= 100;
}

/**
 * Validate a date is in the future
 * @param {string} dateStr - ISO date string to validate
 * @returns {boolean} - True if valid future date, false otherwise
 */
export function isValidFutureDate(dateStr) {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    return date > now;
  } catch (e) {
    return false;
  }
}

/**
 * Validate agreement form data
 * @param {Object} formData - Agreement form data
 * @returns {Object} - Validation result with errors object
 */
export function validateAgreementForm(formData) {
  const errors = {};
  
  // Validate title
  if (!formData.title || formData.title.trim() === '') {
    errors.title = 'Agreement title is required';
  }
  
  // Validate influencer
  if (!formData.influencer || !formData.influencer.name) {
    errors.influencer = { name: 'Influencer name is required' };
  }
  
  if (formData.influencer && formData.influencer.email && !isValidEmail(formData.influencer.email)) {
    errors.influencer = { 
      ...errors.influencer,
      email: 'Invalid email address'
    };
  }
  
  // Validate equity details
  if (!isValidEquityPercentage(formData.equityDetails?.percentageOffered)) {
    errors.equityDetails = { 
      ...errors.equityDetails,
      percentageOffered: 'Equity percentage must be between 0.01% and 100%'
    };
  }
  
  // Validate at least one deliverable
  if (!formData.deliverables || formData.deliverables.length === 0) {
    errors.deliverables = 'At least one deliverable is required';
  } else {
    // Validate each deliverable
    const deliverableErrors = formData.deliverables.map(deliverable => {
      const delErrors = {};
      
      if (!deliverable.description || deliverable.description.trim() === '') {
        delErrors.description = 'Description is required';
      }
      
      if (!deliverable.dueDate) {
        delErrors.dueDate = 'Due date is required';
      } else if (!isValidFutureDate(deliverable.dueDate)) {
        delErrors.dueDate = 'Due date must be in the future';
      }
      
      if (!deliverable.metrics || !deliverable.metrics.target || deliverable.metrics.target <= 0) {
        delErrors.metrics = { target: 'Target must be greater than 0' };
      }
      
      return Object.keys(delErrors).length > 0 ? delErrors : null;
    });
    
    if (deliverableErrors.some(err => err !== null)) {
      errors.deliverables = deliverableErrors;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
