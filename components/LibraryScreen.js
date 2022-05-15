import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, FlatList, StatusBar, TouchableOpacity, Image, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { filterSelector, setFilter } from "./filterSlice";
import { filteredLibrarySelector } from "./librarySlice";

const Card = ({ title, artist, picture }) => {
    return (
        <View style={{ width: '100%', alignItems: 'center' }}>
            <Image style={{ width: 150, height: 150 }} source={{ uri: picture }} />
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{title}</Text>
            <Text style={{ fontSize: 12 }}>{artist}</Text>
        </View>
    );
};

const listEmptyComponent = () => {
    return (
        <Text style={{ color: 'gray', textAlign: 'center', marginVertical: 50 }}>C'est vide !</Text>
    );
}

const LibraryScreen = () => {
    const navigation = useNavigation();
    const library = useSelector(filteredLibrarySelector);
    const filter = useSelector(filterSelector);
    const filtersValue = ['Tous', 0, 1, 2, 3, 4, 5];
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>Filtre: </Text>
                {filtersValue.map((value, key) => {
                    return (
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => dispatch(setFilter(value))} 
                            key={key}
                        >
                            <Text style={[filter == value ? styles.selected : styles.unselected, styles.buttonText]}>{value}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <FlatList
                data={library}
                ListEmptyComponent={listEmptyComponent}
                key={item => item.id}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate("Song", item)}>
                        <Card
                            title={item.title}
                            artist={item.artist}
                            picture={item.picture}
                        />
                    </TouchableOpacity>
                )}
            />
            <StatusBar syle='auto' />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        height: '100%',
    },
    button: {
        marginVertical: 10,
        marginHorizontal: 5,
    },
    buttonText: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        textAlign: 'center',
        borderRadius: 5,
    },
    selected: {
        backgroundColor: '#007bff',
        color: 'white',
    },
    unselected: {
        backgroundColor: '#ececed',
    },
    card: {
        width: '50%',
        marginBottom: 10,
    },
});

export default LibraryScreen;