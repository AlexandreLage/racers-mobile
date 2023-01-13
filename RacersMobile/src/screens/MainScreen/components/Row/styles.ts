import {StyleSheet} from 'react-native';
import {useTheme} from '../../../../theme';

const useStyles = () => {
  const {colors, layout} = useTheme();
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background1,
      marginHorizontal: layout.margin1,
    },
    dataRow: {
      ...layout.containerRow,
      padding: layout.padding1,
    },
    dataBlock: {marginRight: layout.marginRight1},
  });
};

export default useStyles;
