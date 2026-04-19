import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/home/HomeScreen";
import ExploreScreen from "../screens/explore/ExploreScreen";
import CartScreen from "../screens/cart/CartScreen";
import FavoriteScreen from "../screens/favorite/FavoriteScreen";
import AccountScreen from "../screens/account/AccountScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#53B175",
        tabBarInactiveTintColor: "#181725",
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Shop") {
            return <FontAwesome name="shopping-bag" size={size} color={color} />;
          } else if (route.name === "Explore") {
            return <Ionicons name="search" size={size} color={color} />;
          } else if (route.name === "Cart") {
            return <FontAwesome name="shopping-cart" size={size} color={color} />;
          } else if (route.name === "Favourite") {
            return <FontAwesome name="heart-o" size={size} color={color} />;
          } else if (route.name === "Account") {
            return <FontAwesome name="user-o" size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Shop" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Favourite" component={FavoriteScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
