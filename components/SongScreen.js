import { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, Image, Button, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { removeFromLibrary, editRate } from "./librarySlice";

const DetailsScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();
    const [song] = useState(route.params);
    const [rate, setRate] = useState(song.rate);

    const removeClicked = () => {
        dispatch(removeFromLibrary({ id: song.id }));
        navigation.goBack();
    };

    const checkRate = (rate) => {
        if (rate >= 0 && rate <= 5) {
            setRate(rate);
            dispatch(editRate({ ...song, rate: rate }));
        }
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
            <Button title="Supprimer de la bibliothèque" onPress={removeClicked} />
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