import {Text, View, Image, StyleSheet} from 'react-native';

const Evolve = ({firstPokemon, secondPokemon}) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 8,
    },
    pokemonContainer: {
      alignItems: 'center',
    },
    arrowContainer: {
      alignItems: 'center',
    },
    arrowImage: {
      width: 50,
      height: 50,
    },
    pokemonImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    pokemonName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.pokemonContainer}>
        <Image source={{uri: firstPokemon.img}} style={styles.pokemonImage} />
        <Text style={styles.pokemonName}>{firstPokemon.name}</Text>
      </View>
      <View style={styles.arrowContainer}>
        <Image
          source={require('../img/fleche.png')}
          style={styles.arrowImage}
        />
      </View>
      <View style={styles.pokemonContainer}>
        <Image source={{uri: secondPokemon.img}} style={styles.pokemonImage} />
        <Text style={styles.pokemonName}>{secondPokemon.name}</Text>
      </View>
    </View>
  );
};

export default Evolve;
