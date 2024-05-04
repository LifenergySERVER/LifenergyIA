// AppNavigator.js
import React from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Screennavigator from '../screen/Screennavigator';

// Define o componente do navegador
const AppNavigator = () => {
  return (
    <NavigationContainer >
        <Screennavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
