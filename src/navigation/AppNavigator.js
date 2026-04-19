import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/splash/SplashScreen.js";
import OnboardingScreen from "../screens/onboarding/OnboardingScreen.js";
import SignInScreen from "../screens/auth/SignInScreen.js";
import EnterPhoneScreen from "../screens/auth/EnterPhoneScreen.js";
import OTPScreen from "../screens/auth/OTPScreen.js";
import SelectLocationScreen from "../screens/location/SelectLocation.js";
import SignUpScreen from "../screens/auth/SignUpScreen.js";
import LoginScreen from "../screens/auth/LogInScreen.js";
import ProductDetailScreen from "../screens/product/ProductDetailScreen.js";
import SearchScreen from "../screens/explore/SearchScreen.js";
import FilterScreen from "../screens/explore/FilterScreen.js";
import BeveragesScreen from "../screens/explore/BeveragesScreen.js";
import TabNavigator from "./TabNavigator.js";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="EnterPhone" component={EnterPhoneScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="Location" component={SelectLocationScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Beverages" component={BeveragesScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Filter" component={FilterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
