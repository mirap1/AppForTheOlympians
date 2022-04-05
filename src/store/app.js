import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts, Inter_200ExtraLight } from "@expo-google-fonts/inter";
import Footer from "./src/Components/Footer";
import AphroditeRatingPickUpLines from "./src/Screens/AphroditeRatingPickUpLines";
import ZeusOutfitForum from "./src/Screens/ZeusOutfitForum";
import LoginPage from "./src/Screens/LoginPage";
import AresWeaponOnlineOrder from "./src/Screens/AresWeaponOnlineOrder";
import AthenaDailyChessGame from "./src/Screens/AthenaDailyChessGame";
import HephaestusRobotDesignBattle from "./src/Screens/HephaestusRobotDesignBattle";
import { Provider } from "react-redux";
import { store } from "./src/store/store";

const Stack = createNativeStackNavigator();

export default function App() {
    let [fontsLoaded] = useFonts({
        Inter_200ExtraLight,
    });

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="LoginPage"
                        component={LoginPage}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ZeusOutfitForum"
                        component={ZeusOutfitForum}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="AresWeaponOnlineOrder"
                        component={AresWeaponOnlineOrder}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                    name="AphroditeRatingPickUpLines"
                    component={AphroditeRatingPickUpLines}
                    options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="AthenaDailyChessGame"
                        component={AthenaDailyChessGame}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="HephaestusRobotDesignBattle"
                        component={HephaestusRobotDesignBattle}
                        options={{ headerShown: false }}
                    />

                </Stack.Navigator>
                <Footer />
            </NavigationContainer>
        </Provider>
    );
}
