import React, {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {DarkColors, LightColors, TColors} from './colors';
import {DefaultLayout, TLayout} from './layout';

type SystemColorSchemeOptions = 'light' | 'dark';
type TThemeContext = {
  colors: TColors;
  isDarkMode: boolean;
  layout: TLayout;
};

const initialValue: TThemeContext = {
  colors: LightColors,
  isDarkMode: false,
  layout: DefaultLayout,
};
const ThemeContext = React.createContext(initialValue);
const Provider = ThemeContext.Provider;

const ThemeContextProvider: React.FC<any> = ({children}) => {
  const systemColorScheme = (useColorScheme() ??
    'light') as SystemColorSchemeOptions;
  const [userColorScheme, setUserColorScheme] = useState(systemColorScheme);
  const [currentColors, setCurrentColors] = useState(initialValue.colors);

  useEffect(() => {
    //update user color scheme if system colors change
    setUserColorScheme(systemColorScheme ?? 'light');
  }, [systemColorScheme]);

  useEffect(() => {
    //Update current colors if user color scheme changes
    setCurrentColors(userColorScheme === 'light' ? LightColors : DarkColors);
  }, [userColorScheme]);

  const values: TThemeContext = {
    colors: currentColors,
    isDarkMode: userColorScheme === 'dark',
    layout: initialValue.layout,
  };

  return <Provider value={values}>{children}</Provider>;
};

const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('ThemeContext must be used within a context provider.');
  }
  return context;
};

export {useTheme, ThemeContextProvider};
