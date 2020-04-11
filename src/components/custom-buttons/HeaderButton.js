import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";


const styles = StyleSheet.create({
  btnArea: {
    paddingHorizontal: 16
  },
  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  btnText: {
    color: "white",
    fontSize: 16,
  }
});


export default function HeaderButton({
  title = "Button",
  primaryAction = function () { console.log("Button pressed") },
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
