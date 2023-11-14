import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './view/Home';
import PokeList from './view/PokeList';
import PokeDetails from './view/PokeDetails';

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
        <Stack.Screen
          name="Details"
          component={PokeDetails}
          options={({route}) => ({title: route.params.name})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
