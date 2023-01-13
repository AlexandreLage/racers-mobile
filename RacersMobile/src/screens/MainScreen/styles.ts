import {StyleSheet} from 'react-native';
import {TColors} from '../../theme/colors';

const useStyles = (colors: TColors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background1,
      justifyContent: 'flex-end',
    },
  });
};

export default useStyles;
