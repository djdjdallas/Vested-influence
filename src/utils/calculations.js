// Calculate total equity value based on company valuation
export const calculateEquityValue = (percentageOffered, companyValuation) => {
  if (!percentageOffered || !companyValuation) return 0;
  
  return (percentageOffered / 100) * companyValuation;
};

// Calculate vesting schedule
export const calculateVestingSchedule = (percentageOffered, vestingPeriod, cliffPeriod) => {
  if (!percentageOffered || !vestingPeriod) return [];
  
  const monthlyVesting = percentageOffered / vestingPeriod;
  const schedule = [];
  
  for (let month = 1; month <= vestingPeriod; month++) {
    let vestedAmount = 0;
    
    if (month >= cliffPeriod) {
      // At cliff, vest all accumulated equity
      if (month === cliffPeriod) {
        vestedAmount = monthlyVesting * cliffPeriod;
      } else {
        vestedAmount = monthlyVesting;
      }
    }
    
    schedule.push({
      month,
      vestedAmount,
      cumulativeVested: month >= cliffPeriod 
        ? Math.min(percentageOffered, monthlyVesting * (month < cliffPeriod ? 0 : month))
        : 0
    });
  }
  
  return schedule;
};

// Calculate ROI multiple
export const calculateRoiMultiple = (equityValue, alternativeCost) => {
  if (!equityValue || !alternativeCost || alternativeCost === 0) return 0;
  
  return equityValue / alternativeCost;
};

// Calculate engagement rate
export const calculateEngagementRate = (likes, comments, shares, views) => {
  if (!views || views === 0) return 0;
  
  const totalEngagements = (likes || 0) + (comments || 0) + (shares || 0);
  return (totalEngagements / views) * 100;
};

// Calculate target achievement percentage
export const calculateTargetAchievement = (actual, target) => {
  if (!target || target === 0) return 0;
  
  return (actual / target) * 100;
};

// Calculate monthly vesting amount
export const calculateMonthlyVesting = (percentageOffered, vestingPeriod) => {
  if (!percentageOffered || !vestingPeriod || vestingPeriod === 0) return 0;
  
  return percentageOffered / vestingPeriod;
};

// Calculate cliff vesting amount
export const calculateCliffVesting = (percentageOffered, vestingPeriod, cliffPeriod) => {
  if (!percentageOffered || !vestingPeriod || vestingPeriod === 0 || !cliffPeriod) return 0;
  
  const monthlyVesting = percentageOffered / vestingPeriod;
  return monthlyVesting * cliffPeriod;
};

// Calculate remaining vesting
export const calculateRemainingVesting = (percentageOffered, vestedToDate) => {
  if (!percentageOffered || !vestedToDate) return percentageOffered;
  
  return Math.max(0, percentageOffered - vestedToDate);
};

// Calculate vesting percentage
export const calculateVestingPercentage = (vestedToDate, percentageOffered) => {
  if (!percentageOffered || percentageOffered === 0) return 0;
  
  return (vestedToDate / percentageOffered) * 100;
};
