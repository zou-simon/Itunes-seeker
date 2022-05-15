import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import store from "./store";
import Ionicons from 'react-native-vector-icons/Ionicons';
import DetailsScreen from "./components/DetailsScreen";
import HomeScreen from "./components/HomeScreen";
import LibraryScreen from "./components/LibraryScreen";
import SongScreen from "./components/SongScreen";

const ItunesStack = createNativeStackNavigator();
const LibraryStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

let persistor = persistStore(store);

const ItunesStackScreen = () => {
  return (
    <ItunesStack.Navigator initialRouteName="Home">
      <ItunesStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Itunes' }}
      />
      <ItunesStack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </ItunesStack.Navigator>
  );
};

const LibraryStackScreen = () => {
  return (
    <LibraryStack.Navigator initialRouteName="Library">
      <LibraryStack.Screen
        name="Library"
        component={LibraryScreen}
        options={{ title: 'Bibliothèque' }}
      />
      <LibraryStack.Screen
        name="Song"
        component={SongScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </LibraryStack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Itunes') {
                  iconName = focused ? 'musical-notes' : 'musical-notes-outline';
                } else if (route.name === 'Local') {
                  iconName = focused ? 'library' : 'library-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen
              name="Itunes"
              component={ItunesStackScreen}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Local"
              component={LibraryStackScreen}
              options={{ headerShown: false, title: 'Bibliothèque' }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;