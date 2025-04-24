export default function AgreementCalculator({ agreement }) {
  // Calculate vesting schedule
  const calculateVestingSchedule = () => {
    const { percentageOffered, vestingPeriod, cliffPeriod } = agreement.equityDetails;
    
    if (!vestingPeriod) return [];
    
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

  const vestingSchedule = calculateVestingSchedule();
  const totalVestedAfterCliff = vestingSchedule.find(s => s.month === agreement.equityDetails.cliffPeriod)?.cumulativeVested || 0;
  
  return (
    <div className="space-y-4">
      <div className="border border-gray-200 rounded-md p-4">
        <div className="text-sm text-gray-500 mb-1">Total Equity Offered</div>
        <div className="text-xl font-bold">{agreement.equityDetails.percentageOffered}%</div>
      </div>
      
      <div className="border border-gray-200 rounded-md p-4">
        <div className="text-sm text-gray-500 mb-1">Vesting Schedule</div>
        <div className="text-sm">
          <p className="mb-1">
            <span className="font-medium">Cliff Period:</span> {agreement.equityDetails.cliffPeriod} months 
            {agreement.equityDetails.cliffPeriod > 0 && ` (${totalVestedAfterCliff.toFixed(2)}% vests after cliff)`}
          </p>
          <p className="mb-1">
            <span className="font-medium">Full Vesting Period:</span> {agreement.equityDetails.vestingPeriod} months
          </p>
          <p>
            <span className="font-medium">Monthly Vesting:</span> {(agreement.equityDetails.percentageOffered / agreement.equityDetails.vestingPeriod).toFixed(3)}% per month after cliff
          </p>
        </div>
      </div>
      
      <div>
        <div className="text-sm text-gray-500 mb-2">Performance Requirements</div>
        <ul className="text-sm space-y-2">
          {agreement.deliverables.map((deliverable, index) => (
            <li key={index} className="flex justify-between">
              <span>Deliverable {index + 1}:</span>
              <span>{deliverable.metrics.target.toLocaleString()} {deliverable.metrics.type}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
