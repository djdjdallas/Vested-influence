/**
 * Calculate monthly vesting amount based on equity details
 * @param {Object} equityDetails - Equity details object
 * @returns {number} - Monthly vesting percentage
 */
export function calculateMonthlyVesting(equityDetails) {
  const { percentageOffered, vestingPeriod } = equityDetails;
  if (!vestingPeriod || vestingPeriod === 0) return 0;
  return percentageOffered / vestingPeriod;
}

/**
 * Calculate total vested equity based on elapsed time
 * @param {Object} equityDetails - Equity details object
 * @param {string} startDate - ISO date string of agreement start
 * @returns {number} - Total vested percentage
 */
export function calculateVestedEquity(equityDetails, startDate) {
  const { percentageOffered, vestingPeriod, cliffPeriod } = equityDetails;
  const start = new Date(startDate);
  const now = new Date();
  
  // Calculate months elapsed
  const monthsElapsed = (
    (now.getFullYear() - start.getFullYear()) * 12 + 
    (now.getMonth() - start.getMonth())
  );
  
  // If before cliff, nothing vested
  if (monthsElapsed < cliffPeriod) return 0;
  
  // Calculate monthly vesting
  const monthlyVesting = calculateMonthlyVesting(equityDetails);
  
  // Calculate total vested (capped at total percentage)
  return Math.min(percentageOffered, monthlyVesting * monthsElapsed);
}

/**
 * Generate vesting schedule for the full vesting period
 * @param {Object} equityDetails - Equity details object
 * @param {string} startDate - ISO date string of agreement start
 * @returns {Array} - Array of vesting events
 */
export function generateVestingSchedule(equityDetails, startDate) {
  const { percentageOffered, vestingPeriod, cliffPeriod } = equityDetails;
  const start = new Date(startDate);
  const monthlyVesting = calculateMonthlyVesting(equityDetails);
  const schedule = [];
  
  for (let month = 1; month <= vestingPeriod; month++) {
    const date = new Date(start);
    date.setMonth(date.getMonth() + month);
    
    let vestedThisMonth = 0;
    let cumulativeVested = 0;
    
    if (month >= cliffPeriod) {
      // At cliff, vest all accumulated equity
      if (month === cliffPeriod) {
        vestedThisMonth = monthlyVesting * cliffPeriod;
      } else {
        vestedThisMonth = monthlyVesting;
      }
      
      cumulativeVested = Math.min(percentageOffered, monthlyVesting * month);
    }
    
    schedule.push({
      month,
      date: date.toISOString(),
      vestedThisMonth,
      cumulativeVested
    });
  }
  
  return schedule;
}

/**
 * Calculate engagement rate based on social media metrics
 * @param {Object} metrics - Object containing views, likes, comments, shares
 * @returns {number} - Engagement rate percentage
 */
export function calculateEngagementRate(metrics) {
  const { views, likes = 0, comments = 0, shares = 0 } = metrics;
  if (!views || views === 0) return 0;
  
  const engagementActions = likes + comments + shares;
  return (engagementActions / views) * 100;
}

/**
 * Calculate ROI based on equity value and estimated cash equivalent
 * @param {number} equityValue - Value of equity granted
 * @param {number} cashEquivalent - Estimated cash cost for similar services
 * @returns {number} - ROI multiplier
 */
export function calculateROI(equityValue, cashEquivalent) {
  if (!cashEquivalent || cashEquivalent === 0) return 0;
  return equityValue / cashEquivalent;
}

/**
 * Calculate progress percentage towards a target
 * @param {number} current - Current value
 * @param {number} target - Target value
 * @returns {number} - Progress percentage
 */
export function calculateProgress(current, target) {
  if (!target || target === 0) return 0;
  return Math.min(100, (current / target) * 100);
}
