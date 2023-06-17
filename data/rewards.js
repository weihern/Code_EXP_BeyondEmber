export default function rewardsAsObjects() {
    return rewards.map((reward, index) => {
      return {
        reward,
        id: index
      };
    });
  }
  
  const rewards = [
    "Grab vouncher",
    "Ntuc voucher",
    "H&M voucher",
    "GoJek noucher",
  ];