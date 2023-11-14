import {Text, View, FlatList, Image} from 'react-native';
import Loader from '../component/Loader';
import {useState, useEffect} from 'react';
import axios from 'axios';

const PokeDetails = ({route}) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
      .then(resp => {
        setPokemon(resp.data);
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${route.params.id}`)
      .then(resp => {
        setDescription(resp.data.flavor_text_entries[0].flavor_text);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (pokemon && description) {
      setLoading(false);
    }
  }, [pokemon, description]);

  if (loading) {
    return <Loader />;
  }
  return (
    <View>
      <View>
        <Text>{route.params.name}</Text>
        <FlatList
          data={pokemon.types}
          renderItem={({item}) => {
            return (
              <Text>
                {item.type.name.charAt(0).toUpperCase() +
                  item.type.name.slice(1)}
              </Text>
            );
          }}
          keyExtractor={(item, index) => {
            return index;
          }}
        />
        <View>
          <Image source={{uri: pokemon.sprites.front_default}} />
        </View>
      </View>
      <View>
        <Text>Details</Text>
        <Text>{description}</Text>
        <View>
          <View>
            <Text>Height</Text>
            <Text>{pokemon.height * 10}cm</Text>
          </View>
          <View>
            <Text>Weight</Text>
            <Text>{pokemon.weight / 10}kg</Text>
          </View>
          <Text>Evolve Chain</Text>
        </View>
      </View>
    </View>
  );
};

export default PokeDetails;
