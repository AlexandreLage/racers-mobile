import {StyleSheet} from 'react-native';
import {useTheme} from '../../theme';

const useStyles = () => {
  const {colors, layout} = useTheme();
  return StyleSheet.create({
    container: {
      borderRadius: 16,
      backgroundColor: colors.background1,
      borderColor: colors.primary1,
      margin: layout.margin1,
      padding: layout.padding1,
      borderWidth: layout.borderWidth1,
      ...layout.centerChildren,
    },
    containerRow: {...layout.containerRow},
    indicatorContainer: {marginLeft: layout.marginLeft1},
    label: {color: colors.primary1},
    eyebrow: {color: colors.primary1},
  });
};

export default useStyles;
