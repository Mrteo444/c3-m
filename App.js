import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


import DetallesScreen from './screens/DetallesScreen';
import CreateScreen from './screens/CreateScreen';
import EmpleaadosListScrenn from './screens/EmpleaadosListScrenn';


const Stack = createNativeStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='empleados' component={EmpleaadosListScrenn} />

      <Stack.Screen name='crear' component={CreateScreen} />
      
      <Stack.Screen name='detalle' component={DetallesScreen} />






    </Stack.Navigator>

  )
}





export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
