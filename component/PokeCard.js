import {useNavigation} from '@react-navigation/native';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';

const PokeCard = ({pokemon, color}) => {
  const colors = {
    grass: '#78C850',
    fire: '#F08030',
    water: '#6890F0',
    bug: '#A8B820',
    normal: 'lightgrey',
    poison: '#A040A0',
    electric: '#F8D030',
    ground: '#E0C068',
    fairy: '#EE99AC',
    fighting: '#C03028',
    psychic: '#F85888',
    rock: '#B8A038',
    ghost: '#705898',
    ice: '#98D8D8',
    dragon: '#7038F8',
    steel: '#B8B8D0',
    flying: '#A890F0',
  };
  const styles = StyleSheet.create({
    pokeContainer: {
      width: '45%',
      height: 125,
      backgroundColor: 'white',
      margin: 10,
      borderRadius: 8,
      flexDirection: 'row',
      backgroundColor: colors[color],
    },
    pokeTitle: {
      marginTop: 10,
      marginLeft: 10,
      color: 'white',
      fontWeight: '400',
    },
    pokeImg: {
      width: 100,
      height: 100,
    },
    imgContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    pokeSubTitle: {
      color: 'white',
      borderRadius: 15,
      backgroundColor: 'rgba(229, 228, 226,0.7)',
      textAlign: 'center',
      width: 60,
      marginLeft: 10,
      marginTop: 5,
    },
  });

  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.pokeContainer}
      onPress={() =>
        navigation.navigate('Details', {
          name: pokemon.name,
          id: pokemon.id,
          color: colors[color],
        })
      }>
      <View>
        <Text style={styles.pokeTitle}>{pokemon.name}</Text>
        <FlatList
          data={pokemon.type}
          renderItem={({item}) => {
            return (
              <Text style={styles.pokeSubTitle}>
                {item.type.name.charAt(0).toUpperCase() +
                  item.type.name.slice(1)}
              </Text>
            );
          }}
          keyExtractor={(item, index) => {
            return index;
          }}
        />
      </View>
      <View style={styles.imgContainer}>
        <Image source={{uri: pokemon.img}} style={styles.pokeImg} />
      </View>
    </Pressable>
  );
};

export default PokeCard;
