import {ViewStyle} from 'react-native';

export type TLayout = {
  margin1: number;
  marginRight1: number;
  marginLeft1: number;
  padding1: number;
  borderWidth1: number;
  borderWidth2: number;
  centerChildren: ViewStyle;
  containerRow: ViewStyle;
};

export const DefaultLayout: TLayout = {
  padding1: 16,
  margin1: 16,
  marginRight1: 8,
  marginLeft1: 8,
  borderWidth1: 1,
  borderWidth2: 0.5,
  centerChildren: {justifyContent: 'center', alignItems: 'center'},
  containerRow: {flexDirection: 'row'},
};
