import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, FlatList, StatusBar, TouchableOpacity, Image, Text } from "react-native";

const createRequest = (search, filter) => {
    return ("https://itunes.apple.com/search?term=" + search + "&entity=song&country=fr&limit=15&attribute=" + filter);
}

const Card = ({ title, artist, picture }) => {
    return (
        <View style={{ width: '100%', alignItems: 'center' }}>
            <Image style={{ width: 150, height: 150 }} source={{ uri: picture }} />
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{title}</Text>
            <Text style={{ fontSize: 12 }}>{artist}</Text>
        </View>
    );
};

const HomeScreen = () => {
    const navigation = useNavigation();
    const [search, onChangeSearch] = useState('');
    const [songs, setSongs] = useState([]);
    const [filter, setFilter] = useState('songTerm');

    const transformSong = (song) => {
        return {
            id: song.trackId,
            title: song.trackName,
            artist: song.artistName,
            album: song.collectionName,
            genre: song.primaryGenreName,
            picture: song.artworkUrl100,
        };
    };

    const fetchSongs = async () => {
        let res = await fetch(createRequest(search, filter));
        let json = await res.json();
        setSongs(json.results.map(transformSong));
    };

    useEffect(() => {
        fetchSongs();
    }, [search, filter]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeSearch}
                value={search}
                placeholder="Rechercher une musique"
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>Par: </Text>
                <TouchableOpacity style={styles.button} onPress={() => setFilter('songTerm')}>
                    <Text style={[filter == 'songTerm' ? styles.selected : styles.unselected, styles.buttonText]}>
                        Titre
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setFilter('artistTerm')}>
                    <Text style={[filter == 'artistTerm' ? styles.selected : styles.unselected, styles.buttonText]}>
                        Artiste
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={songs}
                key={item => item.id}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate("Details", item)}>
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
    input: {
        marginTop: 10,
        height: 40,
        backgroundColor: '#ececed',
        padding: 10,
        borderRadius: 5,
    },
    button: {
        marginVertical: 10,
        marginHorizontal: 5,
        width: 80,
    },
    buttonText: {
        paddingVertical: 5,
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

export default HomeScreen;