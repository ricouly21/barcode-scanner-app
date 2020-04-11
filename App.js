import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import AppNavigator from "navigation/AppNavigator.js";


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1.0,
  },
});


export default class App extends React.Component {
  constructor(props) {
    super(props);

    console.disableYellowBox = true;
  }

  render() {
    return (
      <View style={styles.container}>
        <AppNavigator />
      </View>
    )
  }
}
