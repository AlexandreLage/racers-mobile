import gql from 'graphql-tag';
import {TRacer} from '../../../types/racers';

export const QUERY_RACERS = gql`
  query racers {
    racers {
      name
      length
      color
      weight
    }
  }
`;

export type TRacersGqlData = {
  racers: TRacer[];
};
