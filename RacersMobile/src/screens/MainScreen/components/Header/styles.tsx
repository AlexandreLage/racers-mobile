import {StyleSheet} from 'react-native';
import {useTheme} from '../../../../theme';

const useStyles = () => {
  const {colors, layout} = useTheme();
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background1,
      margin: layout.margin1,
      padding: layout.padding1,
      ...layout.containerRow,
    },
    indicatorContainer: {
      marginLeft: layout.marginLeft1,
    },
  });
};

export default useStyles;
