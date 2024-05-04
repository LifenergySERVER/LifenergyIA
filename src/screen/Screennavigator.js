// AppNavigator.js
import React from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// Importa as telas ou componentes necessários
import Login from '../models/Home/Login';
import HomeScreen from '../models/Home/Home';
import Fototelacheia from '../models/Home/Fototelacheia';

// Cria uma pilha de navegação
const Stack = createStackNavigator();

// Define o componente do navegador
const Screennavigator = () => {
  return (
      <Stack.Navigator  >
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name="Fototelacheia" options={{ headerShown: false }} component={Fototelacheia} />
  
      </Stack.Navigator>
  );
};

export default Screennavigator;
