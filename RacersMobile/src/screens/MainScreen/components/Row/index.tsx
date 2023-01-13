import React from 'react';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {TRacer} from '../../../../types/racers';
import useStyles from './styles';
import useTypography from '../../../../theme/typpography';
import {percentage} from '../../../../helpers/math';
type TProps = {
  racer: TRacer;
};
const RacerRow: React.FC<TProps> = ({racer}) => {
  const styles = useStyles();
  const typography = useTypography();
  const {t} = useTranslation();

  return (
    <View key={racer.name} style={styles.container}>
      <View style={styles.dataRow}>
        <View style={styles.dataBlock}>
          <Text style={typography.label}>{t('mainScreen.labels.name')}</Text>
          {/* <Text style={typography.label}>{t('mainScreen.labels.weight')}</Text> */}
          <Text style={typography.label}>{t('mainScreen.labels.color')}</Text>
          {/* <Text style={typography.label}>{t('mainScreen.labels.length')}</Text> */}
          <Text style={typography.label}>{t('mainScreen.labels.status')}</Text>
          {racer.winLikelihood != null && (
            <Text style={typography.label}>
              {t('mainScreen.labels.winLikelihood')}
            </Text>
          )}
        </View>
        <View>
          <Text style={typography.p}>{racer.name}</Text>
          {/* <Text style={typography.p}>{racer.weight}</Text> */}
          <Text style={typography.p}>{racer.color}</Text>
          {/* <Text style={typography.p}>{racer.length}</Text> */}
          <Text style={typography.p}>
            {t(`mainScreen.racerStatus.${racer.status}`)}
          </Text>
          {racer.winLikelihood != null && (
            <Text style={typography.p}>{`${percentage(
              racer.winLikelihood,
            )}%`}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default RacerRow;
