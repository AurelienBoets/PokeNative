import axios from 'axios';
import {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import PokeCard from '../component/PokeCard';
import Loader from '../component/Loader';

const PokeList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const styles = StyleSheet.create({
    container: {
      margin: 10,
    },
  });
  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?offset=10&limit=50')
      .then(resp => {
        const pokeDetailRequest = resp.data.results.map(item =>
          axios.get(item.url),
        );
        Promise.all(pokeDetailRequest)
          .then(response => {
            const sortedPoke = response.map(res => ({
              img: res.data.sprites.front_default,
              name:
                res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1),
              type: res.data.types,
              id: res.data.id,
            }));

            setPokemons(sortedPoke);
          })
          .catch(err => {
            console.log(err);
          });
      })

      .catch(err => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (pokemons.length == 50) {
      setLoading(false);
    }
  }, [pokemons]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={pokemons}
        renderItem={({item}) => {
          return (
            <PokeCard
              pokemon={item}
              color={item.type[item.type.length - 1].type.name}
            />
          );
        }}
        keyExtractor={(item, index) => {
          return index;
        }}
      />
    </View>
  );
};
export default PokeList;
