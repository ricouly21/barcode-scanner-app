import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";


const styles = StyleSheet.create({
  btnArea: {
    backgroundColor: "white",
    height: 50,
    width: 80,
    borderColor: "black",
    borderRadius: 6,
    borderWidth: 1.0,
  },
  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  btnText: {
    color: "black",
    textAlign: "center",
  }
});


export default function ButtonNormal({
  title = "Button",
  primaryAction = function() { console.log("Button pressed")},
}) {
  return (
    <TouchableOpacity
      style={styles.btnArea}
      onPress={primaryAction}
      activeOpacity={0.5}>
      <View style={styles.btnContainer}>
        <Text style={styles.btnText}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}