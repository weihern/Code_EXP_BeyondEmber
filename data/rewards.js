export default function rewardAsObjects() {
    return rewards.map((reward, index) => {
      return {
        reward,
        id: index
      };
    });
  }
  
  const rewards = [
    "grab",
    "ntuc",
    "capitalLand",
    "gojek",
  ];