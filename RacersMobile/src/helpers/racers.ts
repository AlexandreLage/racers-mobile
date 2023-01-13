import {TRacer} from '../types/racers';

export const sortRacers = (racers: TRacer[]) => {
  return racers.sort(
    (r1, r2) => (r2.winLikelihood ?? 0) - (r1.winLikelihood ?? 0),
  );
};
