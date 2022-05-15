import { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, Image, Button, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { addToLibrary } from "./librarySlice";

const DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [song] = useState(route.params);
  const [rate, setRate] = useState('');

  const dispatch = useDispatch();
  const addClicked = () => {
    dispatch(addToLibrary({ ...song, rate: rate }));
    navigation.goBack();
    navigation.navigate("Local");
    navigation.navigate("Library");
  };

  const checkRate = (rate) => {
    if (rate >= 0 && rate <= 5)
      setRate(rate);
  }

  return (
    <View style={styles.container}>
      <Image style={{ width: 250, height: 250 }} source={{ uri: song.picture }} />
      <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center' }}>{song.title}</Text>
      <Text style={{ fontSize: 24, textAlign: 'center' }}>{song.artist}</Text>
      <Text style={{ fontSize: 16, textAlign: 'center' }}>{song.album}</Text>
      <Text style={{ fontSize: 16, textAlign: 'center' }}>{song.genre}</Text>
      <TextInput
        style={{ textAlign: 'center' }}
        value={rate}
        onChangeText={checkRate}
        placeholder='Ajouter une note (sur 5)'
        keyboardType='numeric'
      />
      <Button title="Ajouter à la bibliothèque" onPress={addClicked} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    height: '100%',
  },
});

export default DetailsScreen;