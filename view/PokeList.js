import axios from 'axios';
import {useState, useEffect} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';

const PokeList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?offset=10&limit=50')
      .then(async resp => {
        await resp.data.results.forEach(item => {
          axios
            .get(item.url)
            .then(response => {
              setPokemons(oldArray => [
                ...oldArray,
                {
                  img: response.data.sprites.front_default,
                  name: response.data.name,
                  type: response.data.types,
                  id: response.data.id,
                },
              ]);
            })
            .catch(err => {
              console.log(err);
            });
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
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        numColumns={2}
        data={pokemons}
        renderItem={({item}) => {
          return (
            <Pressable>
              <View>
                <Text>{item.name}</Text>
                <FlatList
                  data={item.type}
                  renderItem={({item}) => {
                    return <Text>{item.type.name}</Text>;
                  }}
                  keyExtractor={(item, index) => {
                    return index;
                  }}
                />
              </View>
            </Pressable>
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
