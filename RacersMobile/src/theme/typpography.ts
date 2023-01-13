import {TextStyle} from 'react-native';
import {useTheme} from '.';

export type TTypography = {
  label: TextStyle;
  p: TextStyle;
  h1: TextStyle;
  h2: TextStyle;
};

const useTypography = () => {
  const {colors} = useTheme();
  const defaultTypography: TTypography = {
    label: {
      color: colors.primary1,
      fontSize: 17,
      fontWeight: 'bold',
      fontFamily: 'System',
    },
    p: {color: colors.primary1, fontSize: 17, fontFamily: 'System'},
    h1: {
      color: colors.primary1,
      fontSize: 32,
      fontWeight: 'bold',
      fontFamily: 'System',
    },
    h2: {
      color: colors.primary1,
      fontSize: 24,
      fontFamily: 'System',
    },
  };

  return defaultTypography;
};

export default useTypography;
