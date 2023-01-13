import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import useStyles from './styles';
import useTypography from '../../../../theme/typpography';
import {useTheme} from '../../../../theme';
type TProps = {
  title: string;
  subtitle: string;
  loading: boolean;
};
const Header: React.FC<TProps> = ({title, subtitle, loading}) => {
  const {colors} = useTheme();
  const styles = useStyles();
  const typography = useTypography();
  return (
    <View style={styles.container}>
      <View>
        <Text style={typography.h1}>{title}</Text>
        <Text style={typography.h2}>{subtitle}</Text>
      </View>
      {loading && (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator color={colors.primary1} size="large" />
        </View>
      )}
    </View>
  );
};

export default Header;
