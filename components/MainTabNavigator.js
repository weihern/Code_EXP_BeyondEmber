import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../pages/profile";
import ChallengeStack from "../pages/challenge.js";
import Home from "../pages/home";
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    return <Icon width={25} height={25} color={color} name={route.name} />;
                },
                tabBarActiveTintColor: "#BB86FC",
                tabBarInactiveTintColor: "#BDBDBD",
                tabBarStyle: {
                    backgroundColor: "#272A37", // Set the background color of the tab bar
                    borderTopWidth: 0.5,
                    borderTopColor: "#414657",
                    paddingBottom: remToDp(1) + 15,
                    paddingTop: remToDp(1),
                    paddingHorizontal: 5,
                },
            })}
        >
            <Tab.Screen
                name="Home"
                options={{
                    header: () => <Header title="BeyondEmber" />,
                    // The style below is not applying
                }}
                component={LoginScreen}
            />
            <Tab.Screen
                options={{
                    header: () => <Header title="Challenge" />,
                }}
                name="Challenge"
                component={ChallengeStack}
            />
            <Tab.Screen
                options={{
                    header: () => <Header title="Profile" />,
                }}
                name="Profile"
                component={Profile}
            />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
