import {useLazyQuery} from '@apollo/client';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, LayoutAnimation, SafeAreaView, StatusBar} from 'react-native';
import Button from '../../common/Button';
import {sortRacers} from '../../helpers/racers';
import {
  QUERY_RACERS,
  TRacersGqlData,
} from '../../services/racers-graphql/queries/racers';
import {generateRacerWinLikelihoodCalculator} from '../../services/win-likelihood';
import {useTheme} from '../../theme';
import {TRaceStatus} from '../../types/race';
import {TRacer} from '../../types/racers';
import Header from './components/Header';
import Row from './components/Row';
import useStyles from './styles';

const MainScreen = () => {
  const {colors, isDarkMode} = useTheme();
  const styles = useStyles(colors);
  const {t} = useTranslation();

  const [raceStatus, setRaceStatus] = useState<TRaceStatus>('not-yet-run');
  const [racers, setRacers] = useState<TRacer[]>([]);
  const refRacers = useRef<TRacer[]>([]);
  const [loadRacers, {data, loading, called, refetch: refetchRacers}] =
    useLazyQuery<TRacersGqlData>(QUERY_RACERS);

  useEffect(() => {
    if (!loading && data?.racers) {
      const _racers: TRacer[] = data.racers.map(racer => ({
        ...racer,
        status: 'not-yet-run',
      }));
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setRacers(_racers);
      refRacers.current = _racers;
    }
  }, [data, loading]);

  const callback = (name: string) => (value: number) => {
    let countCompleted = 0;

    const _racers: TRacer[] = refRacers.current.map(racer => {
      let newRacer: TRacer;
      if (racer.name === name) {
        countCompleted++;
        newRacer = {
          ...racer,
          status: 'calculated',
          winLikelihood: value,
        };
      } else {
        if (racer.status === 'calculated') {
          countCompleted++;
        }
        newRacer = racer;
      }

      if (racers.length === countCompleted) {
        setRaceStatus('all-calculated');
      }

      return newRacer;
    });

    const sortedRacers = sortRacers(_racers);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setRacers(sortedRacers);
    refRacers.current = sortedRacers;
  };

  const handleCalculation = () => {
    setRaceStatus('in-progress');

    const _racers: TRacer[] = racers.map(racer => {
      const calculate = generateRacerWinLikelihoodCalculator();
      calculate(callback(racer.name));

      return {
        ...racer,
        status: 'in-progress',
      };
    });
    setRacers(_racers);
    refRacers.current = _racers;
  };

  const reset = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setRacers([]);
    setRaceStatus('not-yet-run');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background1}
        networkActivityIndicatorVisible={loading}
      />
      <Header
        title="Racers"
        subtitle={t(`mainScreen.raceStatus.${raceStatus}`)}
        loading={raceStatus === 'in-progress'}
      />
      {racers.length !== 0 && (
        <FlatList data={racers} renderItem={({item}) => <Row racer={item} />} />
      )}
      {raceStatus === 'not-yet-run' && racers.length === 0 && (
        <Button
          title={t('mainScreen.buttons.loadRacers')}
          onPress={!called ? loadRacers : refetchRacers}
          loading={loading}
        />
      )}
      {raceStatus === 'not-yet-run' && racers.length > 0 && (
        <Button
          title={t('mainScreen.buttons.run')}
          onPress={handleCalculation}
        />
      )}
      {raceStatus === 'all-calculated' && (
        <Button title={t('mainScreen.buttons.reset')} onPress={reset} />
      )}
    </SafeAreaView>
  );
};

export default MainScreen;
