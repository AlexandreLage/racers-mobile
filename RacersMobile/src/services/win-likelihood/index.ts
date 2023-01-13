function generateRacerWinLikelihoodCalculator() {
  const delay = 7000 + Math.random() * 7000;
  const likelihoodOfRacerWinning = Math.random();

  return (callback: (value: number) => void) => {
    setTimeout(() => {
      callback(likelihoodOfRacerWinning);
    }, delay);
  };
}

export {generateRacerWinLikelihoodCalculator};
