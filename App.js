import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './view/Home';
import PokeList from './view/PokeList';

const Stack = createNativeStackNavigator();

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="List"
          component={PokeList}
          options={{title: 'Pokemons'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
