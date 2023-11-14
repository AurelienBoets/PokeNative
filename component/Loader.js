import {View, Text, StyleSheet} from 'react-native';

const Loader = () => {
  const styles = StyleSheet.create({
    loader: {
      justifyContent: 'center',
      height: '100%',
    },
    loaderText: {
      textAlign: 'center',
      color: 'black',
      fontSize: 40,
    },
  });
  return (
    <View style={styles.loader}>
      <Text style={styles.loaderText}>Loading...</Text>
    </View>
  );
};

export default Loader;
