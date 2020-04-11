import React from "react";
import {
  StyleSheet,
  Dimensions
} from "react-native";

import main_styles from "assets/main.styles.js";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default StyleSheet.create({
  alignCenter: main_styles.alignCenter,

  topToolbar: {
    backgroundColor: "#000",
    width: winWidth,
    height: 70,
    position: "absolute",
    top: 0,
    paddingTop: 20,
  },
  bottomToolbar: {
    backgroundColor: "#000",
    width: winWidth,
    height: 100,
    position: "absolute",
    bottom: 0,
  },

  captureBtn: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: "#fff",
    backgroundColor: "#fff",
  },
  captureBtnActive: {
    width: 80,
    height: 80,
  },
  captureBtnInternal: {
    width: 76,
    height: 76,
    borderWidth: 2,
    borderRadius: 76,
    // backgroundColor: "red",
    backgroundColor: "#fff",
    borderColor: "transparent",
  },
});
