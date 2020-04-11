import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Child Navigators
import HomeNavigator from "navigation/HomeNavigator.js";

// Child Screens
import CameraView from "screens/camera/CameraView.js";


const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeView"
        // initialRouteName="CameraView"
        headerMode="none"
        mode="modal">
        <Stack.Screen
          name="HomeNavigator"
          component={HomeNavigator}>
        </Stack.Screen>

        <Stack.Screen
          name="CameraView"
          // headerTransparent={true}
          component={CameraView}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
};


export default AppNavigator;