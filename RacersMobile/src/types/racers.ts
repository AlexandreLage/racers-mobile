export type TRacerStatus = 'not-yet-run' | 'in-progress' | 'calculated';

export type TRacer = {
  name: string;
  length: number;
  color: 'RED' | 'BLUE' | 'BLACK' | 'SILVER' | 'GREEN';
  weight: number;
  status: TRacerStatus;
  winLikelihood?: number;
};
