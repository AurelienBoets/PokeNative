import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Loader from '../component/Loader';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Evolve from '../component/Evolve';

const PokeDetails = ({route}) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(null);
  const [evolves, setEvolves] = useState([]);
  const [description, setDescription] = useState(null);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      backgroundColor: route.params.color,
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    typesContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    typeText: {
      marginRight: 8,
      fontSize: 16,
      color: 'white',
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 75,
    },
    mainDetailsContainer: {
      marginBottom: 16,
    },
    detailsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    detailsText: {
      fontSize: 16,
    },
    evolveChainContainer: {
      marginBottom: 16,
    },
  });

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
        setUrl(resp.data.evolution_chain.url);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (url) {
        try {
          const resp = await axios.get(url);
          let chain = resp.data.chain;

          while (chain) {
            const pokemonResp = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${chain.species.name}`,
            );

            const newPokemon = {
              name: chain.species.name,
              img: pokemonResp.data.sprites.front_default,
            };

            setEvolves(oldArray => [...oldArray, newPokemon]);
            chain = chain.evolves_to[0];
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [url]);

  useEffect(() => {
    if (pokemon && description && evolves) {
      const newEvolves = evolves.sort((a, b) => a.img - b.img);
      setEvolves(newEvolves);
      setLoading(false);
    }
  }, [pokemon, description, evolves]);

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <View>
          <Text style={styles.headerText}>{route.params.name}</Text>
          <View style={styles.typesContainer}>
            <FlatList
              data={pokemon.types}
              horizontal
              renderItem={({item}) => (
                <Text style={styles.typeText}>
                  {item.type.name.charAt(0).toUpperCase() +
                    item.type.name.slice(1)}
                </Text>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
        <Image
          source={{uri: pokemon.sprites.front_default}}
          style={styles.image}
        />
      </View>
      <View>
        <Text style={styles.detailsTitle}>Details</Text>
        <Text style={styles.detailsText}>{description}</Text>
        <View style={styles.mainDetailsContainer}>
          <View>
            <Text style={styles.detailsTitle}>Height</Text>
            <Text style={styles.detailsText}>{pokemon.height * 10}cm</Text>
          </View>
          <View>
            <Text style={styles.detailsTitle}>Weight</Text>
            <Text style={styles.detailsText}>{pokemon.weight / 10}kg</Text>
          </View>
        </View>
        <Text style={styles.detailsTitle}>Evolve Chain</Text>
        <View style={styles.evolveChainContainer}>
          <FlatList
            data={evolves}
            renderItem={({item, index}) => {
              if (evolves[index + 1]) {
                return (
                  <Evolve
                    firstPokemon={item}
                    secondPokemon={evolves[index + 1]}
                  />
                );
              }
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default PokeDetails;
