import React from "react";
import {
  View,
  Text,
} from "react-native";

import main_styles from "assets/main.styles.js";


class SettingsView extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View style={main_styles.container}>
        <View style={main_styles.content}>
          <Text
            style={{
              color: "black",
              textAlign: "center",
              fontSize: 18,
            }}>
            {"SettingsView.js"}
          </Text>
        </View>
      </View>
    )
  }
}


export default SettingsView;