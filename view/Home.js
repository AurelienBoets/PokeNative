import {useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet, Text, View} from 'react-native';

const Home = () => {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      color: 'black',
      marginLeft: 5,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    btn: {
      borderRadius: 10,
      height: 60,
      width: 160,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'white',
      textAlign: 'center',
      fontSize: 25,
    },
  });
  return (
    <View>
      <Text style={styles.title}>Attrapez les tous, Pokemon !!</Text>
      <View style={styles.container}>
        <Pressable
          style={[styles.btn, {backgroundColor: '#097969'}]}
          onPress={() => navigation.navigate('List')}>
          <Text style={styles.text}>Pokemons</Text>
        </Pressable>
        <Pressable style={[styles.btn, {backgroundColor: '#89CFF0'}]}>
          <Text style={styles.text}>Pokedex</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default Home;
