import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useTheme} from '../../theme';
import useStyles from './styles';

type TProps = {
  onPress: Function;
  title?: string;
  eyebrow?: string;
  loading?: boolean;
};
const Button: React.FC<TProps> = ({onPress, title, eyebrow, loading}) => {
  const {colors} = useTheme();
  const styles = useStyles();

  const handleTouch = () => onPress();

  return (
    <TouchableWithoutFeedback onPress={!loading ? handleTouch : undefined}>
      <View style={styles.container}>
        {eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}
        <View style={styles.containerRow}>
          <Text style={styles.label}>{title}</Text>
          {loading && (
            <View style={styles.indicatorContainer}>
              <ActivityIndicator color={colors.primary1} />
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Button;
