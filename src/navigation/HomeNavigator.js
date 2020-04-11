import * as React from "react";
import {
  StyleSheet,
  Text,
  Button,
} from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import DefaultNavigator from "components/DefaultNavigator.js";

import HomeView from "screens/HomeView.js";
import SettingsView from "screens/SettingsView.js";


const Stack = createStackNavigator();

function HomeNavigator() {
  return (
    <DefaultNavigator>
      <Stack.Screen
        name="HomeView"
        component={HomeView}
        options={{ title: "Home" }}>
      </Stack.Screen>

      <Stack.Screen
        name="SettingsView"
        component={SettingsView}
        options={{ title: "Settings" }}>
      </Stack.Screen>
    </DefaultNavigator>
  )
};


export default HomeNavigator;