import * as React from "react";
import {
  StyleSheet,
  Text,
  Button,
} from "react-native";

import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

function DefaultNavigator(props) {
  return (
    <Stack.Navigator
      initialRouteName="HomeView"
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "seagreen",
        }
      }}>
      {props.children}
    </Stack.Navigator>
  )
};


export default DefaultNavigator;